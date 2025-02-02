import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import { TASKS_GET_METADATA, VIEWS_GET, WEB_HOST_GET } from "client/endpoints";
import { AIRPLANE_ENV_SLUG } from "client/env";
import { Fetcher } from "client/fetcher";
import { TaskMetadata, View } from "client/types";
import { sendViewMessage } from "message/sendViewMessage";

export type NavigateParams = {
  /** A view slug to navigate to. */
  view?: string;
  /** A task slug to navigate to. */
  task?: string;
  /** A runID to navigate to. */
  runID?: string;
  /** Optional params to pass through to the navigated route. */
  params?: Record<string, string | undefined>;
};

type PeekParamsBase = {
  /** Optional params to pass through to the peek. */
  params?: Record<string, string | undefined>;
  /**
   * Way of opening the peek.
   * @default "side_peek"
   */
  as?: "center_peek" | "side_peek";
};

type TaskPeekParams = {
  /** A task slug to open in a peek. **/
  task: string;
} & PeekParamsBase;

type ViewPeekParams = {
  /** A view slug to open in a peek. **/
  view: string;
} & PeekParamsBase;

type RunbookPeekParams = {
  /** A runbook slug to open in a peek. **/
  runbook: string;
} & PeekParamsBase;

type PagePeekParams = {
  /** A page path to open in a peek. **/
  page: string;
} & PeekParamsBase;

type PeekParams =
  | TaskPeekParams
  | ViewPeekParams
  | RunbookPeekParams
  | PagePeekParams;

export type Router = {
  /** The parameters passed to this view. */
  params: Record<string, string | undefined>;
  /** Navigate to another task or view */
  navigate: (params: NavigateParams) => Promise<void>;
  /** Get a href string that navigates to another task or view */
  getHref: (params: NavigateParams) => Promise<string>;
  peek: (params: PeekParams) => void;
};

export const useRouter = (): Router => {
  const queryClient = useQueryClient();
  const viewParams = useQueryParamsFromHash();

  const getViewURL = useCallback(
    async (viewSlug: string, queryParams?: URLSearchParams) => {
      const fetcher = new Fetcher();
      const [viewData, webHost] = await Promise.all([
        queryClient.fetchQuery([VIEWS_GET, viewSlug], async () => {
          return await fetcher.get<View>(VIEWS_GET, {
            slug: viewSlug,
          });
        }),
        queryClient.fetchQuery([WEB_HOST_GET], async () => {
          return await fetcher.get<string>(WEB_HOST_GET, {});
        }),
      ]);

      if (queryParams === undefined) {
        queryParams = new URLSearchParams();
      }
      if (viewData?.isLocal) {
        const studioQueryParams = new URLSearchParams(queryParams);
        studioQueryParams.append("view", viewSlug);
        return `${webHost}/studio?${studioQueryParams}`;
      }
      return `${webHost}/views/${viewData.id}?${queryParams}`;
    },
    [queryClient],
  );

  const getTaskURL = useCallback(
    async (taskSlug: string, queryParams?: URLSearchParams) => {
      const fetcher = new Fetcher();
      const [taskMetadata, webHost] = await Promise.all([
        queryClient.fetchQuery([TASKS_GET_METADATA, taskSlug], async () => {
          return await fetcher.get<TaskMetadata>(TASKS_GET_METADATA, {
            slug: taskSlug,
          });
        }),
        queryClient.fetchQuery([WEB_HOST_GET], async () => {
          return await fetcher.get<string>(WEB_HOST_GET, {});
        }),
      ]);
      if (queryParams === undefined) {
        queryParams = new URLSearchParams();
      }
      if (taskMetadata?.isLocal) {
        const studioQueryParams = new URLSearchParams(queryParams);
        studioQueryParams.append("task", taskSlug);
        return `${webHost}/studio?${studioQueryParams}`;
      }
      return `${webHost}/tasks/${taskMetadata.id}?${queryParams}`;
    },
    [queryClient],
  );

  const getRunURL = useCallback(
    async (runID: string, queryParams?: URLSearchParams) => {
      const fetcher = new Fetcher();
      const webHost = await queryClient.fetchQuery([WEB_HOST_GET], async () => {
        return await fetcher.get<string>(WEB_HOST_GET, {});
      });
      if (queryParams === undefined) {
        queryParams = new URLSearchParams();
      }
      // TODO: VIEW-692 query API for local or remote run instead of looking at run ID
      if (isLocalDevRunID(runID)) {
        const studioQueryParams = new URLSearchParams(queryParams);
        studioQueryParams.append("run", runID);
        return `${webHost}/studio?${studioQueryParams}`;
      } else if (isRemoteRunID(runID)) {
        return `${webHost}/runs/${runID}?${queryParams}`;
      } else throw new Error("Run ID is not local or remote.");
    },
    [queryClient],
  );

  const getHref: Router["getHref"] = useCallback(
    ({ view, task, runID, params }) => {
      const queryParams = new URLSearchParams(coerceParamsType(params));
      if (AIRPLANE_ENV_SLUG) {
        queryParams.append("__env", AIRPLANE_ENV_SLUG);
      }

      propagateQueryParam(queryParams, "__airplane_host");
      propagateQueryParam(queryParams, "__airplane_tunnel_token");
      propagateQueryParam(queryParams, "__airplane_sandbox_token");

      const count = [view, task, runID].filter(Boolean).length;
      if (count > 1) {
        throw new Error("Only one of view, task, or runID can be set");
      }

      if (view) {
        return getViewURL(view, queryParams);
      } else if (task) {
        return getTaskURL(task, queryParams);
      } else if (runID) {
        return getRunURL(runID, queryParams);
      } else {
        // Note: we encode the view's query params in the hash so the cache for the view is not busted in web.
        return Promise.resolve(`/#${queryParams}`);
      }
    },
    [getTaskURL, getViewURL, getRunURL],
  );

  const navigate: Router["navigate"] = useCallback(
    ({ view, task, runID, params }) => {
      if (typeof window === "undefined" || !window.top) {
        return Promise.resolve();
      }

      const nav = async () => {
        if (view || task || runID) {
          window.top!.location.href = await getHref({
            view,
            task,
            runID,
            params,
          });
        } else if (inIframe()) {
          sendViewMessage({
            type: "update_query_params",
            params: coerceParamsType(params),
          });
        } else {
          window.history.pushState(
            {},
            "",
            await getHref({
              params,
            }),
          );
          // pushState doesn't cause a hashchange event to be fired, so we do it manually.
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      };

      return nav();
    },
    [getHref],
  );

  const peek: Router["peek"] = useCallback((peekParams) => {
    if (inIframe()) {
      if ("view" in peekParams && peekParams.view) {
        sendViewMessage({
          type: "peek",
          peekType: "view",
          slug: peekParams.view,
          params: peekParams.params,
          as: peekParams.as,
        });
      } else if ("task" in peekParams && peekParams.task) {
        sendViewMessage({
          type: "peek",
          peekType: "task",
          slug: peekParams.task,
          params: peekParams.params,
          as: peekParams.as,
        });
      } else if ("runbook" in peekParams && peekParams.runbook) {
        sendViewMessage({
          type: "peek",
          peekType: "runbook",
          slug: peekParams.runbook,
          params: peekParams.params,
          as: peekParams.as,
        });
      } else if ("page" in peekParams && peekParams.page) {
        sendViewMessage({
          type: "peek",
          peekType: "page",
          slug: peekParams.page,
          params: peekParams.params,
          as: peekParams.as,
        });
      } else {
        throw new Error("Must specify task, view, runbook, or page");
      }
    }
  }, []);

  return {
    params: Object.fromEntries(viewParams),
    navigate,
    getHref,
    peek,
  };
};

/**
 * coerceParamsType coerces the params to be a stricter Record type.
 */
const coerceParamsType = (
  params: Record<string, string | undefined> | undefined,
): Record<string, string> | undefined => {
  if (params) {
    const filteredParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        filteredParams[key] = value;
      }
    });
    return filteredParams;
  }
  return params;
};

/**
 * useQueryParamsFromHash is a hook that reads and returns the query params from the URL hash.
 *
 * Note: we encode the view's query params in the hash so the cache for the view is not busted in web.
 */
const useQueryParamsFromHash = () => {
  let initialViewParams: URLSearchParams;
  if (typeof window === "undefined") {
    initialViewParams = new URLSearchParams();
  } else {
    initialViewParams = new URLSearchParams(getParamsStringFromHash());
  }
  const [viewParams, setViewParams] = useState(
    new URLSearchParams(initialViewParams),
  );

  useEffect(() => {
    const handleHashChange = () => {
      setViewParams(new URLSearchParams(getParamsStringFromHash()));
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return viewParams;
};

// See https://stackoverflow.com/a/326076
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

const getParamsStringFromHash = () => {
  // Remove the leading '#'
  return window.location.hash?.slice(1);
};

export const isLocalDevRunID = (runID: string) => {
  return runID.startsWith("devrun");
};

export const isRemoteRunID = (runID: string) => {
  return runID.startsWith("run");
};

// propagateQueryParam appends the value of a query param from the current URL to the given query
// params, if it exists.
const propagateQueryParam = (queryParams: URLSearchParams, key: string) => {
  const value =
    window !== undefined
      ? new URLSearchParams(window.location.search).get(key)
      : undefined;
  if (value) {
    queryParams.append(key, value);
  }
};

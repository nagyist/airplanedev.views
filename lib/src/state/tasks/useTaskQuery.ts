import {
  QueryObserverResult,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import { useState } from "react";

import {
  DefaultOutput,
  DefaultParams,
  ExecuteTaskError,
  executeTask,
  ExecuteTaskSuccess,
  ParamValues,
  isExecuteTaskError,
  executeTaskBackground,
} from "client/executeTask";
import {
  ExecuteError,
  TaskQuery,
  getFullQuery,
  getSlug,
} from "components/query";

export type UseTaskQueryOptions<
  TParams extends ParamValues | undefined = DefaultParams,
  TOutput = DefaultOutput,
> = {
  /**
   * The params of the task to execute.
   */
  params?: TParams;
  /**
   * If set to true, the task will be executed automatically.
   * @default true
   */
  enabled?: boolean;
  /**
   * If set, the task will be refetched every refetchInterval milliseconds.
   */
  refetchInterval?: number;
  /**
   * If set, queries with identical inputs within the configured age
   * (in seconds) may get cached results.
   */
  allowCachedMaxAge?: number;
  /**
   * If set to true, the task will be executed on mount.
   * @default true
   */
  executeOnMount?: boolean;
  /**
   * If set to true, the task will be executed on window focus.
   * @default true
   */
  executeOnWindowFocus?: boolean;
  /**
   * If set to true, the task will be executed on reconnect.
   * @default true
   */
  executeOnReconnect?: boolean;
  /**
   * Callback on successful task execution.
   */
  onSuccess?: (output: TOutput, runID: string) => void;
  /**
   * Callback on failed task execution.
   */
  onError?: (
    output: TOutput | undefined,
    error: ExecuteError,
    runID?: string,
  ) => void;
};

export type UseTaskQueryResult<TOutput = DefaultOutput> = {
  /**
   * The output of the last successfully executed task.
   */
  output?: TOutput;
  /**
   * True when the task is executing for the first time.
   */
  loading?: boolean;
  /**
   * True anytime the task is executing. This includes the first time the task is executed (loading = true)
   * and anytime the task is refetching.
   *
   * You usually want to use `loading` instead of `executing` unless you want to show an indicator when the task is refetching.
   */
  executing?: boolean;
  /**
   * Will be set with the error message if the task failed to execute.
   */
  error?: ExecuteError;
  /**
   * Will be set with a function that executes the task.
   */
  refetch: () => Promise<
    QueryObserverResult<ExecuteTaskSuccess<TOutput>, ExecuteTaskError<TOutput>>
  >;
  /**
   * The ID of the run.
   */
  runID?: string;
};

/**
 * useTaskQuery executes a task.
 *
 * This should be used for tasks that queries for data.
 *
 * Additionally, useTaskQuery can:
 * - Cache the output
 * - Automatically refetch to keep the output up to date
 */
export const useTaskQuery = <
  TParams extends ParamValues | undefined = DefaultParams,
  TOutput = DefaultOutput,
>(
  query: TaskQuery<TParams, TOutput>,
): UseTaskQueryResult<TOutput> => {
  const [executedRunID, setExecutedRunID] = useState<string | undefined>();
  const fullQuery = getFullQuery<TParams>(query);
  const {
    params,
    enabled: enabledOption = true,
    refetchInterval,
    allowCachedMaxAge,
    executeOnMount = true,
    executeOnWindowFocus = false,
    executeOnReconnect = true,
    onSuccess,
    onError,
  } = fullQuery;
  const slug = getSlug(fullQuery);
  const enabled = Boolean(enabledOption) && Boolean(slug);
  const { isInitialLoading, isLoading, error, data, refetch, isFetching } =
    useReactQuery<ExecuteTaskSuccess<TOutput>, ExecuteTaskError<TOutput>>(
      [slug, params],
      async () => {
        const runID = await executeTaskBackground<TParams, TOutput>(
          slug,
          "query",
          params,
          allowCachedMaxAge,
        );
        if (typeof runID === "object") {
          throw runID;
        }
        setExecutedRunID(runID);

        const r = await executeTask<TParams, TOutput>(
          slug,
          "query",
          params,
          runID,
          allowCachedMaxAge,
        );
        if (isExecuteTaskError<TOutput>(r)) {
          throw r;
        }
        return r;
      },
      {
        enabled,
        refetchInterval,
        refetchOnMount: executeOnMount,
        refetchOnWindowFocus: executeOnWindowFocus,
        refetchOnReconnect: executeOnReconnect,
        onSuccess: (res) => {
          onSuccess?.(res.output, res.runID);
        },
        onError: (res) => {
          onError?.(res.output, res.error, res.runID);
        },
      },
    );

  return {
    output: data?.output ?? error?.output,
    runID: executedRunID ?? data?.runID ?? error?.runID,
    error: error?.error,
    loading: enabled ? isLoading : Boolean(isInitialLoading),
    refetch,
    executing: isFetching,
  };
};

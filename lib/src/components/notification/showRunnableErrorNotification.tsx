import { createStyles } from "@mantine/core";

import { Button } from "components/button/Button";
import { showNotification } from "components/notification/showNotification";
import { ExecuteError } from "components/query";
import { sendViewMessage } from "message/sendViewMessage";

export const useStyles = createStyles((theme) => ({
  messageRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorMessage: {
    paddingRight: theme.spacing.xs,
    wordBreak: "break-word",
  },
}));

const ErrorNotificationMessage = ({
  error,
  runID,
  sessionID,
  slug,
}: RunnableErrorNotificationProps) => {
  const { classes } = useStyles();
  if (runID && sessionID) {
    throw Error("Cannot set both runID and sessionID");
  }
  let message: string;
  if (error.type === "FAILED") {
    message = `${runID ? "Run" : "Session"} failed ${
      slug ? `for ${slug}` : ""
    }`;
  } else {
    message = error.message;
  }

  return (
    <div className={classes.messageRoot}>
      <span className={classes.errorMessage}>{message}</span>
      {(runID || sessionID) && (
        <Button
          size="xs"
          variant="subtle"
          disableFocusRing
          onClick={() =>
            sendViewMessage({
              type: "debug_panel",
              open: true,
              activeTab: "activity",
              runID,
              sessionID,
            })
          }
        >
          {`Open ${runID ? "run" : "session"}`}
        </Button>
      )}
    </div>
  );
};

export type RunnableErrorNotificationProps = {
  error: ExecuteError;
  runID?: string;
  sessionID?: string;
  slug?: string;
};

export const showRunnableErrorNotification = ({
  error,
  runID,
  sessionID,
  slug,
}: RunnableErrorNotificationProps) => {
  return showNotification({
    title: "Error",
    message: (
      <ErrorNotificationMessage
        error={error}
        runID={runID}
        sessionID={sessionID}
        slug={slug}
      />
    ),
    type: "error",
  });
};

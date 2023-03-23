import { createStyles } from "@mantine/core";

import { ExclamationTriangleIconMini } from "components/icon";
import { Label } from "components/text/Text";
import { sendViewMessage } from "message/sendViewMessage";

const useComponentErrorStateStyles = createStyles((theme) => {
  return {
    componentError: {
      cursor: "pointer",
      backgroundColor: theme.colors.red[0],
      borderRadius: theme.radius.md,
      padding: "4px 10px",
      color: theme.colors.red[6],
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "start",
      animation: "border-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "@keyframes border-pulse": {
        "0%": {
          border: `1px solid ${theme.colors.red[5]}`,
        },
        "50%": {
          border: `1px solid ${theme.colors.red[3]}`,
        },
        "100%": {
          border: `1px solid ${theme.colors.red[5]}`,
        },
      },
      transition: "background-color 0.2s",
      "&:hover": { backgroundColor: theme.colors.red[1] },
    },
    warningIcon: {
      // margin top with align items start makes the icon align with the text better than align items center
      marginTop: 3,
      marginRight: 6,
      animation: "warning-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "@keyframes warning-pulse": {
        "0%": {
          color: theme.colors.red[6],
        },
        "50%": {
          color: theme.colors.red[4],
        },
        "100%": {
          color: theme.colors.red[6],
        },
      },
    },
    runErrorMessage: {
      fontWeight: 500,
    },
  };
});

export type ComponentErrorStateProps = {
  componentName?: string;
  onClick: () => void;
};

export const ComponentErrorState = ({
  componentName,
  onClick,
}: ComponentErrorStateProps) => {
  const { classes } = useComponentErrorStateStyles();
  return (
    <div className={classes.componentError} onClick={onClick}>
      <ExclamationTriangleIconMini className={classes.warningIcon} />
      <Label color="red">Error in {componentName ?? "component"}</Label>
    </div>
  );
};

export type RunErrorComponentErrorStateProps = {
  componentName?: string;
  taskSlug?: string;
  runID?: string;
};

/**
 * Displayed in the view when task-backed components fail with run errors.
 */
export const RunErrorComponentErrorState = ({
  componentName,
  taskSlug,
  runID,
}: RunErrorComponentErrorStateProps) => {
  const { classes } = useComponentErrorStateStyles();
  return (
    <div
      className={classes.componentError}
      onClick={() => {
        sendViewMessage({
          type: "debug_panel",
          open: true,
          activeTab: "activity",
          runID,
        });
      }}
    >
      <ExclamationTriangleIconMini className={classes.warningIcon} />
      <div>
        <Label color="red" className={classes.runErrorMessage}>
          {getRunErrorMessage(taskSlug)}
        </Label>
        <Label color="red">Unable to load {componentName ?? "component"}</Label>
      </div>
    </div>
  );
};

export const getRunErrorMessage = (taskSlug?: string) => {
  return `Error: Run failed for ${taskSlug ?? "task"}`;
};

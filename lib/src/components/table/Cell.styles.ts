import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  return {
    cell: {
      lineHeight: "1.5rem",
      width: "100%",
      display: "flex",
      cursor: "default",
      position: "relative",

      ".cellEditIcon": {
        display: "none",
      },

      "&:hover": {
        ".cellEditIcon": {
          display: "block",
        },
      },
    },
    editingCell: {
      boxShadow: `inset 0 0 0 1px ${theme.colors.primary[6]}`,
    },
    cellPadding: {
      padding: "8px 16px",
    },
    checkboxCellPadding: {
      padding: "6px 16px",
      lineHeight: 0,
    },
    dirty: {
      position: "relative",
      "&::after": {
        content: '""',
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "0 16px 16px 0",
        borderColor: `transparent ${theme.colors.secondary[2]} transparent transparent`,
        right: 0,
        top: 0,
        position: "absolute",
        pointerEvents: "none",
      },
    },

    // Puts scrollbar in the right place in a textarea
    textareaWrapper: {
      height: "100%",
    },
    textareaRoot: {
      width: "100%",
    },
    textareaInput: {
      minHeight: "100%",
      padding: "8px 16px",
    },
    linkSpan: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      overflowWrap: "break-word",
      whiteSpace: "nowrap",
      minWidth: 0,
    },
    link: {
      width: "100%",
    },
  };
});

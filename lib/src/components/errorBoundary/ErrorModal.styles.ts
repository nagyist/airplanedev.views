import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  modal: {
    borderTop: `8px solid ${theme.colors.error[6]}`,
    // subtract 64px of padding top and bottom of the dialog
    maxHeight: "calc(100vh - 128px)",
    overflowY: "auto",
  },
  title: {
    marginBottom: 0,
  },
}));

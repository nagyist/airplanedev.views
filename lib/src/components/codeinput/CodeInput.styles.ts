import { createStyles } from "@mantine/core";

const DRACULA_BACKGROUND_COLOR = "#282a36";

export const useStyles = createStyles((theme) => {
  return {
    darkColors: {
      borderColor: DRACULA_BACKGROUND_COLOR,
      backgroundColor: DRACULA_BACKGROUND_COLOR,
    },
    guttersPadding: {
      paddingLeft: 2,
      paddingTop: 2,
    },
    noGuttersPadding: {
      paddingLeft: theme.spacing.sm,
      paddingTop: 2,
    },
  };
});

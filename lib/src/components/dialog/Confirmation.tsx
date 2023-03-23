import { createStyles } from "@mantine/core";

import { Button } from "components/button/Button";
import { ComponentErrorBoundary } from "components/errorBoundary/ComponentErrorBoundary";
import { Stack } from "components/stack/Stack";
import { useDialogState } from "state/components/dialog";
import { useComponentId } from "state/components/useId";

import { DialogComponent } from "./Dialog";
import { ConfirmationComponentProps, ConfirmationProps } from "./Dialog.types";

export const Confirmation = ({
  defaultOpened,
  id: propId,
  ...props
}: ConfirmationProps) => {
  const id = useComponentId(propId);
  const { opened, close } = useDialogState(id, {
    initialState: {
      opened: props.opened ?? defaultOpened,
    },
  });
  return (
    <ComponentErrorBoundary componentName={Confirmation.displayName}>
      <ConfirmationComponent opened={opened} onClose={close} {...props} />
    </ComponentErrorBoundary>
  );
};

Confirmation.displayName = "Confirmation";

const useStyles = createStyles((theme) => {
  return {
    confirmationButtons: {
      marginTop: theme.spacing.lg,
    },
  };
});

export const ConfirmationComponent = ({
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  ...props
}: ConfirmationComponentProps) => {
  const { classes } = useStyles();
  if (!confirmText) {
    throw new Error("confirmText cannot be empty");
  }
  return (
    <DialogComponent {...props} onClose={onClose}>
      {children}
      <div className={classes.confirmationButtons}>
        <Stack direction="row" justify="end" spacing={12}>
          {cancelText && (
            <Button preset="tertiary" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button onClick={onConfirm}>{confirmText}</Button>
        </Stack>
      </div>
    </DialogComponent>
  );
};

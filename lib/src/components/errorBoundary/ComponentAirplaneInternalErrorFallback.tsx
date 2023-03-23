import { useState } from "react";

import { ButtonComponent } from "components/button/Button";
import { CodeComponent } from "components/code/Code";
import { DialogComponent } from "components/dialog/Dialog";
import { HeadingComponent } from "components/heading/Heading";
import { StackComponent } from "components/stack/Stack";
import { getIsLocalDev } from "getIsLocalDev";
import { useToggleModal } from "message/useToggleModal";

import { ComponentErrorState } from "./ComponentErrorState";
import { useStyles as useErrorModalStyles } from "./ErrorModal.styles";

type ComponentAirplaneInternalErrorFallbackProps = {
  errorMessage: string;
  componentName?: string;
  errorID: string;
};

export const ComponentAirplaneInternalErrorFallback = ({
  errorMessage,
  componentName,
  errorID,
}: ComponentAirplaneInternalErrorFallbackProps) => {
  const isLocalDev = getIsLocalDev();
  const [opened, setOpened] = useState(isLocalDev);
  useToggleModal(setOpened, errorID);

  return (
    <>
      <AirplaneInternalErrorModal
        errorMessage={errorMessage}
        componentName={componentName}
        opened={opened}
        setOpened={setOpened}
      />
      <ComponentErrorState
        componentName={componentName}
        onClick={() => setOpened(true)}
      />
    </>
  );
};

export type AirplaneInternalErrorModalProps = {
  errorMessage: string;
  componentName?: string;
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export const AirplaneInternalErrorModal = ({
  errorMessage,
  componentName,
  opened,
  setOpened,
}: AirplaneInternalErrorModalProps) => {
  const { classes } = useErrorModalStyles();
  return (
    <DialogComponent
      opened={opened}
      onClose={() => setOpened(false)}
      title={
        <HeadingComponent level={4} className={classes.title}>
          An internal error has occurred{" "}
          {componentName ? ` in the ${componentName} component` : ""}
        </HeadingComponent>
      }
      size="100%"
      classNames={{ modal: classes.modal }}
    >
      <StackComponent>
        <StackComponent>
          <CodeComponent language="none" copyLabel="Copy error">
            {errorMessage}
          </CodeComponent>

          <StackComponent spacing="sm" direction="row" justify="end">
            <ButtonComponent
              href="https://www.airplane-status.com/"
              size="xs"
              preset="tertiary"
              disableFocusRing
            >
              Check status page
            </ButtonComponent>
            <ButtonComponent
              href="mailto:support@airplane.dev"
              size="xs"
              disableFocusRing
            >
              Contact support
            </ButtonComponent>
          </StackComponent>
        </StackComponent>
      </StackComponent>
    </DialogComponent>
  );
};

import { ActionIcon, Input } from "@mantine/core";

import { PlusIconMini, XMarkIconMini } from "components/icon";
import { Stack } from "components/stack/Stack";

import { Props } from "./MultiInput.types";
import { Button } from "../button/Button";

/**
 * MultiInput is a component that allows the user to add and remove multiple values.
 * Any type of input can be used, passed in via the `input` prop.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MultiInput = <T = any,>({
  values,
  disabled,
  label,
  description,
  renderInput,
  addDisabled,
  onAdd,
  onRemove,
  required,
  error,
}: Props<T>) => {
  return (
    <Stack spacing="xs">
      <Input.Label required={required}>{label}</Input.Label>
      <Stack align="start" spacing="sm">
        {values.length > 0 && (
          <>
            {values.map((v, i) => {
              return (
                <Stack
                  direction="row"
                  key={i}
                  align="center"
                  spacing="xs"
                  width="full"
                >
                  <div style={{ flexGrow: 1 }}>
                    {renderInput({ index: i, value: v, disabled: !!disabled })}
                  </div>
                  {!disabled && onRemove && (
                    <ActionIcon
                      onClick={() => onRemove(i, v)}
                      aria-label="remove"
                    >
                      <XMarkIconMini />
                    </ActionIcon>
                  )}
                </Stack>
              );
            })}
          </>
        )}
        {!!onAdd && (
          <Button
            preset="tertiary"
            size="xs"
            disabled={disabled || addDisabled}
            onClick={() => {
              onAdd();
            }}
            leftIcon={<PlusIconMini />}
          >
            {values.length === 0 ? "Add" : "Add another"}
          </Button>
        )}
      </Stack>
      {description && <Input.Description>{description}</Input.Description>}
      {error && <Input.Error>{error}</Input.Error>}
    </Stack>
  );
};

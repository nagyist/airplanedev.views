import { useCallback, useMemo } from "react";

import { ComponentType, useSyncComponentState } from "state/context/context";

import { InputValues } from "./state";
import { adaptInputsToValues, useFormInputs } from "./useFormInputs";

/**
 * useFormState is a hook that creates and manages a Form's state on the
 * Airplane context
 */
export const useFormState = (id: string) => {
  const inputData = useFormInputs();

  const reset = useCallback(() => {
    const inputResets = Object.values(inputData).map(
      (input) => input.state.reset,
    );
    for (const inputReset of inputResets) {
      inputReset();
    }
  }, [inputData]);

  const values = useMemo(() => {
    return adaptInputsToValues(inputData);
  }, [inputData]);

  const setValues = useCallback(
    (values: InputValues) => {
      Object.entries(values).forEach(([id, value]) => {
        const inputState = inputData[id]?.state;
        if (inputState) {
          inputState.setValue(value as never);
        }
      });
    },
    [inputData],
  );

  const state = useMemo(
    () => ({
      id,
      /** The values of the form inputs as a map of input id => value. */
      values,
      /** Sets the values of the form inputs from a map of input id => value. */
      setValues,
      /** Resets each of the form inputs. */
      reset,
      componentType: ComponentType.Form,
    }),
    [id, values, reset, setValues],
  );
  useSyncComponentState(id, state);

  return state;
};

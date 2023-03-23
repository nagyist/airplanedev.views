import { BaseState, DefaultState } from "../BaseState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputValues = Record<string, any>;

export type FormState = {
  /**
   * values is a simple, user-friendly map of form's input ids to their values.
   */
  values?: InputValues;
  /**
   * Resets all inputs in the form to their default values.
   */
  reset: () => void;
} & BaseState;

export const DefaultFormState: DefaultState<FormState> = {
  values: undefined,
  reset: () => {
    // Empty
  },
};

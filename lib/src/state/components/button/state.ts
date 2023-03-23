import { DefaultOutput } from "client";
import { RunbookMutationState } from "state/tasks/useRunbookMutation";
import { MutationState } from "state/tasks/useTaskMutation";

import { BaseState, DefaultState } from "../BaseState";

export type ButtonState<TOutput = DefaultOutput> = {
  result: MutationState<TOutput> | RunbookMutationState | null;
  setResult: (result: MutationState<TOutput> | RunbookMutationState) => void;
} & BaseState;

const emptyFn = () => {
  // Empty
};
export const DefaultButtonState: DefaultState<ButtonState> = {
  result: null,
  setResult: emptyFn,
};

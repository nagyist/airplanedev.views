import { Dispatch, useMemo, useReducer } from "react";

import { ComponentType, useSyncComponentState } from "state/context/context";

import { Action, reducer } from "./reducer";
import { InitialMultiInputState, MultiInputState } from "./state";
import { useStateSetters } from "../input/useStateSetters";

export type MultiInputHookOptions<T> = {
  initialState?: InitialMultiInputState<T>;
};

/**
 * useMultiInputState is a hook that creates and manages a MultiInput's state on the
 * Airplane context
 */
export const useMultiInputState = <T>(
  id: string,
  options?: MultiInputHookOptions<T>,
): { state: MultiInputState<T[]>; dispatch: Dispatch<Action<T[]>> } => {
  const initialState = {
    id,
    componentType: ComponentType.MultiInput,
    value: options?.initialState?.value ?? [],
    disabled: options?.initialState?.disabled ?? false,
  };

  const [internalState, dispatch] = useReducer(reducer<T[]>, {
    ...initialState,
    showErrors: false,
    errors: [],
  });
  const stateSetters = useStateSetters(dispatch, initialState);

  const state: MultiInputState<T[]> = useMemo(
    () => ({
      ...internalState,
      ...stateSetters,
      id,
      componentType: ComponentType.MultiInput,
    }),
    [internalState, stateSetters, id],
  );
  useSyncComponentState(id, state);

  return { state, dispatch };
};

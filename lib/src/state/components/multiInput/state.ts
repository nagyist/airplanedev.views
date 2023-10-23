import { BaseState } from "../BaseState";
import { InputState } from "../input/reducer";
import { StateSetters } from "../input/useStateSetters";

export type MultiInputState<T> = BaseState & InputState<T> & StateSetters<T>;

export type InitialMultiInputState<T> = {
  value?: T[];
  disabled?: boolean;
};

// const emptyFn = () => {
//   // Do nothing
// };
// export const DefaultMultiInputState: DefaultState<MultiInputState<any>> = {
//   value: [],
//   reset: emptyFn,
//   disabled: false,
//   errors: [],
//   showErrors: false,
//   setDisabled: emptyFn,
//   setShowErrors: emptyFn,
//   setValue: emptyFn,
// };

import { BaseState, DefaultState } from "../BaseState";

export type DialogState = {
  id: string;
  opened: boolean;
  open: () => void;
  close: () => void;
} & BaseState;

export type InitialDialogState = {
  opened?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};
export const DefaultDialogState: DefaultState<DialogState> = {
  opened: false,
  open: emptyFn,
  close: emptyFn,
};

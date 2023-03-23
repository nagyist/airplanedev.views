import { BaseState, DefaultState } from "../BaseState";

export type TabsValue = string | undefined | null;

export type TabsState = {
  id: string;
  value: TabsValue;
  setValue: (value: TabsValue) => void;
} & BaseState;

export type InitialTabsState = {
  value: TabsValue;
};

const emptyFn = () => {
  // Empty
};

export const DefaultTabsState: DefaultState<TabsState> = {
  value: undefined,
  setValue: emptyFn,
};

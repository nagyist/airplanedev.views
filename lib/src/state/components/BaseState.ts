import { ComponentType } from "state/context/context";

export type BaseState = {
  id: string;
  // TODO: Make required after adding to rest of the component states?
  componentType: ComponentType;
};

export type DefaultState<TState> = Omit<TState, keyof BaseState>;

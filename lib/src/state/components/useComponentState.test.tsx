import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import { TextInput } from "components";
import { ComponentStateProvider } from "state/context/ComponentStateProvider";
import { render, renderHook } from "test-utils/react";

import { TextInputState } from "./text-input";
import { useComponentState, useComponentStates } from "./useComponentState";
import { DefaultComponentState } from "../context/context";

describe("useComponentState", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ComponentStateProvider>{children}</ComponentStateProvider>
  );

  it("provides the default component state", () => {
    const myID = "my-id";
    const { result } = renderHook(() => useComponentState(myID), { wrapper });
    expect(result.current).toEqual({ ...DefaultComponentState, id: myID });
  });

  it("gets updated component state", async () => {
    const TestC = () => {
      const { value, id } = useComponentState<TextInputState>();
      return (
        <>
          <TextInput id={id} />
          <div>{`Value: ${value}`}</div>
        </>
      );
    };

    const { getByRole, getByText } = render(<TestC />);
    expect(getByText(`Value:`)).toBeInTheDocument();
    const expectedText = "hello";
    await userEvent.type(getByRole("textbox"), expectedText);
    expect(getByText(`Value: ${expectedText}`)).toBeInTheDocument();
  });

  it("generates a unique ID when ID is not provided", () => {
    const { result } = renderHook(() => useComponentState(), { wrapper });
    const id = result.current.id;
    expect(id).toBeTruthy();
    const { result: newResult } = renderHook(() => useComponentState(), {
      wrapper,
    });
    const newID = newResult.current.id;
    expect(newID).toBeTruthy();
    expect(newID).not.toEqual(id);
  });
});

describe("useComponentStates", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ComponentStateProvider>{children}</ComponentStateProvider>
  );

  it("provides the default component state", () => {
    const myID = "my-id";
    const myID2 = "my-id2";
    const { result } = renderHook(() => useComponentStates([myID, myID2]), {
      wrapper,
    });
    expect(Object.keys(result.current).length).toEqual(2);
    expect(result.current[myID]).toEqual({
      ...DefaultComponentState,
      id: myID,
    });
    expect(result.current[myID2]).toEqual({
      ...DefaultComponentState,
      id: myID2,
    });
  });

  it("gets updated component states", async () => {
    const TestC = () => {
      const states = useComponentStates<TextInputState>(["id1", "id2"]);
      return (
        <>
          <TextInput id="id1" defaultValue="text1" />
          <TextInput id="id2" defaultValue="text2" />
          <div>{`Value1: ${states.id1.value}`}</div>
          <div>{`Value2: ${states.id2.value}`}</div>
        </>
      );
    };

    const { getByText, getByDisplayValue } = render(<TestC />);
    expect(getByText(`Value1: text1`)).toBeInTheDocument();
    expect(getByText(`Value2: text2`)).toBeInTheDocument();
    const expectedText = "hello";
    await userEvent.type(getByDisplayValue("text1"), expectedText);
    expect(getByText(`Value1: text1${expectedText}`)).toBeInTheDocument();
  });
});

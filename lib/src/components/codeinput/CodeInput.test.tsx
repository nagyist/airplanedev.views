import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { CodeInputState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { CodeInput } from "./CodeInput";

describe("CodeInput", () => {
  // Add mocks to get rid of TypeError: https://github.com/jsdom/jsdom/issues/3002
  document.createRange = () => {
    const range = new Range();
    range.getBoundingClientRect = jest.fn();
    range.getClientRects = () => {
      return {
        item: () => null,
        length: 0,
        [Symbol.iterator]: jest.fn(),
      };
    };
    return range;
  };

  it("works as a controlled component", async () => {
    const TestC = () => {
      const [value, setValue] = useState("hi");
      return (
        <>
          <CodeInput value={value} onChange={(v) => setValue(v)} />
          <button onClick={() => setValue("bye")}>button</button>
        </>
      );
    };
    render(<TestC />);

    await screen.findByText("hi");
    await userEvent.click(await screen.findByRole("button"));
    await screen.findByText("bye");
  });

  it("works as an uncontrolled component", async () => {
    const TestC = () => {
      const inputState = useComponentState<CodeInputState>("myInput");
      return (
        <>
          <CodeInput id="myInput" defaultValue="hi" />
          <button
            onClick={() => {
              inputState.setValue("bye");
              inputState.setDisabled(true);
              inputState.focus();
            }}
          >
            button
          </button>
        </>
      );
    };
    render(<TestC />);

    const codeDiv = document.querySelector(".cm-content");
    expect(codeDiv).toHaveTextContent("hi");
    expect(codeDiv).toHaveAttribute("contenteditable", "true");
    expect(codeDiv).not.toHaveFocus();

    await userEvent.click(await screen.findByRole("button"));

    expect(codeDiv).toHaveTextContent("bye");
    expect(codeDiv).toHaveAttribute("contenteditable", "false");
    expect(codeDiv).toHaveFocus();
  });
});

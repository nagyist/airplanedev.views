import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { TextInputState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("works as a controlled component", async () => {
    const TestC = () => {
      const [value, setValue] = useState("hi");
      return (
        <>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button onClick={() => setValue("bye")}>button</button>
        </>
      );
    };
    render(<TestC />);

    await screen.findByDisplayValue("hi");
    await userEvent.click(await screen.findByRole("button"));
    await screen.findByDisplayValue("bye");
  });

  it("works as an uncontrolled component", async () => {
    const TestC = () => {
      const inputState = useComponentState<TextInputState>("myInput");
      return (
        <>
          <Textarea id="myInput" defaultValue="hi" />
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

    const input = await screen.findByDisplayValue("hi");
    expect(input).not.toBeDisabled();
    expect(input).not.toHaveFocus();

    await userEvent.click(await screen.findByRole("button"));

    expect(input).toHaveValue("bye");
    expect(input).toBeDisabled();
    expect(input).toHaveFocus();
  });
});

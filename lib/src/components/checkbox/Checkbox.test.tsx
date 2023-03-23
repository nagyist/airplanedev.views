import userEvent from "@testing-library/user-event";

import { CheckboxState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("can be checked or disabled from component state", async () => {
    const TestC = () => {
      const inputState = useComponentState<CheckboxState>("myCheckbox");
      return (
        <>
          <Checkbox id="myCheckbox" label="checkMe" />
          <button
            onClick={() => {
              inputState.setValue(true);
              inputState.setDisabled(true);
            }}
          >
            button
          </button>
        </>
      );
    };
    render(<TestC />);

    const input = await screen.findByRole("checkbox");
    expect(input).not.toBeChecked();
    expect(input).not.toBeDisabled();

    await userEvent.click(await screen.findByRole("button"));

    expect(input).toBeChecked();
    expect(input).toBeDisabled();
  });
});

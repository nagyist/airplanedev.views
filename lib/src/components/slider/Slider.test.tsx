import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { NumberInputState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { Slider } from "./Slider";

describe("Slider", () => {
  it("works as a controlled component", async () => {
    const TestC = () => {
      const [value, setValue] = useState<number | undefined>(5);
      return (
        <>
          <Slider value={value} onChange={(value) => setValue(value)} />
          <button onClick={() => setValue(6)}>button</button>
        </>
      );
    };
    render(<TestC />);

    await screen.findByDisplayValue(5);
    await userEvent.click(await screen.findByRole("button"));
    await screen.findByDisplayValue(6);
  });

  describe("as an uncontrolled component", () => {
    it("works as default", async () => {
      const TestC = () => {
        const inputState = useComponentState<NumberInputState>("mySlider");
        return (
          <>
            <Slider id="mySlider" defaultValue={5} data-testid="s1" />
            <button
              onClick={() => {
                inputState.setValue(inputState.value! + 1);
                inputState.setDisabled(true);
              }}
            >
              button
            </button>
          </>
        );
      };
      render(<TestC />);

      await screen.findByDisplayValue(5);
      // right arrow should increase number by one
      await userEvent.type(await screen.findByTestId("s1"), "{arrowright}");
      await screen.findByDisplayValue(6);
      await userEvent.click(await screen.findByRole("button"));
      await screen.findByDisplayValue(7);
      // right arrow will not change value because slider is disabled
      await userEvent.type(await screen.findByTestId("s1"), "{arrowright}");
      await screen.findByDisplayValue(7);
    });
  });
});

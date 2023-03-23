import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { NumberInputState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("works as a controlled component", async () => {
    const TestC = () => {
      const [value, setValue] = useState<number | undefined>(5);
      return (
        <>
          <NumberInput value={value} onChange={(value) => setValue(value)} />
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
        const inputState = useComponentState<NumberInputState>("myNumberInput");
        return (
          <>
            <NumberInput id="myNumberInput" defaultValue={5} />
            <button
              onClick={() => {
                inputState.setValue(6);
                inputState.setDisabled(true);
              }}
            >
              button
            </button>
          </>
        );
      };
      render(<TestC />);

      const input = await screen.findByDisplayValue(5);
      expect(input).not.toBeDisabled();

      await userEvent.click(await screen.findByRole("button"));

      expect(input).toHaveValue("6");
      expect(input).toBeDisabled();
    });

    it("works as currency", async () => {
      const TestC = () => {
        const inputState = useComponentState<NumberInputState>("myNumberInput");
        return (
          <>
            <NumberInput
              id="myNumberInput"
              defaultValue={5}
              precision={2}
              format="currency"
              currency="GBP"
            />
            <button
              onClick={() => {
                inputState.setValue(1000.5);
              }}
            >
              button
            </button>
          </>
        );
      };
      render(<TestC />);

      const input = await screen.findByDisplayValue("£ 5.00");
      await userEvent.click(await screen.findByRole("button"));
      expect(input).toHaveValue("£ 1,000.50");
    });

    it("works as percent", async () => {
      const TestC = () => {
        const inputState = useComponentState<NumberInputState>("myNumberInput");
        return (
          <>
            <NumberInput
              id="myNumberInput"
              defaultValue={5}
              precision={3}
              format="percent"
            />
            <button
              onClick={() => {
                inputState.setValue(0.1234);
              }}
            >
              button
            </button>
          </>
        );
      };
      render(<TestC />);

      const input = await screen.findByDisplayValue("500.0%");
      await userEvent.click(await screen.findByRole("button"));
      expect(input).toHaveValue("12.3%");
    });
  });
});

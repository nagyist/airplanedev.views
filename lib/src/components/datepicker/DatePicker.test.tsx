import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { Button } from "components/button/Button";
import { Text } from "components/text/Text";
import { DatePickerState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  const d1 = new Date(2022, 1);
  const d2 = new Date(2022, 2);

  it("works as a controlled component", async () => {
    const TestC = () => {
      const [value, setValue] = useState<Date | undefined>(d1);
      return (
        <>
          <DatePicker value={value} onChange={setValue} />
        </>
      );
    };
    render(<TestC />);

    const input = await screen.findByDisplayValue("Feb 01, 2022");
    await userEvent.click(input);
    await userEvent.click(await screen.findByText("17"));
    await screen.findByDisplayValue("Feb 17, 2022");
  });

  it("works as an uncontrolled component", async () => {
    const TestC = () => {
      const inputState = useComponentState<DatePickerState>("myDatePicker");
      return (
        <>
          <DatePicker id="myDatePicker" defaultValue={d1} />
          <Text>{inputState.value?.toISOString() ?? "None"}</Text>
          <Text>{String(inputState.disabled)}</Text>
        </>
      );
    };
    render(<TestC />);

    await screen.findAllByText("2022-02-01T00:00:00.000Z");
    await screen.findAllByText("false");
    const input = await screen.findByDisplayValue("Feb 01, 2022");
    expect(input).not.toBeDisabled();

    // Change value using UI.
    await userEvent.click(input);
    await userEvent.click(await screen.findByText("17"));

    await screen.findAllByText("2022-02-17T00:00:00.000Z");
    expect(input).toHaveValue("Feb 17, 2022");
  });

  it("works as an uncontrolled component with component state", async () => {
    const TestC = () => {
      const inputState = useComponentState<DatePickerState>("myDatePicker");
      return (
        <>
          <DatePicker id="myDatePicker" defaultValue={d1} />
          <Button
            onClick={() => {
              inputState.setValue(d2);
              inputState.setDisabled(true);
            }}
          >
            button1
          </Button>
          <Button onClick={() => inputState.setValue(undefined)}>
            button2
          </Button>
          <Text>{inputState.value?.toISOString() ?? "None"}</Text>
          <Text>{String(inputState.disabled)}</Text>
        </>
      );
    };
    render(<TestC />);

    await screen.findAllByText("2022-02-01T00:00:00.000Z");
    await screen.findAllByText("false");
    const input = await screen.findByDisplayValue("Feb 01, 2022");
    expect(input).not.toBeDisabled();

    // Change value using component state.
    await userEvent.click(await screen.findByText("button2"));
    expect(input).toHaveValue("");
    await userEvent.click(await screen.findByText("button1"));
    await screen.findAllByText("2022-03-01T00:00:00.000Z");
    await screen.findAllByText("true");
    expect(input).toHaveValue("Mar 01, 2022");
    expect(input).toBeDisabled();
  });

  it("clearable", async () => {
    const TestC = () => {
      const inputState = useComponentState<DatePickerState>("myDatePicker");
      return (
        <>
          <DatePicker id="myDatePicker" defaultValue={d1} clearable />
          <Text>{inputState.value?.toISOString() ?? "None"}</Text>
        </>
      );
    };
    render(<TestC />);

    const input = await screen.findByDisplayValue("Feb 01, 2022");
    await screen.findByText("2022-02-01T00:00:00.000Z");

    await userEvent.click(await screen.findByLabelText("clear"));
    expect(input).toHaveValue("");
    await screen.findByText("None");
  });
});

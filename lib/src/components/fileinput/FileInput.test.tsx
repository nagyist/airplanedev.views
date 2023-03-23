import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;

import userEvent from "@testing-library/user-event";
import { AirplaneFile } from "airplane";
import { useState } from "react";

import { Button } from "components/button/Button";
import { Text } from "components/text/Text";
import { FileInputState, useComponentState } from "state";
import { render, screen } from "test-utils/react";

import { FileInput } from "./FileInput";

const variants = ["basic", "dropzone"] as const;

describe("FileInput", () => {
  const f1 = new AirplaneFile(new Blob(["foo"]), {
    id: "",
    url: "",
    name: "foo.txt",
  });
  const f2 = new AirplaneFile(new Blob(["bar"]), {
    id: "",
    url: "",
    name: "bar.txt",
  });
  const f3 = new AirplaneFile(new Blob(["baz"]), {
    id: "",
    url: "",
    name: "baz.txt",
  });

  variants.forEach((variant) => {
    describe(`${variant} single`, () => {
      it("works as a controlled component", async () => {
        const TestC = () => {
          const [value, setValue] = useState<AirplaneFile | undefined>(f1);
          return (
            <>
              <FileInput variant={variant} value={value} onChange={setValue} />
              <Button onClick={() => setValue(f2)}>button</Button>
            </>
          );
        };
        render(<TestC />);

        await screen.findByText("foo.txt");
        await userEvent.click(await screen.findByText("button"));
        await screen.findByText("bar.txt");
      });

      it("works as an uncontrolled component with component state", async () => {
        const TestC = () => {
          const inputState = useComponentState<FileInputState>("myFileInput");
          return (
            <>
              <FileInput
                variant={variant}
                data-testid="haha"
                id="myFileInput"
              />
              <Button
                onClick={() => {
                  inputState.setValue(f2);
                  inputState.setDisabled(true);
                }}
              >
                button
              </Button>
              <Text>{(inputState.value as AirplaneFile)?.name || "None"}</Text>
              <Text>{String(inputState.disabled)}</Text>
            </>
          );
        };
        render(<TestC />);

        const input = await screen.findByTestId("haha");
        expect(input).toHaveStyle("cursor: pointer");

        await userEvent.click(await screen.findByText("button"));

        await screen.findAllByText("bar.txt");
        await screen.findAllByText("true");
        expect(input).toHaveStyle("cursor: not-allowed");
      });
    });

    describe(`${variant} multiple`, () => {
      it("works as a controlled component", async () => {
        const TestC = () => {
          const [value, setValue] = useState<AirplaneFile[]>([f1]);
          return (
            <>
              <FileInput
                variant={variant}
                multiple
                value={value}
                onChange={setValue}
              />
              <Button onClick={() => setValue([f2, f3])}>button</Button>
            </>
          );
        };
        render(<TestC />);

        await screen.findByText("foo.txt");
        await userEvent.click(await screen.findByText("button"));
        if (variant === "basic") {
          await screen.findByText("bar.txt, baz.txt");
        } else {
          await screen.findByText("bar.txt");
          await screen.findByText("baz.txt");
        }
      });

      it("works as an uncontrolled component with component state", async () => {
        const TestC = () => {
          const inputState = useComponentState<FileInputState>("myFileInput");
          return (
            <>
              <FileInput
                variant={variant}
                multiple
                data-testid="haha"
                id="myFileInput"
              />
              <Button
                onClick={() => {
                  inputState.setValue([f2]);
                  inputState.setDisabled(true);
                }}
              >
                button
              </Button>
              <Text>
                {(inputState.value as AirplaneFile[])?.[0]?.name || "None"}
              </Text>
              <Text>{String(inputState.disabled)}</Text>
            </>
          );
        };
        render(<TestC />);

        const input = await screen.findByTestId("haha");
        expect(input).toHaveStyle("cursor: pointer");

        await userEvent.click(await screen.findByText("button"));
        await screen.findAllByText("bar.txt");
        await screen.findAllByText("true");
        expect(input).toHaveStyle("cursor: not-allowed");
      });
    });
  });
});

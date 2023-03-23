import { render, screen } from "test-utils/react";

import { Text } from "./Text";

describe("Text", () => {
  it("renders text", () => {
    render(<Text>hi</Text>);
    expect(screen.findByText("hi")).toBeTruthy();
  });
});

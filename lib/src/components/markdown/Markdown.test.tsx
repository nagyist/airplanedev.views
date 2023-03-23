import { render } from "test-utils/react";

import { Markdown } from "./Markdown";

describe("Markdown", () => {
  it("renders simple text", () => {
    const { getByText } = render(<Markdown>Hello, world!</Markdown>);
    expect(getByText("Hello, world!")).toBeInTheDocument();
  });

  it("renders headers", () => {
    const headers = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
`;
    const { getByRole } = render(<Markdown>{headers}</Markdown>);
    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Heading 1");
    expect(getByRole("heading", { level: 2 })).toHaveTextContent("Heading 2");
    expect(getByRole("heading", { level: 3 })).toHaveTextContent("Heading 3");
    expect(getByRole("heading", { level: 4 })).toHaveTextContent("Heading 4");
  });
});

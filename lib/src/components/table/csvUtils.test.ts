import { Column } from "react-table";

import { dataToCSV } from "./csvUtils";

describe("dataToCSV", () => {
  it("returns a CSV string", () => {
    type Row = {
      foo: { bar: string; baz: string };
      cat: { name: string; breed: string };
      string: string;
      number: number;
      boolean: boolean;
      null: null;
    };
    const columns: Column<Row>[] = [
      {
        id: "foo",
        accessor: (data) => data.foo,
      },
      {
        id: "cat",
        accessor: (data) => data.cat,
        valueToString: (cat) => cat.name,
      },
      {
        id: "string",
        accessor: (data) => data.string,
      },
      {
        id: "number",
        accessor: (data) => data.number,
      },
      {
        id: "boolean",
        accessor: (data) => data.boolean,
      },
      {
        id: "null",
        accessor: (data) => data.null,
      },
    ];
    const data: unknown[][] = [
      [
        { bar: "hello", baz: "world" },
        { name: "Graham Cracker", breed: "British Shorthair" },
        "hello",
        1,
        true,
        null,
      ],
    ];

    expect(dataToCSV(columns, data))
      .toEqual(`"foo","cat","string","number","boolean","null"
"{""bar"":""hello"",""baz"":""world""}","Graham Cracker","hello","1","true",""`);
  });
});

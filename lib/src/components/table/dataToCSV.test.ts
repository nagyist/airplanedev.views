import { CSVColumn, CSVRow, dataToCSV } from "./dataToCSV";

describe("dataToCSV", () => {
  it("returns a CSV string", () => {
    const columns: CSVColumn[] = [
      {
        id: "foo",
      },
      {
        id: "cat",
        valueToString: (cat) => cat.name,
      },
      {
        id: "string",
      },
      {
        id: "number",
      },
      {
        id: "boolean",
      },
      {
        id: "null",
      },
    ];
    const rows: CSVRow[] = [
      {
        values: {
          foo: { bar: "hello", baz: "world" },
          cat: { name: "Graham Cracker", breed: "British Shorthair" },
          string: "hello",
          number: 1,
          boolean: true,
          null: null,
        },
      },
    ];

    expect(dataToCSV(columns, rows))
      .toEqual(`"foo","cat","string","number","boolean","null"
"{""bar"":""hello"",""baz"":""world""}","Graham Cracker","hello","1","true",""`);
  });
});

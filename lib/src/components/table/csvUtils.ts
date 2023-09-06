import { Column as ReactTableColumn } from "react-table";

export function dataToCSVLink<TRowData extends object, TData>(
  columns: ReactTableColumn<TRowData>[],
  data: Array<Array<TData>>,
): string {
  return (
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(dataToCSV(columns, data))
  );
}

export function dataToCSV<TRowData extends object, TData>(
  columns: ReactTableColumn<TRowData>[],
  data: Array<Array<TData>>,
): string {
  const columnRow = columns
    .map((c) => String(c.label || c.id || ""))
    .map((c) => toCSVCell({ value: c }))
    .join(",");
  const dataRows = data.map((row) =>
    row
      .map((cell, i) =>
        toCSVCell({
          value: cell,
          valueToString: columns[i].valueToString,
        }),
      )
      .join(","),
  );
  return [columnRow, ...dataRows].join("\n");
}

function toCSVCell<TData>({
  value,
  valueToString,
}: {
  value: TData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueToString?: (value: any) => string;
}): string {
  const str =
    value != null && valueToString != null
      ? valueToString(value)
      : defaultToString(value);
  return escapeCSVString(str);
}

/**
 * escapeCSVString escapes a string for use in a CSV file.
 *
 * To escape CSV strings that might contain commas, we need to surround them by quotes,
 * e.g. `"abc,def",ghi`. So we always surround by quotes for simplicity.
 *
 * When we surround by quotes, we also need to convert quotes into double-quotes, e.g.
 * `abc"def,ghi` => `"abc""def","ghi"` are equivalent CSV strings.
 */
function escapeCSVString(str: string): string {
  return '"' + str.replace(/"/g, '""') + '"';
}

function defaultToString<TData>(datum: TData): string {
  if (datum == null) {
    return "";
  }
  if (typeof datum === "string") {
    return datum;
  }
  return JSON.stringify(datum);
}

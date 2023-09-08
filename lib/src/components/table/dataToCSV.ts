import { isActionColumn } from "./Column";

export type CSVColumn = {
  id: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueToString?: (value: any) => string;
};

export type CSVRow = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
};

export function dataToCSVLink(columns: CSVColumn[], rows: CSVRow[]): string {
  return (
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(dataToCSV(columns, rows))
  );
}

export function dataToCSV(columns: CSVColumn[], rows: CSVRow[]): string {
  const realCols = columns.filter((c) => !isActionColumn(c));
  const csvHeader = realCols
    .map((c) => escapeCSVString(String(c.label || c.id || "")))
    .join(",");
  const csvRows = rows.map((row) =>
    realCols
      .map((col) => {
        return toCSVCell({
          value: row.values[col.id],
          valueToString: col.valueToString,
        });
      })
      .join(","),
  );
  return [csvHeader, ...csvRows].join("\n");
}

function toCSVCell<Value>({
  value,
  valueToString,
}: {
  value: Value;
  valueToString?: (value: Value) => string;
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

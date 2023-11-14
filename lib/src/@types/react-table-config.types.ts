/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from "react";

import { SelectComponentProps } from "components/select/Select.types";
import { CellType } from "components/table/Cell";

export interface UseCustomCellProps<
  Value = any,
  TRowData extends object = Record<string, any>,
> {
  /** Whether the content of the column can be edited. */
  canEdit?: boolean;
  /**
   * The type of the column. The type specifies how this column is displayed in both editable and non-editable format.
   * The type can often be automatically inferred from the data; this value overrides any type that is automatically inferred.
   *
   * To configure options related to the type, see `typeOptions`.
   */
  type?: CellType;
  /**
   * Options that configure a specific column type.
   * Each option is prefixed with the specific type that it supports.
   */
  typeOptions?: {
    /**
     * The data, or options, to display in a `select` column when being edited.
     */
    selectData?: SelectComponentProps["data"];
    /** The minimum value for a `number` column when being edited. */
    numberMin?: number;
    /** The maximum value for a `number` column when being edited. */
    numberMax?: number;
  };
  /**
   * If true, the column's contents are wrapped onto newlines if they don't fit into the column.
   * If false, they are truncated.
   * @default false
   */
  wrap?: boolean;
  /** The label at the top of the column. */
  label?: string;
  /**
   * A custom component to render in the cell when you need a format that is not provided by `type`.
   * Takes a React component with props `{ value, row, startEditing }`. The `value` prop is the value
   * of the cell, the `row` prop is the entire row of data.
   *
   * If `canEdit` is also set for this column, a `startEditing` callback will be provided in the
   * arguments as well, which will render the editable component when called.
   *
   * The `wrap` prop has no effect on custom components.
   */
  Component?: ComponentType<{
    value: Value;
    row: TRowData;
    startEditing?: () => void;
  }>;
  /**
   * A custom component to render in the cell during editing. Passed in as a callback function that
   * takes the initial cell value and returns the custom editable component. Once editing is complete,
   * the custom component should call the `finishEditing` callback provided in the arguments, which
   * will exit editing mode for the given cell and render the regular non-editable component with
   * the updated value.
   *
   * The `wrap` prop has no effect on custom components.
   */
  EditComponent?: ComponentType<{
    defaultValue: Value;
    finishEditing: (newValue: Value) => void;
  }>;
  /**
   * A function that converts the value of the cell to a string.
   *
   * This is used when exporting the table to CSV to allow for custom formatting of the cell value.
   */
  valueToString?: (value: Value) => string;
  /**
   * Sets the width of the column. This width is a recommendation, and actual column widths will
   * adjust to the width of the enclosing container proportionally.
   */
  width?: number;
  /**
   * Sets the minimum width of the column. When the column width is adjusted, either manually or as
   * the table resizes, the column width will not drop below this value.
   */
  minWidth?: number;
  /**
   * Sets the maximum width of the column. When the column width is adjusted, either manually or as
   * the table resizes, the column width will not exceed this value.
   */
  maxWidth?: number;
}

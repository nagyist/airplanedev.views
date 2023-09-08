const ACTION_COLUMN_PREFIX = "__";
export const CHECKBOX_ACTION_COLUMN_ID = `${ACTION_COLUMN_PREFIX}selection`;
export const ROW_ACTION_COLUMN_ID = `${ACTION_COLUMN_PREFIX}rowAction`;

export const isActionColumn = (column: { id: string }) =>
  column.id.startsWith(ACTION_COLUMN_PREFIX);

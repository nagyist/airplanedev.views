export type ValidateFn<TValue> = (value: TValue) => string | undefined;

export type ValidateFnProp<TValue> =
  | ValidateFn<TValue>
  | Array<ValidateFn<TValue>>;

export type InputProps<TValue, TOnChange> = {
  /**
   * A single function or an array of functions that validate the input value.
   */
  validate?: ValidateFnProp<TValue>;
  /**
   * Adds red asterisk on the right side of label and sets required on input element
   * @default false
   */
  required?: boolean;
  onChange?: (value: TOnChange) => void;
};

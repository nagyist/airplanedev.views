// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T = any> = {
  /**
   * The ID referenced by the global component state.
   */
  id?: string;
  /**
   * The values backing the inputs. One input will be displayed for each value and the value
   * will be passed to the input function.
   */
  values: T[];
  /**
   * The input component to render for each value.
   */
  renderInput: ({
    index,
    value,
    disabled,
  }: {
    index: number;
    value: T;
    disabled: boolean;
  }) => React.ReactNode;
  /**
   * Whether the add and remove buttons are disabled.
   * The consumer is responsible for disabling the input components themselves.
   */
  disabled?: boolean;
  /**
   * A label to display above the inputs.
   */
  label?: string;
  /**
   * Whether the add new button is disabled.
   */
  addDisabled?: boolean;
  /**
   * A callback to call when the add button is clicked. If not provided, the add button will not
   * be rendered.
   */
  onAdd?: () => void;
  /**
   * A callback to call when the remove button next to an input is clicked. If not provided, the remove button will
   * not be rendered.
   */
  onRemove?: (index: number, value: T) => void;
  /**
   * Adds red asterisk on the right side of label and sets required on input element
   * @default false
   */
  required?: boolean;
  /**
   * Error text displayed below the input.
   */
  error?: React.ReactNode;
  /**
   * Description displayed below the input.
   */
  description?: React.ReactNode;
};

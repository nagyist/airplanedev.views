export type Props = {
  /**
   * The message content of the notification. Can be a string or a component.
   */
  message: React.ReactNode;
  /**
   * The title of the notification. Can be a string or a component.
   */
  title?: React.ReactNode;
  /** An icon on the left side of the notification. */
  icon?: React.ReactNode;
  /**
   * The type of the notification. Renders a specific icon and color combination.
   * @default info
   */
  type?: "info" | "success" | "error";
};

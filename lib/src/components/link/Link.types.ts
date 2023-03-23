import { CommonStylingProps } from "components/styling.types";
import { TextPropsBase } from "components/text/Text.types";
import { NavigateParams } from "routing";

export type PropsBase = {
  /**
   * Either a string URL to navigate to when the button is clicked, or a task or view to
   * navigate to in the form of { task: "task_slug" } or { view: "view_slug" }. You can
   * also provide optional params.
   */
  href: string | NavigateParams;
  /**
   * Whether the href URL should open in a new tab.
   * @default true
   */
  newTab?: boolean;
} & CommonStylingProps;

export type Props = PropsBase &
  TextPropsBase &
  Omit<JSX.IntrinsicElements["a"], keyof PropsBase | "ref">;

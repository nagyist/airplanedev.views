/**
 * Messages sent from the parent frame to the view.
 *
 * Note: any changes to these messages must be backwards-compatible - older versions
 * of the @airplane/views library may be expecting older versions of these messages.
 *
 * Keep in sync with web/lib/views/ParentMessage.ts
 */

type ToggleModalMessage = {
  type: "toggle_modal";
  id: string;
  open: boolean;
};

export type ParentMessage = ToggleModalMessage;

import { ViewMessage } from "./ViewMessage";

export const sendViewMessage = (message: ViewMessage) => {
  if (typeof window === "undefined") {
    return;
  }
  window.parent.postMessage(message, "*");
};

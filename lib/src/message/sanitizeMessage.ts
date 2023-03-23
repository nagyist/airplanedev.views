import { cloneDeepWith, isElement } from "lodash-es";
import objectInspect from "object-inspect";

export const FUNCTION_PREFIX = "_function:";
export const ELEMENT_PREFIX = "_element:";

/**
 * We can't send messages with DOM nodes or functions because they will result in a
 * data clone error. sanitizeMessage recursively clones an object and replaces the
 * DOM nodes and functions with a string representation.
 **/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sanitizeMessage = (message: any) => {
  return cloneDeepWith(message, (value) => {
    if (isElement(value)) {
      return ELEMENT_PREFIX + objectInspect(value);
    }
    if (typeof value === "function") {
      return FUNCTION_PREFIX + objectInspect(value);
    }
  });
};

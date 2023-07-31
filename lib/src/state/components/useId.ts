import { useRef } from "react";

let uniqueId = 0;
const getUniqueId = () => uniqueId++;

/**
 * useComponentId is a hook for getting a component id.
 *
 * It'll use the user provided id if it exists, otherwise it'll generate a unique id.
 */
export const useComponentId = (id?: string | undefined) => {
  const idRef = useRef<string>();
  if (idRef.current === undefined) {
    idRef.current = `component-${getUniqueId()}`;
  }
  return id || idRef.current;
};

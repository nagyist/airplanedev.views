import { useId } from "react";

/**
 * useUniqueId is a hook for generating a unique id for passing into components.
 *
 * This currently uses the React useId hook but this is an implementation detail that
 * may change in the future.
 */
const useUniqueId = useId;

/**
 * useComponentId is a hook for getting a component id.
 *
 * It'll use the user provided id if it exists, otherwise it'll generate a unique id.
 */
export const useComponentId = (id?: string | undefined) => {
  const genId = useUniqueId();
  return id || genId;
};

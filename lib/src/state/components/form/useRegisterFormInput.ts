import { useContext, useEffect } from "react";

import { FormContext, InputType } from "./FormProvider";

/**
 * useRegisterFormInput registers a component as a form input component.
 *
 * This allows the form to track the state of the component.
 */
export const useRegisterFormInput = (id: string, type: InputType) => {
  const { addFormInput, removeFormInput } = useContext(FormContext);
  useEffect(() => {
    if (id) {
      addFormInput(id, type);
    }
    return () => {
      if (id) {
        removeFormInput(id);
      }
    };
  }, [id, type, addFormInput, removeFormInput]);
};

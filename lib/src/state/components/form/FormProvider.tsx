import { useCallback, useState } from "react";
import * as React from "react";

/**
 * Supported form input types
 */
export type InputType =
  | "number-input"
  | "text-input"
  | "file-input"
  | "checkbox"
  | "switch"
  | "slider"
  | "select"
  | "date-picker"
  | "radio-group"
  | "multi-select"
  | "multi-input";
type FormTypeByID = Record<string, InputType>;

export type FormContextType = {
  formTypeByID: FormTypeByID;
  addFormInput: (id: string, type: InputType) => void;
  removeFormInput: (id: string) => void;
};

const defaultContext: FormContextType = {
  formTypeByID: {},
  addFormInput: () => {
    // Empty
  },
  removeFormInput: () => {
    // Empty
  },
};

export const FormContext = React.createContext<FormContextType>(defaultContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formInputs, setFormInputs] = useState<FormTypeByID>({});
  const addFormInput = useCallback((id: string, type: InputType) => {
    setFormInputs((formInputs) => {
      if (id in formInputs) {
        return formInputs;
      }
      return {
        ...formInputs,
        [id]: type,
      };
    });
  }, []);
  const removeFormInput = React.useCallback((id: string) => {
    setFormInputs((formInputs) => {
      if (!(id in formInputs)) {
        return formInputs;
      }
      const newFormInputs = { ...formInputs };
      delete newFormInputs[id];
      return newFormInputs;
    });
  }, []);
  const context: FormContextType = {
    formTypeByID: formInputs,
    addFormInput,
    removeFormInput,
  };
  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
};

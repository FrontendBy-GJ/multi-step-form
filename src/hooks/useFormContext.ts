import { useContext } from "react";
import { FormContext } from "../context/FormContext";

const useFormContext = () => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw new Error(
      "useFormContext must be used within a FormContext.Provider",
    );
  }

  return formContext;
};

export default useFormContext;

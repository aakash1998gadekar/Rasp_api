import { createContext } from 'react';

const FormContext = createContext({
  formData: {},
  setFormData: () => {},
});

export const FormProvider = FormContext.Provider;
export default FormContext;

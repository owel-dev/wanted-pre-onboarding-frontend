import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

function Form({
  children,
  initialForm = {},
  handleSubmit,
  buttonName,
  buttonTestId,
}) {
  Form.propTypes = {
    children: PropTypes.any.isRequired,
    initialForm: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired,
    buttonTestId: PropTypes.string.isRequired,
  };

  const [submitForm, setSubmitForm] = useState(initialForm);
  const [invalidInputs, setInvalidInputs] = useState({});
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(submitForm);
      }}
    >
      <FormContext.Provider
        value={{ submitForm, setSubmitForm, invalidInputs, setInvalidInputs }}
      >
        {children}
      </FormContext.Provider>
      <button
        type="submit"
        data-testid={buttonTestId}
        disabled={Object.keys(invalidInputs).length}
      >
        {buttonName}
      </button>
    </form>
  );
}

export default Form;

import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext({
  form: {},
});

function Form({ children, handleSubmit, initialValues, buttonName }) {
  Form.propTypes = {
    children: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    buttonName: PropTypes.string.isRequired,
  };

  const [form, setForm] = useState(initialValues);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(form);
      }}
    >
      <FormContext.Provider
        value={{
          form,
          handleFormChange,
        }}
      >
        {children}
      </FormContext.Provider>
      <button type="submit">{buttonName}</button>
    </form>
  );
}

export default Form;

import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext({
  form: {},
});

function Form({ children, submit, initialValues }) {
  Form.propTypes = {
    children: PropTypes.any,
    submit: PropTypes.func,
    initialValues: PropTypes.object,
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
        submit(form);
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
      <button type="button">Submit</button>
    </form>
  );
}

export default Form;

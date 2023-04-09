import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './Form';
import { useEffect, useContext } from 'react';

const FormInput = ({ testid, label, type, name, value, pattern, title }) => {
  FormInput.propTypes = {
    testid: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    pattern: PropTypes.string,
    title: PropTypes.string,
  };

  FormInput.defaultProps = {
    label: '',
    value: '',
    pattern: '',
    title: '',
  };

  const { submitForm, setSubmitForm, invalidInputs, setInvalidInputs } =
    useContext(FormContext);
  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    if (new RegExp(pattern).test(valueState)) {
      setSubmitForm({ ...submitForm, [name]: valueState });

      const newInvalidInputs = { ...invalidInputs };
      delete newInvalidInputs[name];
      setInvalidInputs({ ...newInvalidInputs });
    } else {
      setInvalidInputs({ ...invalidInputs, [name]: true });
    }
  }, [valueState]);

  return (
    <div>
      {label ? <label>{label}</label> : null}
      <input
        data-testid={testid}
        type={type}
        name={name}
        value={valueState}
        onChange={(e) => setValueState(e.target.value)}
      />
      {name in invalidInputs ? <p>{title}</p> : null}
    </div>
  );
};

export default FormInput;

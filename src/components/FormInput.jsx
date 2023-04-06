import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FormContext } from './Form';

const FormInput = ({ testid, label, type, name }) => {
  FormInput.propTypes = {
    testid: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
  };

  FormInput.defaultProps = {
    testid: '',
    type: 'text',
  };

  const { form, handleFormChange } = useContext(FormContext);

  return (
    <div className="FormInput">
      <label>{label}</label>
      <input
        data-testid={testid}
        type={type}
        name={name}
        value={form[name]}
        onChange={handleFormChange}
      />
    </div>
  );
};

export default FormInput;

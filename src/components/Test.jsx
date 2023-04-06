import React from 'react';
import { useState, useEffect } from 'react';
import FormInput from './FormInput';
import Form from './Form';

const Test = () => {
  const [message, setMessage] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const submit = (form) => {
    setMessage(`${form.email}. ${form.password}`);
  };

  return (
    <div className="App">
      <h1>회원가입</h1>

      <Form submit={submit} initialValues={initialValues}>
        <>
          <FormInput label="이메일" type="email" name="email" />
          <FormInput label="비밀번호" type="password" name="password" />
        </>
      </Form>
      <p>{message}</p>
    </div>
  );
};

export default Test;

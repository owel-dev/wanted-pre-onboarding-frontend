import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import Form from './Form';

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (formInputData) => {
    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/auth/signup',
        formInputData
      );
      if (response.status === 201) {
        alert('회원가입이 완료되었습니다.');
        navigate('/signin');
      } else {
        alert(
          `회원가입이 정상 처리되지 않았습니다. 에러코드: ${response.status}`
        );
      }
    } catch (error) {
      const keyValueString = Object.entries(error.response.data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(',\n');
      alert(`회원가입에 실패했습니다.\n${keyValueString}`);
    }
  };

  return (
    <div className="signup">
      <h1>회원가입</h1>
      <Form
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        buttonName="회원가입"
      >
        <>
          <FormInput
            label="이메일"
            type="text"
            name="email"
            pattern=".*@.*"
            title="이메일은 '@' 기호를 포함해야 합니다."
          />
          <FormInput
            label="비밀번호"
            type="password"
            name="password"
            pattern=".{8,}"
            title="비밀번호는 8자 이상이어야 합니다."
          />
        </>
      </Form>
      <br />
      <Link to="/">홈</Link> &nbsp;&nbsp;
      <Link to="/signin">로그인</Link>
    </div>
  );
};

export default SignUp;

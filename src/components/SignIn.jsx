import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import Form from './Form';

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (formInputData) => {
    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/auth/signin',
        formInputData
      );
      if (response.status === 200) {
        const { access_token } = response.data;
        Cookies.set('access_token', access_token);
        navigate('/todo');
      } else {
        alert('로그인이 정상 처리되지 않았습니다.');
      }
    } catch (error) {
      const keyValueString = Object.entries(error.response.data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(',\n');
      alert(`로그인에 실패했습니다.\n${keyValueString}`);
    }
  };

  return (
    <div className="signin">
      <h1>로그인</h1>
      <Form
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        buttonName="로그인"
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
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default SignIn;

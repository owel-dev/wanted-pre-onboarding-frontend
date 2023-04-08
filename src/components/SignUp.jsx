import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import Form from './Form';
import { handleError } from '../handleSubmit';
import { apiURL } from '../envVariables';

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (formInputData) => {
    try {
      await axios.post(
        `${apiURL}/auth/signup`,
        formInputData
      );
      alert('회원가입이 완료되었습니다.');
      navigate('/signin');
    } catch (error) {
      handleError(error, '회원가입');
    }
  };

  return (
    <div className="signup">
      <h1>회원가입</h1>
      <Form handleSubmit={handleSubmit} initialValues={initialValues}>
        <FormInput
          testid="email-input"
          label="이메일"
          type="text"
          name="email"
          pattern=".*@.*"
          title="이메일은 '@' 기호를 포함해야 합니다."
        />
        <FormInput
          testid="password-input"
          label="비밀번호"
          type="password"
          name="password"
          pattern=".{8,}"
          title="비밀번호는 8자 이상이어야 합니다."
        />
        <button data-testid="signup-button" type="submit">회원가입</button>
      </Form>
      <br />
      <Link to="/">홈</Link> &nbsp;&nbsp;
      <Link to="/signin">로그인</Link>
    </div>
  );
};

export default SignUp;

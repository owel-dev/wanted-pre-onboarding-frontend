import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignIn = () => {
  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (inputEmail) => {
    return inputEmail.includes('@') && inputEmail.length <= 100;
  };

  const isValidPassword = (inputPassword) => {
    return 8 <= inputPassword.length && inputPassword.length <= 100;
  };

  useEffect(() => {
    setValidEmail(isValidEmail(stateEmail));
  }, [stateEmail]);

  useEffect(() => {
    setValidPassword(isValidPassword(statePassword));
  }, [statePassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/auth/signin',
        {
          email: stateEmail,
          password: statePassword,
        }
      );
      if (response.status === 200) {
        const { access_token } = response.data;
        Cookies.set('access_token', access_token);
        navigate('/todo');
      } else {
        alert(
          `로그인이 정상 처리되지 않았습니다. 에러코드: ${response.status}`
        );
      }
    } catch (error) {
      console.log('error: ', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <>
      <div>로그인</div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          value={stateEmail}
          placeholder="Email을 입력해주세요."
          onChange={(e) => setStateEmail(e.target.value)}
        />
        <div>
          {!validEmail && stateEmail.length != 0
            ? '이메일 형식이 맞지 않습니다.'
            : ''}
        </div>
        <br />
        <input
          data-testid="password-input"
          type="password"
          value={statePassword}
          placeholder="Password를 입력해주세요."
          onChange={(e) => setStatePassword(e.target.value)}
        />
        <div>
          {!validPassword && statePassword.length != 0
            ? '비밀번호는 8자 이상입니다.'
            : ''}
        </div>
        <br />

        <button
          disabled={!validEmail || !validPassword}
          data-testid="signin-button"
          type="submit"
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default SignIn;

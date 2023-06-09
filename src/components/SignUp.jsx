import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import Form from './Form';
import { handleError } from '../handleSubmit';
import { apiURL } from '../envVariables';
import Cookies from 'js-cookie';

const SignUp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            navigate('/todo');
        }
    }, []);

    const handleSubmit = async (formInputData) => {
        try {
            await axios.post(`${apiURL}/auth/signup`, formInputData);
            alert('회원가입이 완료되었습니다.');
            navigate('/signin');
        } catch (error) {
            handleError(error, '회원가입');
        }
    };

    return (
        <div>
            <h1>회원가입</h1>
            <Form
                handleSubmit={handleSubmit}
                buttonName="회원가입"
                buttonTestId="signup-button"
            >
                <FormInput
                    testid="email-input"
                    label="이메일"
                    type="text"
                    name="email"
                    pattern="(?=.*@).{1,}"
                />
                <FormInput
                    testid="password-input"
                    label="비밀번호"
                    type="password"
                    name="password"
                    pattern=".{8,}"
                />
            </Form>
            <br />
            <Link to="/">홈</Link> &nbsp;&nbsp;
            <Link to="/signin">로그인</Link>
        </div>
    );
};

export default SignUp;

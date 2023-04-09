import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import Form from './Form';
import { handleError } from '../handleSubmit';
import { apiURL } from '../envVariables';

const SignIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            navigate('/todo');
        }
    }, []);

    const handleSubmit = async (formInputData) => {
        try {
            const response = await axios.post(`${apiURL}/auth/signin`, formInputData);
            const { access_token } = response.data;
            Cookies.set('access_token', access_token);
            navigate('/todo');
        } catch (error) {
            handleError(error, '로그인');
        }
    };

    return (
        <div>
            <h1>로그인</h1>
            <Form
                handleSubmit={handleSubmit}
                buttonName="로그인"
                buttonTestId="signin-button"
            >
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
            </Form>
            <br />
            <Link to="/">홈</Link> &nbsp;&nbsp;
            <Link to="/signup">회원가입</Link>
        </div>
    );
};

export default SignIn;

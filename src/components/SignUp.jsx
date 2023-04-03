import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [stateEmail, setStateEmail] = useState('');
    const [statePassword, setStatePassword] = useState('');
    const [alertEmail, setAlertEmail] = useState('');
    const [alertPassword, setAlertPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isValidEmail(stateEmail) && isValidPassword(statePassword)) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }, [stateEmail, statePassword]);

    const isValidEmail = (inputEmail) => {
        return inputEmail.includes('@') && inputEmail.length <= 100;
    }
    
    const isValidPassword = (inputPassword) => {
        return 8 <= inputPassword.length && inputPassword.length <= 100;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        isValidEmail(stateEmail) ?  
            setAlertEmail(''): setAlertEmail('이메일 형식에 맞지 않습니다.');

        isValidPassword(statePassword) ?  
            setAlertPassword(''): setAlertPassword('패스워드는 8자 이상이어야 합니다.');

        if (!isValid) {
            console.log('올바르지 않은 입력값');
            return ;
        }

        try {
            const response = await axios.post(
                'https://www.pre-onboarding-selection-task.shop/auth/signup', 
                {
                    email: stateEmail, 
                    password: statePassword,
                }
            );
            if (response.status === 201){
                alert('회원가입이 완료되었습니다.')
                navigate('/signin')
            } else {
                console.log(`회원가입이 정상 처리되지 않았습니다. 에러코드: ${response.status}`);
            }
        } catch (error) {
            alert('알 수 없는 이유로 회원가입이 실패했습니다. 관리자에게 문의해주세요.')
        }


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    data-testid="email-input"
                    value={stateEmail}
                    placeholder="Email을 입력해주세요."
                    onChange={(e) => setStateEmail(e.target.value)}
                />
                <div id="email-alert">{alertEmail}</div>
                <br/>

                <input 
                    data-testid="password-input"
                    type="password"
                    value={statePassword}
                    placeholder="Password를 입력해주세요."
                    onChange={(e) => setStatePassword(e.target.value)} 
                />
                <div id="password-alert">{alertPassword}</div>
                <br/>

                <button data-testid="signup-button" type="submit">회원가입</button>
            </form>
        </>
    );
};

export default SignUp;

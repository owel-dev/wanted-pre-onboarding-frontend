import React from 'react';

const SignUp = () => {
    return (
        <>
            <input data-testid="email-input" />
            <input data-testid="password-input" />
            <button data-testid="signup-button">회원가입</button>
        </>
    );
};

export default SignUp;

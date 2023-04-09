import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>Hello World!</div>
            <br />
            <Link to="/signup">회원가입</Link> &nbsp;&nbsp;
            <Link to="/signin">로그인</Link>
        </>
    );
};

export default Home;

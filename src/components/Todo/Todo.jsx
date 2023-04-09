import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleError } from '../../handleSubmit';
import { apiURL } from '../../envVariables';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      navigate('/signin');
      return;
    }

    axios
      .get(`${apiURL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseTodoList = response.data;
        setTodoList(
          responseTodoList.map((item) => ({
            ...item,
            editMode: false,
          }))
        );
      })
      .catch((error) => {
        handleError(error, 'Todo 목록 가져오기');
        navigate('/signin');
      });
  }, []);

  return (
    <div>
      <TodoForm todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <br />
      <Link to="/">홈</Link> &nbsp;&nbsp;
      <Link to="/signin">로그인</Link> &nbsp;&nbsp;
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default Todo;

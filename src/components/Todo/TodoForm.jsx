import React from 'react';
import Form from '../Form';
import FormInput from '../FormInput';
import Cookies from 'js-cookie';
import { apiURL } from '../../envVariables';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../handleSubmit';
import PropTypes from 'prop-types';

const TodoForm = ({todoList, setTodoList}) => {
  TodoForm.propTypes = {
    todoList: PropTypes.array.isRequired,
    setTodoList: PropTypes.func.isRequired
  };
  const navigate = useNavigate();

  const handleCreateTodo = async (createTodoInput) => {
    const token = Cookies.get('access_token');
    try {
      const response = await axios.post(`${apiURL}/todos`, createTodoInput, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseTodo = response.data;
      responseTodo['editMode'] = false;
      setTodoList([...todoList, responseTodo]);
    } catch (error) {
      handleError(error, 'Todo 생성');
      navigate('/signin');
    }
  };

  return (
    <Form
      handleSubmit={handleCreateTodo}
      buttonName="추가"
      buttonTestId="new-todo-add-button"
    >
      <FormInput testid="new-todo-input" type="text" name="todo" pattern=".+" />
    </Form>
  );
};

export default TodoForm;

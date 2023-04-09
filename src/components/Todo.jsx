import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import Form from './Form';
import { handleError } from '../handleSubmit';
import { apiURL } from '../envVariables';

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

  const handleDeleteTodo = async (deleteTodoItem) => {
    const token = Cookies.get('access_token');
    const deleteTodoItemId = deleteTodoItem.id;
    try {
      await axios.delete(`${apiURL}/todos/${deleteTodoItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoList(
        todoList.filter((item) => {
          return item.id !== deleteTodoItemId;
        })
      );
    } catch (error) {
      handleError(error, '삭제');
    }
  };

  const handleEditMode = (editModeTodo) => {
    setTodoList(
      todoList.map((item) => {
        return item.id === editModeTodo.id
          ? { ...item, editMode: !item.editMode }
          : item;
      })
    );
  };

  const handleSubmitEdit = async (submitEditTodo) => {
    const token = Cookies.get('access_token');
    const { id, todo, isCompleted } = submitEditTodo;
    try {
      const response = await axios.put(
        `${apiURL}/todos/${id}`,
        {
          todo,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseTodo = response.data;
      setTodoList(
        todoList.map((item) => {
          return item.id == responseTodo.id ? responseTodo : item;
        })
      );
    } catch (error) {
      handleError(error, 'Todo 수정 제출');
    }
  };

  return (
    <div>
      <h1>Todo</h1>
      <Form
        handleSubmit={handleCreateTodo}
        buttonName="추가"
        buttonTestId="new-todo-add-button"
      >
        <FormInput
          testid="new-todo-input"
          type="text"
          name="todo"
          pattern=".+"
        />
      </Form>
      <br />
      <ul>
        {todoList.map((item, index) => {
          const { id, isCompleted, todo, editMode } = item;
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() =>
                  handleSubmitEdit({
                    id,
                    todo,
                    isCompleted: !isCompleted,
                  })
                }
              />
              {editMode ? (
                <>
                  <Form
                    initialForm={{
                      id: id,
                      todo: todo,
                      isCompleted: isCompleted,
                    }}
                    handleSubmit={handleSubmitEdit}
                    buttonName="제출"
                    buttonTestId="submit-button"
                  >
                    <FormInput
                      testid="modify-input"
                      type="text"
                      name="todo"
                      value={todo}
                      pattern=".+"
                    />
                  </Form>
                  <button
                    data-testid="cancel-button"
                    onClick={() => handleEditMode(item)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  {todo}
                  <button
                    data-testid="modify-button"
                    onClick={() => handleEditMode(item)}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => handleDeleteTodo(item)}
                  >
                    삭제
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">홈</Link> &nbsp;&nbsp;
      <Link to="/signin">로그인</Link> &nbsp;&nbsp;
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default Todo;

import React from 'react';
import Form from '../Form';
import FormInput from '../FormInput';
import axios from 'axios';
import Cookies from 'js-cookie';
import { handleError } from '../../handleSubmit';
import { apiURL } from '../../envVariables';
import PropTypes from 'prop-types';


const TodoItem = ({ item, index, todoList, setTodoList }) => {
  TodoItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    todoList: PropTypes.array.isRequired,
    setTodoList: PropTypes.func.isRequired
  };

  const { id, isCompleted, todo, editMode } = item;

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

  const handleEditMode = (editModeTodo) => {
    setTodoList(
      todoList.map((item) => {
        return item.id === editModeTodo.id
          ? { ...item, editMode: !item.editMode }
          : item;
      })
    );
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
};

export default TodoItem;

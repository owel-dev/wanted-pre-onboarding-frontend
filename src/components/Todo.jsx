import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [addInput, setAddInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('access_token');

    const response = axios
      .get('https://www.pre-onboarding-selection-task.shop/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status != 200) {
          alert('허가되지 않은 경로입니다, 로그인을 해 주세요.');
          navigate('/signin');
        }
        const res_todo = response.data;
        console.log(res_todo);
        setTodoList(
          res_todo.map((item) => ({
            ...item,
            editMode: false,
            editing: item.todo,
          }))
        );
        setReload(false);
      })
      .catch((error) => {
        alert('에러가 발생했습니다 ', error);
        navigate('/signin');
      });
  }, [reload]);

  const handleChange = (e, setStateFunc) => {
    setStateFunc(e.target.value);
  };

  const addTodo = async () => {
    const token = Cookies.get('access_token');

    try {
      const response = await axios.post(
        'https://www.pre-onboarding-selection-task.shop/todos',
        {
          todo: addInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status != 201) {
        alert('허가되지 않은 경로입니다, 로그인을 해 주세요.');
        navigate('/signin');
      }
      setReload(true);
      setAddInput('');
    } catch (error) {
      alert('에러가 발생했습니다 ', error);
      navigate('/signin');
    }
  };

  const deleteTodo = async (paramid) => {
    const token = Cookies.get('access_token');

    try {
      const response = await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${paramid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status != 204) {
        alert('허가되지 않은 경로입니다, 로그인을 해 주세요.');
        navigate('/signin');
      }
      setReload(true);
    } catch (error) {
      alert('에러가 발생했습니다 ', error);
      navigate('/signin');
    }
  };

  const submitEdit = async (id, input, ischecked) => {
    const token = Cookies.get('access_token');

    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: input,
          isCompleted: ischecked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status != 200) {
        alert('허가되지 않은 경로입니다, 로그인을 해 주세요.');
        navigate('/signin');
      }
      setReload(true);
    } catch (error) {
      alert('에러가 발생했습니다 ', error);
      navigate('/signin');
    }
  };

  const changeTodoList = (id, setEditMode, setEditing) => {
    setTodoList(
      todoList.map((todoItem) =>
        todoItem.id == id
          ? {
              ...todoItem,
              editMode: setEditMode,
              editing: setEditing,
            }
          : todoItem
      )
    );
  };

  return (
    <>
      <input
        data-testid="new-todo-input"
        type="text"
        value={addInput}
        onChange={(e) => handleChange(e, setAddInput)}
      />
      <button data-testid="new-todo-add-button" onClick={addTodo}>
        추가
      </button>
      <ul>
        {todoList.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => submitEdit(item.id, item.todo, !item.isCompleted)}
            />
            {item.editMode ? (
              <>
                <input
                  value={item.editing}
                  onChange={(e) =>
                    changeTodoList(item.id, item.editMode, e.target.value)
                  }
                />
                <button
                  data-testid="submit-button"
                  onClick={() =>
                    submitEdit(item.id, item.editing, item.isCompleted)
                  }
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => changeTodoList(item.id, false, item.todo)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                {item.todo}
                <button
                  data-testid="modify-button"
                  onClick={() => changeTodoList(item.id, true, item.todo)}
                >
                  수정
                </button>
                <button
                  data-testid="delete-button"
                  onClick={() => deleteTodo(item.id)}
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;

import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ToDo = () => {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
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
                setTodos(res_todo);
                setReload(false);
            })
            .catch((error) => {
                alert('에러가 발생했습니다 ', error);
                navigate('/signin');
            });
    }, [reload]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const addClick = async () => {
        const token = Cookies.get('access_token');

        try {
            const response = await axios.post(
                'https://www.pre-onboarding-selection-task.shop/todos',
                {
                    todo: inputValue,
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
        } catch (error) {
            alert('에러가 발생했습니다 ', error);
            navigate('/signin');
        }
        setReload(true);
        setInputValue('');
    };

    return (
        <>
            <input
                data-testid="new-todo-input"
                type="text"
                value={inputValue}
                onChange={handleChange}
            />
            <button data-testid="new-todo-add-button" onClick={addClick}>
                추가
            </button>
            <ul>
                {todos.map((item, index) => (
                    <li key={index}>
                        <input type="checkbox"></input>
                        {item.todo}
                        <button data-testid="modify-button">수정</button>
                        <button data-testid="delete-button">삭제</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ToDo;

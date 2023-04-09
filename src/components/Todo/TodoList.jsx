import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, setTodoList }) => {
  TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    setTodoList: PropTypes.func.isRequired
  };

  return (
    <ul>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      ))}
    </ul>
  );
};

export default TodoList;

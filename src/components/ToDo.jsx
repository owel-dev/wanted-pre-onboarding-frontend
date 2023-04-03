import React from 'react';
export const ToDo = () => {
    return (
        <>
            <input data-testid="new-todo-input" />
            <button data-testid="new-todo-add-button">추가</button>
        </>
    );
};

export default ToDo;
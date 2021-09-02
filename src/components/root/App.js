import React, { useState, useRef } from 'react'
import '../../dist/css/style.css';
import { MdDelete } from 'react-icons/md';
import { nanoid } from 'nanoid';

const INITIAL_STATE = [
  { id: nanoid(), title: "Eat", status: false },
  { id: nanoid(), title: "Sleep", status: false },
  { id: nanoid(), title: "Code", status: false },
  { id: nanoid(), title: "Repeat", status: false },
]

const App = () => {


  const inputRef = useRef();
  const [todoList, setTodoList] = useState(INITIAL_STATE);
  const [newTodoTitle, setNewTodoTitle] = useState("");


  const addNewTodo = () => {
    if (newTodoTitle === '') {
      return;
    }
    setTodoList([...todoList, { id: nanoid(), title: newTodoTitle, status: false }]);
    setNewTodoTitle("");
    inputRef.current.focus();
  }

  const handleChange = event => {
    setNewTodoTitle(event.target.value);
  }

  const markCompleted = id => {
    setTodoList(
      todoList.map(todo => todo.id === id ? { ...todo, status: !todo.status } : todo)
    )
  }

  const removeCompletedTodo = () => {
    setTodoList(todoList.filter(todo => !todo.status));
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      addNewTodo();
    }
  }
  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="inputs">
        <input
          type="text"
          ref={inputRef}
          value={newTodoTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="inputs-add"
          placeholder="type here" />
        <button
          onClick={addNewTodo}
          className="inputs-btn">Add a new todo</button>
      </div>
      <div className="todos">
        {todoList.length === 0 ?
          "Todo list is empty." :
          <ul>
            {todoList.map((todo, index) => (
              <li
                key={todo.id}>
                <span
                  onClick={() => markCompleted(todo.id)}
                  className={todo.status ? 'todos-item done' : 'todos-item'}>
                  {index + 1 + '. ' + todo.title}
                </span>
                <span
                  onClick={() => setTodoList(todoList.filter(item => item.id !== todo.id))}
                  className="todos-delete">
                  <MdDelete />
                </span>
              </li>
            ))}
          </ul>
        }
      </div>
      <button
        onClick={() => removeCompletedTodo()}
        className="btn-clear">Clear completed</button>
    </div>
  )
}

export default App

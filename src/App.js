import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleSaveEdit = () => {
    const newTodos = [...todos];
    newTodos[editIndex].text = editValue;
    setTodos(newTodos);
    setEditIndex(null);
    setEditValue('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h3>Jessica Angela Huang - 2602213031</h3>
      <h1>‧ ₊ ˚ To-Do List ♡ ⑅˚₊</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new Task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('uncompleted')}>Uncompleted</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(index)}
            />
            {editIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
            ) : (
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => handleToggleTodo(index)}
              >
                {todo.text}
              </span>
            )}
            {editIndex === index ? (
              <button onClick={handleSaveEdit}>Save</button>
            ) : (
              <>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleRemoveTodo(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

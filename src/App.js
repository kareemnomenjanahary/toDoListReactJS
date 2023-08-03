import React, { useState } from 'react';

function App() {
  const [Todo, setTodo] = useState([]);
  const [nouvTodo, setnouvTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  const gererChangementEntre = (event) => {
    setnouvTodo(event.target.value);
  };

  const ajoutTodo = () => {
    if (nouvTodo.trim() !== '') {
      setTodo([...Todo, { text: nouvTodo, isCompleted: false }]);
      setnouvTodo('');
    }
  };

  const supprTodo = (index) => {
    const updatedTodo = Todo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
  };

  const editTodoText = (index, newText) => {
    const updatedTodo = Todo.map((todo, i) => {
      if (i === index) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodo(updatedTodo);
    setEditTodo(null);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodo = Todo.map((todo, i) => {
      if (i === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodo(updatedTodo);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={nouvTodo} onChange={gererChangementEntre} />
      <button onClick={ajoutTodo}>Ajouter</button>
      <ul>
        {Todo.map((todo, index) => (
          <li key={index}>
            {editTodo === index ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => editTodoText(index, e.target.value)}
              />
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.isCompleted ? 'line-through' : 'none',
                  }}
                  onClick={() => toggleTodoCompletion(index)}
                >
                  {todo.text}
                </span>
                <button onClick={() => setEditTodo(index)}>Modifier</button>
                <button onClick={() => supprTodo(index)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

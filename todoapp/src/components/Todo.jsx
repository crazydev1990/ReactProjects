import React from 'react'
import { useState,useEffect } from 'react'
const Todo = () => {
  // 1. Load initial tasks from localStorage if they exist, otherwise start with an empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('my_todo_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // 2. Automatically save tasks to localStorage whenever the 'tasks' state changes
  useEffect(() => {
    localStorage.setItem('my_todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const deleteTask = (indexToRemove) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTasks);
  };

  const startEdit = (index, currentText) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  const saveEdit = (indexToSave) => {
    if (editText.trim() !== '') {
      const updatedTasks = tasks.map((task, index) => 
        index === indexToSave ? editText : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText('');
    }
  };

  return (
    <>
       <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Task Manager (Saved)</h2>
      
      {/* Input Fields */}
      <div style={{ marginBottom: '25px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="New Task Name..." 
          style={{ padding: '10px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button 
          onClick={addTask} 
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Add Task
        </button>
      </div>

      {/* Styled Table Section */}
      {tasks.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#6200ee', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px 15px', width: '10%' }}>#</th>
              <th style={{ padding: '12px 15px', width: '55%' }}>Task Description</th>
              <th style={{ padding: '12px 15px', width: '35%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr 
                key={index} 
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9', 
                  borderBottom: '1px solid #dddddd' 
                }}
              >
                <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#666' }}>{index + 1}</td>
                
                <td style={{ padding: '12px 15px', wordBreak: 'break-word' }}>
                  {editIndex === index ? (
                    <input 
                      type="text" 
                      value={editText} 
                      onChange={(e) => setEditText(e.target.value)} 
                      style={{ padding: '6px', fontSize: '15px', width: '90%', border: '1px solid #6200ee', borderRadius: '4px' }}
                    />
                  ) : (
                    <span style={{ fontSize: '16px', color: '#333' }}>{task}</span>
                  )}
                </td>

                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  {editIndex === index ? (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => saveEdit(index)} style={{ padding: '6px 12px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditIndex(null)} style={{ padding: '6px 12px', backgroundColor: '#757575', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => startEdit(index, task)} 
                        style={{ padding: '6px 12px', backgroundColor: '#0288d1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => deleteTask(index)} 
                        style={{ padding: '6px 12px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        ❌ Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: 'center', color: '#888', fontStyle: 'italic', marginTop: '20px' }}>No tasks found. Add a task to get started!</p>
      )}
    </div>

    </>
  )
}

export default Todo



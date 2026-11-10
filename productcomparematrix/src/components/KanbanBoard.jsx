import React, { useState } from 'react';

const KanbanBoard = () => {
  // ૧. શરૂઆતનો ડિફોલ્ટ ટાસ્ક ડેટાબેઝ પૂલ
  const initialTasks = [
    { id: 't1', title: 'Fix Layout CSS Bug', status: 'todo' },
    { id: 't2', title: 'Integrate Live Weather API', status: 'inprogress' },
    { id: 't3', title: 'Build Multi-Step Form Wizard', status: 'done' }
  ];

  // ૨. સ્ટેટ મેનેજર્સ (Storage Boxes)
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // કયા ટાસ્ક પર એડિટિંગ ચાલુ છે તેનું આઈડી
  const [editingTitle, setEditingTitle] = useState('');     // એડિટિંગ વખતે ટાઈપ થતું લખાણ
  const [statusMessage, setStatusMessage] = useState('Jira workspace active. Double-click or click icon to edit any task.');

  // 📥 ૩. CREATE: નવું ટાસ્ક ઉમેરવાનું ફંક્શન (Add Task)
  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTaskNode = {
      id: `t_${Date.now()}`,
      title: newTaskTitle.trim(),
      status: 'todo'
    };

    setTasks((prev) => [...prev, newTaskNode]);
    setNewTaskTitle('');
    setStatusMessage(`🟢 Added task: "${newTaskNode.title}" to To Do.`);
  };

  // 📝 ૪. UPDATE: એડિટ મોડ ઓન કરવાનું ફંક્શન (Start Edit)
  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setStatusMessage(`📝 Modifying task profile: "${task.title}"`);
  };

  // 💾 ૫. UPDATE: સુધારેલું લખાણ સેવ કરવાનું ફંક્શન (Save Edit)
  const saveEditedTaskTitle = (taskId) => {
    if (!editingTitle.trim()) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: editingTitle.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditingTitle('');
    setStatusMessage('💾 Task parameter metrics updated successfully.');
  };

  // 🗑️ ૬. DELETE: ટાસ્ક કાયમ માટે હટાવવાનું ફંક્શન (Delete Task)
  const handleDeleteTaskNode = (taskId) => {
    setTasks((prev) => prev.filter(task => task.id !== taskId));
    setStatusMessage('🗑️ Task node terminated cleanly from sprint logs.');
  };

  // 🎛️ ૭. HTML5 DRAG & DROP ENGINE
  const handleDragStartNode = (e, taskId) => {
    e.dataTransfer.setData("activeTaskId", taskId);
  };

  const handleDropNode = (e, targetStatus) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData("activeTaskId");

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === draggedTaskId) {
          setStatusMessage(`🔄 Routed "${task.title}" matrix state cleanly to [${targetStatus.toUpperCase()}].`);
          return { ...task, status: targetStatus };
        }
        return task;
      })
    );
  };

  const allowDropOverColumn = (e) => {
    e.preventDefault();
  };

  const getTasksByStatus = (statusColumn) => tasks.filter(t => t.status === statusColumn);

  return (
    <div style={{ maxWidth: '850px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #38bdf8', padding: '25px', borderRadius: '24px', textAlign: 'center', margin: '0 auto', boxSizing: 'border-box', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Jira Agile Sprint Board 📋</h3>
      <p style={{ margin: '0 0 25px 0', fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Full CRUD Interface • Drag & Drop Enabled</p>

      {/* 🔍 ADD NEW SPRINT TASK FORM */}
      <form onSubmit={handleAddTaskSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '500px', margin: '0 auto 30px auto' }}>
        <input 
          type="text" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Create new sprint task parameter..."
          style={{ flexGrow: 1, padding: '11px 15px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" disabled={!newTaskTitle.trim()} style={{ padding: '11px 22px', backgroundColor: '#38bdf8', color: '#020617', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(56,189,248,0.2)' }}>
          + Add Task
        </button>
      </form>

      {/* 📊 THE 3-COLUMN AGILE KANBAN GRID GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
        
        {/* COLUMNS DATA MODEL GENERATOR ARRAY (To Do, In Progress, Done) */}
        {['todo', 'inprogress', 'done'].map((colStatus) => {
          const colThemes = {
            todo: { label: '🔴 TO DO', color: '#ef4444' },
            inprogress: { label: '🟡 IN PROGRESS', color: '#eab308' },
            done: { label: '🟢 DONE', color: '#22c55e' }
          };
          const activeTheme = colThemes[colStatus];

          return (
            <div 
              key={colStatus}
              onDragOver={allowDropOverColumn}
              onDrop={(e) => handleDropNode(e, colStatus)}
              style={{ backgroundColor: '#020617', border: `1px solid ${activeTheme.color}`, borderRadius: '16px', padding: '15px', minHeight: '340px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {/* Column Title Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '8px', marginBottom: '5px' }}>
                <strong style={{ color: activeTheme.color, fontSize: '14px' }}>{activeTheme.label}</strong>
                <span style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                  {getTasksByStatus(colStatus).length}
                </span>
              </div>
              
              {/* Dynamic Task Cards Rendering Array */}
              {getTasksByStatus(colStatus).map(task => {
                const isEditing = editingTaskId === task.id;

                return (
                  <div 
                    key={task.id} 
                    draggable={!isEditing} // એડિટિંગ વખતે ડ્રેગિંગ બંધ રહેશે જેથી ટેક્સ્ટ ટાઈપ કરી શકાય
                    onDragStart={(e) => handleDragStartNode(e, task.id)} 
                    style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '12px', borderRadius: '8px', cursor: isEditing ? 'default' : 'grab', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all 0.1s' }}
                  >
                    {isEditing ? (
                      /* 📝 LIVE INLINE EDITING INTERFACE TEXT BOX */
                      <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                        <input 
                          type="text" 
                          value={editingTitle} 
                          onChange={(e) => setEditingTitle(e.target.value)}
                          style={{ flexGrow: 1, padding: '6px 8px', fontSize: '13px', backgroundColor: '#020617', border: '1px solid #38bdf8', color: '#fff', borderRadius: '4px', outline: 'none' }}
                          autoFocus
                        />
                        <button onClick={() => saveEditedTaskTitle(task.id)} style={{ padding: '6px 10px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                      </div>
                    ) : (
                      /* 📄 REGULAR READ-ONLY DISPLAY WINDOW LAYER */
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <span 
                          onDoubleClick={() => startEditingTask(task)} // ડબલ-ક્લિક કરવાથી પણ એડિટ મોડ ઓન થશે
                          style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.4', textDecoration: task.status === 'done' ? 'line-through' : 'none', opacity: task.status === 'done' ? 0.6 : 1 }}
                        >
                          {task.title}
                        </span>
                        
                        {/* એક્શન કંટ્રોલ ટૂલ આઇકોન્સ */}
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                          <button onClick={() => startEditingTask(task)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '12px', padding: 0 }} title="Edit Task">📝</button>
                          <button onClick={() => handleDeleteTaskNode(task.id)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '12px', padding: 0 }} title="Delete Task">🗑️</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

      </div>

      {/* Live trace activity stream commentary text bar */}
      <small style={{ color: '#475569', fontStyle: 'italic', display: 'block', marginTop: '20px', textAlign: 'left', paddingLeft: '4px' }}>
        Sprint System Log: {statusMessage}
      </small>

    </div>
  );
};

export default KanbanBoard;

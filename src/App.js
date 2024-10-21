import React, { useState, useEffect } from 'react';
import Column from './components/column/Column'
import TaskForm from './components/taskForm/TaskForm'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [columns] = useState(['To Do', 'In Progress', 'Completed']);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
        />

        <TaskForm addTask={addTask} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {columns.map((column) => (
            <Column
              key={column}
              title={column}
              tasks={filteredTasks}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;

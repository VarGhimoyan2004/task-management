import React from 'react';
import Task from '../task/Task';
import './Column.css'
import { useDrop } from 'react-dnd';

const Column = ({ title, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, title),
  });

  const filteredTasks = tasks.filter((task) => task.status === title);

  return (
    <div ref={drop} className="column">
      <h2>{title}</h2>
      {filteredTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Column;

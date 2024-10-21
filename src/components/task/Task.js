import React from 'react';
import { useDrag } from 'react-dnd';
import './Task'

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3>{task.title}</h3>
    </div>
  );
};

export default Task;

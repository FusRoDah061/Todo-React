import React from 'react';
import TaskList from './TaskList';

function TaskColumn(props){
  return (
    <div className="task-column">
      <h2>{ props.title }</h2>

      <TaskList 
        tasks={ props.tasks } 
        onTaskChange={ props.onTaskChange } />
    </div>
  );
}

export default TaskColumn;
import React from 'react';
import TaskList from './TaskList';

import '../styles/TaskColumn.css';

function TaskColumn(props){
  return (
    <div className="task-column">
      <h2>{ props.title }</h2>

      <TaskList 
        tasks={ props.tasks } 
        onTaskChange={ props.onTaskChange }
        onEditTask={ props.onEditTask }
        onDeleteTask={ props.onDeleteTask } />
    </div>
  );
}

export default TaskColumn;
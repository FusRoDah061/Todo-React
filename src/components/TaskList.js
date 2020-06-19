import React from 'react';
import SubTaskList from './SubTaskList';

function TaskList(props) {
  const taskItens = props.tasks.map((task) => {
    return (
      <li className='task-item' key={ task.id }>
        <p>{ task.description }</p>
        <SubTaskList 
          tasks={ task.subtasks } 
          onTaskChange={ (subtask) => props.onTaskChange({ parent:task, subtask: subtask.subtask, checked: subtask.checked }) }/>
      </li>
    );
  });
  
  return (
    <ul className='task-list'>
      { taskItens }
    </ul>
  );
}

export default TaskList;
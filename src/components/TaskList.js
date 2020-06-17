import React from 'react';
import ToggleableSubTaskList from './ToggleableSubTaskList';

function TaskList(props) {
  const taskItens = props.tasks.map((task) => {
    return (
      <li className='task-item' key={ task.id }>
        <p>{ task.description }</p>
        <ToggleableSubTaskList tasks={ task.subtasks }/>
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
import React from 'react';
import SubTaskList from '../SubTaskList/SubTaskList.js';

function TaskList(props) {
  const taskItens = props.tasks.map((task) => {
    return (
      <li className='task-item'>
        <p>{ task.description }</p>
        <SubTaskList tasks={ task.subtasks }/>
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
import React from 'react';
import SubTaskList from './SubTaskList';

function TaskList(props) {
  const taskItens = props.tasks.map((task) => {
    return (
      <li className='task-item' key={ task.id }>
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
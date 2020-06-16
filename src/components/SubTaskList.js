import React from 'react';

function SubTaskList(props) {
  const subtaskItens = props.tasks.map((subtask) => {
    return (
      <li className='subtask-item' key={ subtask.id }>
        <p>{ subtask.description }</p>
      </li>
    );
  });
  
  return (
    <ul className='subtask-list'>
      { subtaskItens }
    </ul>
  );
}

export default SubTaskList;
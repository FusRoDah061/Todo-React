import React from 'react';
import SubTaskListItem from './SubTaskListItem';

import '../styles/SubTaskList.css';

function SubTaskList(props) {
  const subtaskItens = props.tasks.map((subtask) => {
    return <SubTaskListItem 
              subtask={ subtask } 
              onTaskChange={ props.onTaskChange } 
              onRemove={ props.onRemove }
              disabled={ props.disabled }
              key={ subtask.id }
              removable={ props.removableItems } />;
  });
  
  return (
    <ul className='subtask-list'>
      { subtaskItens }
    </ul>
  );
}

export default SubTaskList;
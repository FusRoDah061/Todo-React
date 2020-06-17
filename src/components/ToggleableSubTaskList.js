import React from 'react';
import ToggleableSubTaskListItem from './ToggleableSubTaskListItem';

function ToggleableSubTaskList(props) {
  const subtaskItens = props.tasks.map((subtask) => {
    return <ToggleableSubTaskListItem subtask={ subtask }/>;
  });
  
  return (
    <ul className='subtask-list'>
      { subtaskItens }
    </ul>
  );
}

export default ToggleableSubTaskList;
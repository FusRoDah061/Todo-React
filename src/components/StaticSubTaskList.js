import React from 'react';
import StaticSubTaskListItem from './StaticSubTaskListItem';

function StaticSubTaskList(props) {
  const subtaskItens = props.tasks.map((subtask) => {
    return <StaticSubTaskListItem subtask={ subtask }/>;
  });
  
  return (
    <ul className='subtask-list'>
      { subtaskItens }
    </ul>
  );
}

export default StaticSubTaskList;
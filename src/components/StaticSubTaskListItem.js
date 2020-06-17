import React from 'react';

function StaticSubTaskListItem(props) {
  return (
    <li className='subtask-item' key={ props.subtask.id }>
      <input type='checkbox' disabled/>
      <p>{ props.subtask.description }</p>
    </li>
  );
}

export default StaticSubTaskListItem;
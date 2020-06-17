import React from 'react';

function ToggleableSubTaskListItem(props) {
  return (
    <li className='subtask-item' key={ props.subtask.id }>
      <input type='checkbox'/>
      <p>{ props.subtask.description }</p>
    </li>
  );
}

export default ToggleableSubTaskListItem;
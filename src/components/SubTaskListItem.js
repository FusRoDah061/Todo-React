import React from 'react';
import * as Constants from '../scripts/constants';

function SubTaskListItem(props) {
  return (
    <li className='subtask-item' key={ props.subtask.id }>
      <input type='checkbox' onChange={ (event) => { 
        if(props.onTaskChange) 
          props.onTaskChange({ checked: event.target.checked, subtask: props.subtask }) 
      }} 
      disabled={ props.disabled }
      checked={ props.subtask.status === Constants.SUBTASK_STATUS_DONE } />
      <p>{ props.subtask.description }</p>
    </li>
  );
}

export default SubTaskListItem;
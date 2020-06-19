import React from 'react';
import * as Constants from '../scripts/constants';

function SubTaskListItem(props) {
  const itemId = `js-subtask-${props.subtask.id}`;

  return (
    <li className='subtask-item' key={ props.subtask.id }>
      <label htmlFor={ itemId }>
        <input id={ itemId }
          type='checkbox' 
          onChange={ (event) => { 
            if(props.onTaskChange) 
              props.onTaskChange({ checked: event.target.checked, subtask: props.subtask }) 
          }} 
          disabled={ props.disabled }
          checked={ props.subtask.status === Constants.SUBTASK_STATUS_DONE } />

        { props.subtask.description }
      </label>
    </li>
  );
}

export default SubTaskListItem;
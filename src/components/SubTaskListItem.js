import React from 'react';
import * as Constants from '../scripts/constants';

import '../styles/SubTaskListItem.css';

function SubTaskListItem(props) {
  const itemId = `js-subtask-${props.subtask.id}`;
  const done = props.subtask.status === Constants.SUBTASK_STATUS_DONE;

  return (
    <li className='subtask-item' key={ props.subtask.id }>
      { props.removable &&
        <button className='button subtask-item-remove' onClick={ () => { if(props.removable) props.onRemove(props.subtask) } }>&#x274C;</button>
      }

      <label 
        htmlFor={ itemId } 
        title={ props.subtask.description } 
        className={ done ? 'subtask-item--done' : '' }>
        <input id={ itemId }
          type='checkbox' 
          onChange={ (event) => { 
            if(props.onTaskChange) 
              props.onTaskChange({ checked: event.target.checked, subtask: props.subtask }) 
          }} 
          disabled={ props.disabled }
          checked={ done } />

        { props.subtask.description }
      </label>
    </li>
  );
}

export default SubTaskListItem;
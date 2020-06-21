import React from 'react';
import SubTaskList from './SubTaskList';
import ProgressBar from './ProgressBar';

import * as Constants from '../scripts/constants';

import '../styles/TaskItem.css';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
  }

  getProgressBarValue() {
    return this.props.task.subtasks.reduce((previousValue, subtask) => {
      if(subtask.status === Constants.SUBTASK_STATUS_DONE)
        return previousValue + 1;
      
      return previousValue;
    }, 0);
  }

  render() {
    return (
      <li className='task-item'>
        <p>{ this.props.task.description }</p>

        <ProgressBar value={ this.getProgressBarValue() } max={ this.props.task.subtasks.length } />

        <SubTaskList 
          tasks={ this.props.task.subtasks } 
          onTaskChange={ (subtask) => this.props.onTaskChange({ 
            parent:this.props.task, 
            subtask: subtask.subtask, 
            checked: subtask.checked 
          }) }/>
      </li>
    );
  }
}

export default TaskItem;
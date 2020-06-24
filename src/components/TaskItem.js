import React from 'react';
import SubTaskList from './SubTaskList';
import ProgressBar from './ProgressBar';

import * as Constants from '../scripts/constants';

import '../styles/TaskItem.css';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subtaskCollapse: true
    }

    this.toggleSubstaskList = this.toggleSubstaskList.bind(this);
  }

  toggleSubstaskList() {
    this.setState({ subtaskCollapse: !this.state.subtaskCollapse });
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
      <li className={ this.props.task.changedColumn ? 'task-item task-item--moved' : 'task-item' }>
        <span className={ this.state.subtaskCollapse ? 'task-item-arrow task-item-arrow--collapsed' : 'task-item-arrow' }>&#x1F53D;</span>
        
        <p className="task-item-title" title={ this.props.task.description } onClick={ this.toggleSubstaskList }>{ this.props.task.description }</p>

        <ProgressBar value={ this.getProgressBarValue() } max={ this.props.task.subtasks.length } />

        <div className={ this.state.subtaskCollapse ? 'subtasks subtasks--collapsed' : 'subtasks' }>
          <SubTaskList
            tasks={ this.props.task.subtasks } 
            onTaskChange={ (subtask) => this.props.onTaskChange({ 
              parent:this.props.task, 
              subtask: subtask.subtask, 
              checked: subtask.checked 
            }) }/>
        </div>
      </li>
    );
  }
}

export default TaskItem;
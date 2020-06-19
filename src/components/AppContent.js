import React from 'react';
import TaskColumn from './TaskColumn';
import NewTaskDialog from './NewTaskDialog';

import * as Constants from '../scripts/constants';
import { TASKS_MOCK } from '../scripts/mockData';

class AppContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: TASKS_MOCK,
      showDialog: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
  }

  getTasksByState(status) {
    const tasks = this.state.tasks.slice();
    return tasks.filter((task) => {
      return task.status === status;
    });
  }

  handleClick() {
    this.setState({ showDialog:true });
  }

  handleFinish(task) {
    const tasks = this.state.tasks.slice();

    tasks.push(task);

    this.setState({ tasks, showDialog:false });
  }

  handleCancel() {
    this.setState({ showDialog:false });
  }

  getTaskStatus(task) { 
    let qttyDone = task.subtasks.reduce((previousValue, subtask) => {
      if(subtask.status === Constants.SUBTASK_STATUS_DONE) 
        return previousValue + 1;

      return previousValue;
    }, 0);

    if(qttyDone <= 0) 
      return Constants.TASK_STATUS_TODO;
    else if(qttyDone >= task.subtasks.length)
      return Constants.TASK_STATUS_DONE;
    else
      return Constants.TASK_STATUS_DOING;
  }

  handleTaskChange(task) {
    let tasks = this.state.tasks.slice();

    let stateTask = tasks.find((t) => {
      return t.id === task.parent.id;
    });    

    let subtask = stateTask.subtasks.find((s) => {
      return s.id === task.subtask.id;
    });

    subtask.status = (task.checked ? Constants.SUBTASK_STATUS_DONE : Constants.SUBTASK_STATUS_NOT_DONE);
        
    const stateTaskStatus = stateTask.status;
    stateTask.status = this.getTaskStatus(stateTask);
    stateTask.changedColumn = (stateTaskStatus !== stateTask.status);

    this.setState(tasks);
  }

  render() {
    const show = this.state.showDialog;

    return (
      <div className="app-content">
        <button onClick={this.handleClick}>New task</button>

        <div className="task-columns">
          <TaskColumn 
            title='To do' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_TODO) } 
            onTaskChange={ this.handleTaskChange }/>
          <TaskColumn 
            title='Doing' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_DOING) } 
            onTaskChange={ this.handleTaskChange }/>
          <TaskColumn 
            title='Done' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_DONE) } 
            onTaskChange={ this.handleTaskChange }/>
        </div>

        {
          show &&
          <NewTaskDialog 
            onFinish={this.handleFinish}
            onCancel={this.handleCancel}/>
        }
      </div>
    );
  }
}

export default AppContent;
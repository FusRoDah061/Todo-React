import React from 'react';
import TaskColumn from './TaskColumn';
import NewTaskDialog from './NewTaskDialog';

import StorageService from '../services/StorageService';

import * as Constants from '../scripts/constants';

import '../styles/AppContent.css';

class AppContent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleStorageError = this.handleStorageError.bind(this);

    this.storage = new StorageService('Tasks', this.handleStorageError);

    this.state = {
      tasks: [],
      showDialog: false
    }
  }

  componentDidMount() {
    this.storage.getAll('id').then(tasks => {
      this.setState({ tasks });
    });
  }

  handleStorageError(event) {
    console.log(event);
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
    this.storage.put(task).then(key => {
      if(key) {
        const tasks = this.state.tasks.slice();
        tasks.push(task);
        this.setState({ tasks, showDialog:false });
      }
    });    
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

    this.storage.put(stateTask).then(key => {
      if(key)
        this.setState(tasks);
    });
  }

  render() {
    const show = this.state.showDialog;

    return (
      <div className="app-content">
        <button className="button button-lg" onClick={this.handleClick}>&#x1F4CC; New task</button>

        <div className="task-columns">
          <TaskColumn 
            title='&#x1F4CC; To do' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_TODO) } 
            onTaskChange={ this.handleTaskChange }/>
          <TaskColumn 
            title='&#x1F6E0; Doing' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_DOING) } 
            onTaskChange={ this.handleTaskChange }/>
          <TaskColumn 
            title='&#x2705; Done' 
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
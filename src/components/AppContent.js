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
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

    this.storage = new StorageService('Tasks', this.handleStorageError);

    this.state = {
      tasks: [],
      showDialog: false,
      taskToEdit: null
    }
  }

  componentDidMount() {
    this.storage.getAll('id').then(tasks => {
      tasks.forEach(task => {
        task.changedColumn = false;
      });
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
    if(!this.state.taskToEdit) {
      // Creating a new task
      this.storage.put(task).then(key => {
        if(key) {
          const tasks = this.state.tasks.slice();
          tasks.push(task);
          this.setState({ tasks, showDialog:false });
        }
      });    
    }
    else {
      // Updating existing task
      this.updateTaskStatus(task);

      this.storage.put(task).then(key => {
        if(key) {
          const tasks = this.state.tasks.slice();
          let index = tasks.findIndex(t => t.id === key);    
          tasks[index] = task;
          this.setState({ tasks, showDialog:false });
        }
      });
    }
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

  updateTaskStatus(task) {
    const taskStatus = task.status;
    task.status = this.getTaskStatus(task);
    task.changedColumn = (taskStatus !== task.status);
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
        
    this.updateTaskStatus(stateTask);

    this.storage.put(stateTask).then(key => {
      if(key)
        this.setState(tasks);
    });
  }

  handleEditTask(task) {
    this.setState({ showDialog:true, taskToEdit: task });
  }

  handleDeleteTask(task) {
    this.storage.delete(task.id).then(() => {
      let tasks = this.state.tasks.slice();

      let indexToRemove = tasks.findIndex(t => {
        return t.id === task.id;
      });

      tasks.splice(indexToRemove, 1);
     
      this.setState({ tasks });
    });
  }

  render() {
    const show = this.state.showDialog;

    return (
      <div className="app-content">
        <button className="button button-secondary button-lg" onClick={this.handleClick}>&#x1F4CC; New task</button>

        <div className="task-columns">
          <TaskColumn 
            title='&#x1F4CC; To do' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_TODO) } 
            onTaskChange={ this.handleTaskChange }
            onEditTask={ this.handleEditTask }
            onDeleteTask={ this.handleDeleteTask } />
          <TaskColumn 
            title='&#x23F3; Doing' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_DOING) } 
            onTaskChange={ this.handleTaskChange }
            onEditTask={ this.handleEditTask }
            onDeleteTask={ this.handleDeleteTask } />
          <TaskColumn 
            title='&#x2705; Done' 
            tasks={ this.getTasksByState(Constants.TASK_STATUS_DONE) } 
            onTaskChange={ this.handleTaskChange }
            onEditTask={ this.handleEditTask }
            onDeleteTask={ this.handleDeleteTask } />
        </div>

        {
          show &&
          <NewTaskDialog 
            task={this.state.taskToEdit}
            onFinish={this.handleFinish}
            onCancel={this.handleCancel}/>
        }
      </div>
    );
  }
}

export default AppContent;
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
  }

  getTasksByState(status) {
    return this.state.tasks.filter((task) => {
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

  render() {
    const show = this.state.showDialog;

    return (
      <div className="app-content">
        <button onClick={this.handleClick}>New task</button>

        <div className="task-columns">
          <TaskColumn title='To do' tasks={ this.getTasksByState(Constants.TASK_STATUS_TODO) }/>
          <TaskColumn title='Doing' tasks={ this.getTasksByState(Constants.TASK_STATUS_DOING) }/>
          <TaskColumn title='Done' tasks={ this.getTasksByState(Constants.TASK_STATUS_DONE) }/>
        </div>

        <NewTaskDialog show={show} onFinish={this.handleFinish}/>
      </div>
    );
  }
}

export default AppContent;
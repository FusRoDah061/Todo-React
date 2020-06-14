import React from 'react';
import TaskColumn from '../TaskColumn/TaskColumn.js';

import * as Constants from '../../scripts/constants.js';
import { TASKS_MOCK } from '../../scripts/mockData.js';

class AppContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: TASKS_MOCK
    }

    this.handleClick = this.handleClick.bind(this);
  }

  getTasksByState(status) {
    return this.state.tasks.filter((task) => {
      return task.status === status;
    });
  }

  handleClick() {
    alert('Criar nova tarefa');
  }

  render() {
    return (
      <div className="app-content">
        <button onClick={this.handleClick}>New task</button>

        <div class="task-columns">
          <TaskColumn title='To do' tasks={ this.getTasksByState(Constants.TASK_STATUS_TODO) }/>
          <TaskColumn title='Doing' tasks={ this.getTasksByState(Constants.TASK_STATUS_DOING) }/>
          <TaskColumn title='Done' tasks={ this.getTasksByState(Constants.TASK_STATUS_DONE) }/>
        </div>
      </div>
    );
  }
}

export default AppContent;
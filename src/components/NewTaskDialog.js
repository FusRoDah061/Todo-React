import React from 'react';
import Dialog from './Dialog';
import TextField from './TextField';
import SubTaskForm from './SubTaskForm';

import * as Constants from '../scripts/constants';

import { v4 as uuidv4 } from 'uuid';

class NewTaskDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description:'',
      subtasks:[]
    }

    this.handleFinish = this.handleFinish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFinish(){
    this.props.onFinish({
      id: uuidv4(),
      description: this.state.description,
      subtasks: this.state.subtasks,
      status:Constants.TASK_STATUS_TODO
    });
  }

  handleChange(event) {
    const value = event.value;

    switch(event.name) {
      case 'description':
        this.setState({ description: value });
        break;

      case 'subtasks':
        this.setState({ subtasks: value });
        break;
    };
  }

  render() {
    return (
      <Dialog 
        title='Add a new task'
        onFinish={ this.handleFinish }
        onCancel={ this.props.onCancel }
        show={ this.props.show }>

        <TextField 
          label='Description' 
          name='description' 
          value={ this.state.description } 
          onChange={ this.handleChange } />

        <SubTaskForm 
          label='Subtasks'
          name='subtasks'
          value={ this.state.subtasks }
          onChange={ this.handleChange } />

      </Dialog>
    );
  }
}

export default NewTaskDialog;
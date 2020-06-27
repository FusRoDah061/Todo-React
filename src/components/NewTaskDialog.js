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
      subtasks:[],
      isDescriptionValid:true,
      isSubtasksValid:true,
      descriptionInvalidMessage: '',
      subtasksInvalidMessage: ''
    }

    this.handleFinish = this.handleFinish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateFields() {
    const { description, subtasks } = this.state;
    let { isDescriptionValid, isSubtasksValid, descriptionInvalidMessage, subtasksInvalidMessage } = this.state;

    isDescriptionValid = true;
    isSubtasksValid = true;

    if(!description || description === '') {
      isDescriptionValid = false;
      descriptionInvalidMessage = 'Description is required.';
    }

    if(!subtasks || subtasks.length <= 0) {
      isSubtasksValid = false;
      subtasksInvalidMessage = 'At least one subtask is required.';
    }

    if(subtasks.length > 10) {
      isSubtasksValid = false;
      subtasksInvalidMessage = 'Maximum number of subtasks is 10.';
    }

    this.setState({ isDescriptionValid, isSubtasksValid, subtasksInvalidMessage, descriptionInvalidMessage });

    return isDescriptionValid && isSubtasksValid;
  }

  handleFinish(){
    const { description, subtasks } = this.state;

    if(!this.validateFields()) return;
   
    this.props.onFinish({
      id: uuidv4(),
      description: description,
      subtasks: subtasks,
      status:Constants.TASK_STATUS_TODO
    });

    this.setState({
      description:'',
      subtasks:[],
      isDescriptionValid:true,
      isSubtasksValid:true
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
        title='&#x1F4DD; Add a new task'
        onFinish={ this.handleFinish }
        onCancel={ this.props.onCancel }
        show={ this.props.show }>

        <TextField 
          label='Task description' 
          name='description' 
          value={ this.state.description } 
          onChange={ this.handleChange }
          isValid={ this.state.isDescriptionValid }
          invalidMessage={ this.state.descriptionInvalidMessage } />

        <SubTaskForm 
          label='Subtasks'
          name='subtasks'
          value={ this.state.subtasks }
          onChange={ this.handleChange }
          isValid={ this.state.isSubtasksValid }
          invalidMessage={ this.state.subtasksInvalidMessage } />

      </Dialog>
    );
  }
}

export default NewTaskDialog;
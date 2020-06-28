import React from 'react';
import TextField from './TextField';
import SubTaskList from './SubTaskList';

import * as Constants from '../scripts/constants';

import { v4 as uuidv4 } from 'uuid';

import '../styles/Input.css';
import '../styles/SubTaskForm.css';

class SubTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      isDescriptionValid:true,
      validationErrorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const e = event;
    const value = e.value;

    switch(e.name) {
      case this.props.name:
        this.setState({ description: value });
        break;
    }
  }

  validateFields() {
    if(!this.state.description || this.state.description === '') {
      this.setState({
        isDescriptionValid:false,
        validationErrorMessage:'Description is required.'
      });
      return false;
    }

    if(this.props.value.length >= 10) {
      this.setState({
        isDescriptionValid:false,
        validationErrorMessage:'There are 10 subtasks already.'
      });
      return false;
    }

    return true;
  }

  handleClick() {
    if(!this.validateFields()) return;

    let subtasks = this.props.value.slice();

    subtasks.push({
      id:uuidv4(),
      description: this.state.description,
      status:Constants.SUBTASK_STATUS_NOT_DONE
    });

    this.setState({ description: '', isDescriptionValid:true });

    this.props.onChange({
      name: this.props.name,
      value: subtasks
    });
  }

  render() {
    return (
      <div className={ `input ${this.props.isValid ? '' : 'input--invalid'}` }>
        <label className='input-label label-with-hint'>{ this.props.label }</label>
        <p className='input-hint'>Type the subtask description and click "Add".</p>

        <div className='subtask-form-add-wrapper'>
          <TextField
            placeholder='Subtask description'
            name={ this.props.name }
            value={ this.state.description }
            onChange={ this.handleChange }
            isValid={this.state.isDescriptionValid}
            invalidMessage={ this.state.validationErrorMessage } />

          <button className='button button-primary' onClick={ this.handleClick }>Add</button>
        </div>

        <p className='input-hint'>Maximum number of subtasks is 10.</p>

        <SubTaskList 
          tasks={ this.props.value } 
          disabled={true} 
          removableItems={true}
          onRemove={ this.props.onRemoveSubtask }/>

        <p className='input-hint'>Click the red 'X' to remove an item.</p>

        {
          !this.props.isValid &&
          <p className='input-invalid-message'>{ this.props.invalidMessage }</p>
        }
      </div>
    );
  }

}

export default SubTaskForm;
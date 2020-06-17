import React from 'react';
import TextField from './TextField';
import StaticSubTaskList from './StaticSubTaskList';

import * as Constants from '../scripts/constants';

import { v4 as uuidv4 } from 'uuid';

class SubTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      subtasks: [],
      isDescriptionValid:true
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

  handleClick() {
    if(!this.state.description || this.state.description === '') {
      this.setState({isDescriptionValid:false});
      return;
    }

    let subtasks = this.state.subtasks.slice();

    subtasks.push({
      id:uuidv4(),
      description: this.state.description,
      status:Constants.SUBTASK_STATUS_NOT_DONE
    });

    this.setState({ description: '', subtasks, isDescriptionValid:true });

    this.props.onChange({
      name: this.props.name,
      value: subtasks
    });
  }

  render() {
    return (
      <div className={ `subtask-form ${this.props.isValid ? '' : 'subtask-form--invalid'}` }>
        <label>{ this.props.label }</label>

        <TextField
          label='Description'
          name={ this.props.name }
          value={ this.state.description }
          onChange={ this.handleChange }
          isValid={this.state.isDescriptionValid}
          invalidMessage='Description is required.' />

        <button onClick={ this.handleClick }>Add</button>

        <StaticSubTaskList tasks={ this.props.value } />

        {
          !this.props.isValid &&
          <p className='subtask-form-invalid-message'>{ this.props.invalidMessage }</p>
        }
      </div>
    );
  }

}

export default SubTaskForm;
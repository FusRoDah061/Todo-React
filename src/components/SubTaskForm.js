import React from 'react';
import TextField from './TextField';
import SubTaskList from './SubTaskList';

import * as Constants from '../scripts/constants';

import { v4 as uuidv4 } from 'uuid';

class SubTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      subtasks: []
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
    let subtasks = this.state.subtasks.slice();
    subtasks.push({
      id:uuidv4(),
      description: this.state.description,
      status:Constants.SUBTASK_STATUS_NOT_DONE
    });

    this.setState({ description: '', subtasks });

    this.props.onChange({
      name: this.props.name,
      value: subtasks
    });
  }

  render() {
    return (
      <div className='subtask-form'>
        <label>{ this.props.label }</label>

        <TextField
          label='Description'
          name={ this.props.name }
          value={ this.state.description }
          onChange={ this.handleChange } />

        <button onClick={ this.handleClick }>Confirm</button>

        <SubTaskList tasks={ this.state.subtasks }/>
      </div>
    );
  }

}

export default SubTaskForm;
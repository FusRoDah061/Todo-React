import React from 'react';

import '../styles/Input.css';

class TextField extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const e = event;
    this.props.onChange({
      name: e.target.id,
      value: e.target.value
    });
  }

  render() {
    const value = this.props.value;

    return (
      <div className={`input ${this.props.isValid ? '' : 'input--invalid'}`}>
        <label className='input-label' htmlFor={ this.props.name }>{ this.props.label }</label>
        <input className='input-target' type='text' placeholder={ this.props.placeholder } id={ this.props.name } value={ value } onChange={ this.handleChange }/>
        { 
          !this.props.isValid &&
          <p className='input-invalid-message'>{ this.props.invalidMessage }</p> 
        }
      </div>
    );
  }
}

export default TextField;
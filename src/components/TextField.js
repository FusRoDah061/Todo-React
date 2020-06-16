import React from 'react';

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
      <div className='text-field'>
        <label htmlFor={ this.props.name }>{ this.props.label }</label>
        <input type='text' id={ this.props.name } value={ value } onChange={ this.handleChange }/>
      </div>
    );
  }
}

export default TextField;
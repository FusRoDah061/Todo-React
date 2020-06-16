import React from 'react';

function Dialog(props) {
  const wrapperClass = props.show ? 'dialog dialog--show' : 'dialog';
  
  return (
    <div className={ wrapperClass }>
      <div className='dialog-header'>
        <h3>{ props.title }</h3>
      </div>
      
      <div className='dialog-body'>
        { props.children }
      </div>

      <div className='dialog-footer'>
        <button className= 'dialog-cancel' onClick={ props.onCancel }>Cancel</button>
        <button className='dialog-finish' onClick={ props.onFinish }>Finish</button>
      </div>
    </div>
  );
}

export default Dialog;
import React from 'react';

import '../styles/Dialog.css';

function Dialog(props) {
  const wrapperClass = props.show ? 'dialog dialog--show' : 'dialog';
  
  return (
    <div className={ wrapperClass }>
      <div className='dialog-content'>
        <div className='dialog-header'>
          <h3>{ props.title }</h3>
        </div>
        
        <div className='dialog-body'>
          { props.children }
        </div>

        <div className='dialog-footer'>
          <button className= 'button button-secondary dialog-cancel' onClick={ props.onCancel }>Cancel</button>
          <button className='button button-primary dialog-finish' onClick={ props.onFinish }>Finish</button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
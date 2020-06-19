import React from 'react';

import '../styles/ProgressBar.css';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      width: `${this.props.value * 100 / this.props.max}%`
    };

    return (
      <div className="progress-bar">
        <div className="progress-bar-container" ref={ this.progressContainerRef }>
          <div className="progress-bar-progress" style={styles}></div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
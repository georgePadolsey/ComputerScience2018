import React, { Component } from 'react';
import styles from './MainPanel.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';

class MainPanel extends Component {
  render() {
    return (
      <div className={styles.mainPanel}>
        <div className={styles.header}>
          <span className={styles.title}>Overview</span>
          <span className={styles.editLayout}>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>
        {/* https://github.com/STRML/react-grid-layout :O :O :O */}
        <div className={styles.mainBody}>
          <div className={styles.x2box}>x</div>
          <div className={styles.x1box}>x</div>
          <div className={styles.x1box}>x</div>
        </div>
      </div>
    );
  }
}

export default MainPanel;

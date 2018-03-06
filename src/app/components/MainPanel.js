import React, { Component } from 'react';
import styles from './MainPanel.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import ReactGridLayout, {Responsive, WidthProvider} from 'react-grid-layout';

const ReactGridLayoutContainer = WidthProvider(ReactGridLayout);

class MainPanel extends Component {

  getShownData() {
    
  } 

  
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
        <ReactGridLayoutContainer className={styles.mainBody} cols={2} rowHeight={240} compactType={'horizontal'} containerWidth={1200} autoSize={false}>
          {/* {...this.getShownData()} */}
          <div key="a" data-grid={{x:0, y:0, w: 1, h: 1}}>a</div>
          <div key="b" data-grid={{x:0, y:0, w: 2, h: 1, minW: 2, maxW: 4}}>b</div>
          <div key="c" data-grid={{x:0, y:0, w: 1, h: 1, minW: 1, minH: 2}}>c</div>
        </ReactGridLayoutContainer>
      </div>
    );
  }
}

export default MainPanel;

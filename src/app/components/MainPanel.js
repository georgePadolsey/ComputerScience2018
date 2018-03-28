import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import { Responsive } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import moment from 'moment';

import styles from './styles/MainPanel.scss';

import * as uiActions from '../actions/ui';
import * as addMainChartActions from '../actions/addMainChart';
import CryptoAPI from '../utils/CryptoAPI';
import OHLCVGraph from './OHLCVGraph';

import type { UIData } from '../_types/UI';

const ResponsiveReactGridLayout = sizeMe()(props => (
  <Responsive {...props} width={props.size.width} />
));

const mapStateToProps = ({ uiData }) => ({ uiData });

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  addMainChartActions: bindActionCreators(addMainChartActions, dispatch)
});

type Props = {
  uiActions: typeof uiActions,
  addMainChartActions: typeof addMainChartActions,
  uiData: UIData
};

class MainPanel extends Component<Props> {
  onLayoutChange(layout, layouts) {
    this.props.uiActions.updateMainLayouts(layouts);
  }

  getShownData() {
    let dataBlocks = [];
    if (this.props.uiData.mainPanelEditMode) {
      // show add button
      dataBlocks.push(
        <div
          key="addBox"
          className={styles.addBox}
          onClick={evt => {
            this.props.addMainChartActions.show();
            evt.preventDefault();
          }}
          onKeyDown={evt => {
            this.props.addMainChartActions.show();
            evt.preventDefault();
          }}
          role="button"
          tabIndex={-1}
          data-grid={{
            x: 1000,
            y: 1000,
            w: 1,
            h: 1
          }}
        >
          <span className={styles.midCenter}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </div>
      );
    }

    dataBlocks = [
      ...dataBlocks,
      this.props.uiData.mainPanelCharts.map(mainPanelChart => (
        <div
          key={mainPanelChart.key}
          data-grid={{
            x: 0,
            y: 0,
            w: 1,
            h: 1
          }}
          className={styles.boxDiv}
          id={mainPanelChart.key}
        >
          <div className={styles.fullEdit} />
          <span>{mainPanelChart.chartName} - {mainPanelChart.exchangeId}</span>
          <OHLCVGraph
            className={styles.plotlyGraph}
            chartData={mainPanelChart}
          />

        </div>
      ))
    ];

    return dataBlocks;
  }

  render() {
    // renderGraphs();
    return (
      <div className={styles.mainPanel}>
        <div className={styles.header}>
          <span className={styles.title}>Overview</span>
          <span
            className={[
              styles.editLayout,
              this.props.uiData.mainPanelEditMode ? styles.activeEdit : null
            ].join(' ')}
            onClick={() =>
              this.props.uiActions.setMainPanelEditMode(
                !this.props.uiData.mainPanelEditMode
              )
            }
            onKeyPress={() =>
              this.props.uiActions.setMainPanelEditMode(
                !this.props.uiData.mainPanelEditMode
              )
            }
            role="button"
            tabIndex={-1}
          >
            <span className={styles.editText}>
              {this.props.uiData.mainPanelEditMode ? 'Edit Mode' : null}
            </span>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>
        {/* https://github.com/STRML/react-grid-layout */}
        <ResponsiveReactGridLayout
          className={[
            styles.mainBody,
            this.props.uiData.mainPanelEditMode ? styles.editContainer : null
          ].join(' ')}
          rowHeight={520}
          layouts={this.props.uiData.mainPanelLayouts}
          cols={{
            lg: 3,
            md: 3,
            sm: 3,
            xs: 3,
            xxs: 2
          }}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          compactType="horizontal"
          // preventCollision
          isDraggable={this.props.uiData.mainPanelEditMode}
          isResizable={this.props.uiData.mainPanelEditMode}
          // autoSize={true}
        >
          {this.getShownData()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);

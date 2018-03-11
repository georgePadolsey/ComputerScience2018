import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './MainPanel.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { Responsive } from 'react-grid-layout';
import sizeMe from 'react-sizeme';

import * as uiActions from '../actions/ui';

const _ResponsiveReactGridLayout = function (props) {
  return <Responsive {...props} width={props.size.width} />;
};

const ResponsiveReactGridLayout = sizeMe()(_ResponsiveReactGridLayout);

const mapStateToProps = ({ uiData }) => ({ uiData });

const mapDispatchToProps = (dispatch, props) => ({
  uiActions: bindActionCreators(uiActions, dispatch)
});

class MainPanel extends Component {
  getShownData() {}

  componentDidMount() {
    this.renderGraphs();
  }
  componentDidUpdate() {
    this.renderGraphs();
  }

  renderGraphs() {
    // const d3 = Plotly.d3;
    // let WIDTH_IN_PERCENT_OF_PARENT = 100,
    //   HEIGHT_IN_PERCENT_OF_PARENT = 100;
    // const gd3 = d3
    //   .select('#test-div')
    //   .append('div')
    //   .style({
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     width: `${WIDTH_IN_PERCENT_OF_PARENT}%`,
    //     'margin-left': `${(100 - WIDTH_IN_PERCENT_OF_PARENT) / 2}%`,
    //     height: `${HEIGHT_IN_PERCENT_OF_PARENT}%`,
    //     'margin-top': `${(100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2}vh`
    //   });
    // const gd = gd3.node();
    // const trace1 = {
    //   x: [
    //     '2017-01-17',
    //     '2017-01-18',
    //     '2017-01-19',
    //     '2017-01-20',
    //     '2017-01-23',
    //     '2017-01-24',
    //     '2017-01-25',
    //     '2017-01-26',
    //     '2017-01-27',
    //     '2017-01-30',
    //     '2017-01-31',
    //     '2017-02-01',
    //     '2017-02-02',
    //     '2017-02-03',
    //     '2017-02-06',
    //     '2017-02-07',
    //     '2017-02-08',
    //     '2017-02-09',
    //     '2017-02-10'
    //   ],
    //   close: [
    //     120,
    //     119.989998,
    //     119.779999,
    //     120,
    //     120.080002,
    //     119.970001,
    //     121.879997,
    //     121.940002,
    //     121.949997,
    //     121.629997,
    //     121.349998,
    //     128.75,
    //     128.529999,
    //     129.080002,
    //     130.289993,
    //     131.529999,
    //     132.039993,
    //     132.419998,
    //     132.119995
    //   ],
    //   decreasing: { line: { color: '#7F7F7F' } },
    //   high: [
    //     120.239998,
    //     120.5,
    //     120.089996,
    //     120.449997,
    //     120.809998,
    //     120.099998,
    //     122.099998,
    //     122.440002,
    //     122.349998,
    //     121.629997,
    //     121.389999,
    //     130.490005,
    //     129.389999,
    //     129.190002,
    //     130.5,
    //     132.089996,
    //     132.220001,
    //     132.449997,
    //     132.940002
    //   ],
    //   increasing: { line: { color: '#17BECF' } },
    //   line: { color: 'rgba(31,119,180,1)' },
    //   low: [
    //     118.220001,
    //     119.709999,
    //     119.370003,
    //     119.730003,
    //     119.769997,
    //     119.5,
    //     120.279999,
    //     121.599998,
    //     121.599998,
    //     120.660004,
    //     120.620003,
    //     127.010002,
    //     127.779999,
    //     128.160004,
    //     128.899994,
    //     130.449997,
    //     131.220001,
    //     131.119995,
    //     132.050003
    //   ],
    //   open: [
    //     118.339996,
    //     120,
    //     119.400002,
    //     120.449997,
    //     120,
    //     119.550003,
    //     120.419998,
    //     121.669998,
    //     122.139999,
    //     120.93,
    //     121.150002,
    //     127.029999,
    //     127.980003,
    //     128.309998,
    //     129.130005,
    //     130.539993,
    //     131.350006,
    //     131.649994,
    //     132.460007
    //   ],
    //   type: 'ohlc',
    //   xaxis: 'x',
    //   yaxis: 'y'
    // };
    // const data = [trace1];
    // const layout = {
    //   dragmode: 'zoom',
    //   margin: {
    //     r: 10,
    //     t: 25,
    //     b: 40,
    //     l: 60
    //   },
    //   showlegend: false,
    //   xaxis: {
    //     autorange: true,
    //     rangeslider: { range: ['2017-01-17 12:00', '2017-02-10 12:00'] },
    //     title: 'Date',
    //     type: 'date'
    //   },
    //   yaxis: {
    //     autorange: true,
    //     type: 'linear'
    //   }
    // };
    // Plotly.plot(gd, data, layout);
  }

  setEditMode(isEditMode: boolean) {
    this.props.uiActions.setMainPanelEditMode(isEditMode);
  }

  onLayoutChange(layout, layouts) {
    this.props.uiActions.updateMainLayouts(layouts);
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
            onClick={() => this.setEditMode(!this.props.uiData.mainPanelEditMode)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>
        {/* https://github.com/STRML/react-grid-layout :O :O :O */}
        <ResponsiveReactGridLayout
          className={[
            styles.mainBody,
            this.props.uiData.mainPanelEditMode ? styles.editContainer : null
          ].join(' ')}
          rowHeight={480}
          layouts={this.props.uiData.mainPanelLayouts}
          cols={{
            lg: 3,
            md: 3,
            sm: 3,
            xs: 3,
            xxs: 2
          }}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          measureBeforeMount
          compactType="horizontal"
          // preventCollision
          isDraggable={this.props.uiData.mainPanelEditMode}
          isResizable={this.props.uiData.mainPanelEditMode}
          // autoSize={true}
        >
          {/* {...this.getShownData()} */}
          <div
            key="a"
            data-grid={{
              x: 0,
              y: 0,
              w: 1,
              h: 1
            }}
            id="test-div"
          >
            <div className={styles.fullEdit} />
            <div id="plotly-div" className={styles.plotlyGraph} />
          </div>
          <div
            key="b"
            data-grid={{
              x: 0,
              y: 0,
              w: 2,
              h: 1
            }}
          >
            <div className={styles.fullEdit} />
            <p>b</p>
          </div>
          <div
            key="c"
            data-grid={{
              x: 0,
              y: 0,
              w: 1,
              h: 1
            }}
          >
            <p>c</p>
            <div className={styles.fullEdit} />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);

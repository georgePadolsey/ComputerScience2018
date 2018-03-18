import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit, faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import { Responsive } from "react-grid-layout";
import sizeMe from "react-sizeme";
import moment from "moment";

import styles from "./MainPanel.scss";

import * as uiActions from "../actions/ui";
import CryptoAPI from "../utils/CryptoAPI";

import type { UIData } from "../_types/UI";

const ResponsiveReactGridLayout = sizeMe()(props => (
  <Responsive {...props} width={props.size.width} />
));

const mapStateToProps = ({ uiData }) => ({ uiData });

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch)
});

type Props = {
  uiActions: typeof uiActions,
  uiData: UIData
};

class MainPanel extends Component<Props> {
  componentDidMount() {
    this.renderGraphs();
  }
  componentDidUpdate() {
    this.renderGraphs();
  }

  async renderGraphs() {
    if (!this.testDiv) return;

    const OHLCVdata = await CryptoAPI.loadOHLCV();
    if (OHLCVdata == null) {
      return;
    }

    const xVals = [];
    const closeVals = [];
    const highVals = [];
    const lowVals = [];
    const openVals = [];

    OHLCVdata.forEach(
      ([
        dateInUTC,
        openPrice,
        highestPrice,
        lowestPrice,
        closingPrice,
        volume
      ]) => {
        xVals.push(moment(dateInUTC).format("YYYY-MM-DD"));
        closeVals.push(closingPrice);
        highVals.push(highestPrice);
        lowVals.push(lowestPrice);
        openVals.push(openPrice);
      }
    );

    const { d3 } = Plotly;
    const WIDTH_IN_PERCENT_OF_PARENT = 100;
    const HEIGHT_IN_PERCENT_OF_PARENT = 100;
    const gd3 = d3
      .select(this.testDiv)
      .append("div")
      .style({
        position: "absolute",
        top: 0,
        left: 0,
        width: `${WIDTH_IN_PERCENT_OF_PARENT}%`,
        "margin-left": `${(100 - WIDTH_IN_PERCENT_OF_PARENT) / 2}%`,
        height: `${HEIGHT_IN_PERCENT_OF_PARENT}%`,
        "margin-top": `${(100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2}vh`
      });
    const gd = gd3.node();
    const trace1 = {
      x: xVals,
      close: closeVals,
      decreasing: { line: { color: "#7F7F7F" } },
      high: highVals,
      increasing: { line: { color: "#17BECF" } },
      line: { color: "rgba(31,119,180,1)" },
      low: lowVals,
      open: openVals,
      type: "ohlc",
      xaxis: "x",
      yaxis: "y"
    };
    const data = [trace1];
    const layout = {
      dragmode: "zoom",
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        // @todo
        rangeslider: { range: ["2017-01-17 12:00", "2017-02-10 12:00"] },
        title: "Date",
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear",
        title: "@TODO title"
      }
    };
    Plotly.plot(gd, data, layout);
  }

  onLayoutChange(layout, layouts) {
    this.props.uiActions.updateMainLayouts(layouts);
  }

  getShownData() {
    return [
      this.props.uiData.mainPanelEditMode ? (
        <div
          key="addBox"
          className={styles.addBox}
          onClick={evt => {
            this.props.uiActions.showAddMainChart();
            evt.preventDefault();
          }}
          onKeyDown={evt => {
            this.props.uiActions.showAddMainChart();
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
      ) : null,
      <div
        key="a"
        data-grid={{
          x: 0,
          y: 0,
          w: 1,
          h: 1
        }}
        className={styles.boxDiv}
        ref={x => (this.testDiv = x)}
      >
        <div className={styles.fullEdit} />
        <div id="plotly-div" className={styles.plotlyGraph} />
      </div>
    ].filter(x => x != null);
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
            ].join(" ")}
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
              {this.props.uiData.mainPanelEditMode ? "Edit Mode" : null}
            </span>
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </div>
        {/* https://github.com/STRML/react-grid-layout :O :O :O */}
        <ResponsiveReactGridLayout
          className={[
            styles.mainBody,
            this.props.uiData.mainPanelEditMode ? styles.editContainer : null
          ].join(" ")}
          rowHeight={480}
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

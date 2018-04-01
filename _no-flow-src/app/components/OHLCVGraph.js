//
// Module imports
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
  VictoryBrushContainer,
  VictoryZoomContainer
} from "victory";
import orderBy from "lodash/orderBy";
import moment from "moment";
import isArray from "lodash/isArray";
import sizeMe from "react-sizeme";

// Local imports
import CryptoAPI from "../utils/CryptoAPI";
import { formatNumber } from "../utils/Misc";

// Type imports

// Style imports
import styles from "./styles/OHLCVGraph.scss";

/**
 * Props for OHLCVGraph Component
 */

/**
 * State for OHLCVGraph Component
 */

const mapStateToProps = ({ cryptoData }) => ({ cryptoData });

class OHLCVGraph extends Component {
  /**
   * Default state of OHLCVGraph
   */
  state = {
    candleStickData: null,
    zoomDomain: null,
    selectedDomain: null
  };

  /**
   * Asynchronous function to get candle stick data for graph
   */
  async getCandleStickData() {
    // Get the exchange from CryptoAPI
    const exchange = CryptoAPI.getExchange(this.props.chartData.exchangeId);

    // if not loaded log and error and finish
    if (exchange == null) {
      console.error("[OHLCVGraph] Exchange is null");
      return;
    }

    // wait to get the OHLCV data from the API (could be cached or could be using API)
    const OHLCVdata = await CryptoAPI.fetchOHLCV(
      exchange,
      this.props.chartData.symbolId
    );

    // if the data is null for any reason then return
    if (OHLCVdata == null || (isArray(OHLCVdata) && OHLCVdata.length === 0)) {
      return;
    }

    let dataVals = [];

    // For each piece of data map it to a new type (with x substituded for victory)
    dataVals = OHLCVdata.map(([time, open, high, low, close]) => ({
      x: new Date(time),
      open,
      close,
      high,
      low
    }));

    if (dataVals.length > 1000) {
      // Max data points = 1000 for performance reasons
      dataVals = orderBy(dataVals, ["x"], ["desc"]);
      dataVals = dataVals.slice(0, 1000);
    }

    this.setState({
      candleStickData: dataVals
    });
  }

  /**
   * Handle zooming into certain domain
   * @param {*} domain
   */
  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  /**
   * Handle the brush moving
   * @param {*} domain
   */
  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const { chartData, cryptoData, dispatch, ...rest } = this.props;

    // If data not got yet - get it!
    if (this.state.candleStickData == null) {
      this.getCandleStickData();
    }

    return (
      <div {...rest} id={chartData.key} ref={node => (this.graphEl = node)}>
        {this.state.candleStickData != null ? (
          <div>
            {/* Main Chart */}
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              width={this.props.size.width}
              scale={{ x: "time" }}
              containerComponent={
                <VictoryZoomContainer
                  responsive={false}
                  zoomDimension="x"
                  zoomDomain={this.state.zoomDomain}
                  onZoomDomainChange={this.handleZoom.bind(this)}
                />
              }
            >
              <VictoryAxis tickFormat={t => `${moment(t).format("MM/YY")}`} />
              <VictoryAxis
                dependentAxis
                label={this.props.chartData.symbolId}
                tickFormat={t => formatNumber(t)}
                style={{ axisLabel: { padding: 35 } }}
              />

              <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                data={this.state.candleStickData}
              />
            </VictoryChart>

            {/* 'Zoom' Chart */}
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 25 }}
              scale={{ x: "time" }}
              width={this.props.size.width}
              padding={{
                top: 0,
                left: 50,
                right: 50,
                bottom: 30
              }}
              containerComponent={
                <VictoryBrushContainer
                  responsive={false}
                  brushDimension="x"
                  brushDomain={this.state.selectedDomain}
                  onBrushDomainChange={this.handleBrush.bind(this)}
                />
              }
              height={90}
            >
              <VictoryAxis tickFormat={t => `${moment(t).format("MM/YY")}`} />
              <VictoryAxis
                dependentAxis
                label={this.props.chartData.symbolId}
                tickFormat={t => formatNumber(t)}
                style={{ axisLabel: { padding: 35 } }}
              />

              <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                data={this.state.candleStickData}
              />
            </VictoryChart>
          </div>
        ) : (
          // if data not loaded show "Loading"
          <div className={styles.loading}>Loading</div>
        )}
      </div>
    );
  }
}

// Internal representation of OHLCVGraph with react-redux bindings
const InteralOHLCVGraph = connect(mapStateToProps)(OHLCVGraph);

// Export representation with sizeMe bindings as well
export default sizeMe()(props => (
  <InteralOHLCVGraph width={props.size.width} {...props} />
));

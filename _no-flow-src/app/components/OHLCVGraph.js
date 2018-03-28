//
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
import CryptoAPI from "../utils/CryptoAPI";
import { formatNumber } from "../utils/Misc";

import styles from "./styles/OHLCVGraph.scss";

const mapStateToProps = ({ cryptoData }) => ({ cryptoData });

class OHLCVGraph extends Component {
  state = {
    candleStickData: null,
    zoomDomain: null,
    selectedDomain: null
  };

  async getCandleStickData() {
    const exchange = CryptoAPI.getExchange(this.props.chartData.exchangeId);

    if (exchange == null) {
      console.error("[OHLCVGraph] Exchange is null");
      return;
    }

    console.log(exchange);
    const OHLCVdata = await CryptoAPI.fetchOHLCV(
      exchange,
      this.props.chartData.symbolId
    );

    if (OHLCVdata == null || (isArray(OHLCVdata) && OHLCVdata.length === 0)) {
      return;
    }

    let dataVals = [];

    OHLCVdata.forEach(([time, open, high, low, close]) => {
      dataVals.push({
        x: new Date(time),
        open,
        close,
        high,
        low
      });
    });

    if (dataVals.length > 100) {
      // Max data points = 100 for performance reasons
      dataVals = orderBy(dataVals, ["x"], ["desc"]);
      dataVals = dataVals.slice(0, 100);
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
          <div className={styles.loading}>Loading</div>
        )}
      </div>
    );
  }
}

const InteralOHLCVGraph = connect(mapStateToProps)(OHLCVGraph);

export default sizeMe()(props => (
  <InteralOHLCVGraph width={props.size.width} {...props} />
));

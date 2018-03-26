// @flow
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import sizeMe from 'react-sizeme';
import CryptoAPI from '../utils/CryptoAPI';
import type { CryptoState } from '../_types/Crypto';
import type { MainPanelChart } from '../_types/UI';
import styles from './styles/OHLCVGraph.scss';

type Props = {
  chartData: MainPanelChart,
  cryptoData: CryptoState
};

const mapStateToProps = ({ cryptoData }) => ({ cryptoData });

class OHLCVGraph extends React.Component<Props> {
  gds = [];

  async componentDidMount() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.renderGraph();
    this.isLoading = false;
  }

  shouldComponentUpdate(nextProps: Props) {
    if (
      (nextProps.cryptoData.loadedExchanges.includes(
        this.props.chartData.exchangeId
      ) &&
        !this.loaded) ||
      !isEqual(nextProps.size, this.props.size)
    ) {
      return true;
    }
    return false;
  }

  async componentDidUpdate() {
    this.gds.forEach(gd => Plotly.Plots.resize(gd));
    if (this.isLoading) return;
    this.isLoading = true;
    await this.renderGraph();
    this.isLoading = false;
  }

  loaded: boolean = false;
  isLoading: boolean = false;

  async renderGraph() {
    if (window.Plotly == null) {
      console.error('[OHLCVGraph] Plotly is not defined globally! ');
      return;
    }

    if (!this.graphEl) {
      console.error('[OHLCVGraph] GraphEl is not reffed yet!');
      return;
    }

    const exchange = CryptoAPI.getExchange(this.props.chartData.exchangeId);

    if (exchange == null) {
      console.error('[OHLCVGraph] Exchange is null');
      return;
    }

    console.log(exchange);
    const OHLCVdata = await CryptoAPI.fetchOHLCV(
      exchange,
      this.props.chartData.symbolId
    );

    if (OHLCVdata == null) {
      return;
    }

    if (this.loaded) return;

    this.loaded = true;
    const xVals = [];
    const closeVals = [];
    const highVals = [];
    const lowVals = [];
    const openVals = [];

    OHLCVdata.forEach(
      ([dateInUTC, openPrice, highestPrice, lowestPrice, closingPrice]) => {
        xVals.push(moment(dateInUTC).format('YYYY-MM-DD'));
        closeVals.push(closingPrice);
        highVals.push(highestPrice);
        lowVals.push(lowestPrice);
        openVals.push(openPrice);
      }
    );

    const { d3 } = window.Plotly;
    const WIDTH_IN_PERCENT_OF_PARENT = 100;
    const HEIGHT_IN_PERCENT_OF_PARENT = 100;
    const gd3 = d3
      .select(this.graphEl)
      .append('div')
      .style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${WIDTH_IN_PERCENT_OF_PARENT}%`,
        // 'margin-left': `${(100 - WIDTH_IN_PERCENT_OF_PARENT) / 2}%`,
        height: `${HEIGHT_IN_PERCENT_OF_PARENT}%`
        // 'margin-top': `${(100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2}vh`
      });
    let gd;
    this.gds.push[(gd = gd3.node())];
    const trace1 = {
      x: xVals,
      close: closeVals,
      decreasing: { line: { color: '#7F7F7F' } },
      high: highVals,
      increasing: { line: { color: '#17BECF' } },
      line: { color: 'rgba(31,119,180,1)' },
      low: lowVals,
      open: openVals,
      type: 'ohlc',
      xaxis: 'x',
      yaxis: 'y'
    };
    const data = [trace1];
    const layout = {
      dragmode: 'zoom',
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
        rangeslider: { range: ['2017-01-17 12:00', '2017-02-10 12:00'] },
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        type: 'linear',
        title: this.props.chartData.symbolId
      }
    };
    window.Plotly.plot(gd, data, layout);
  }

  graphEl: ?HTMLDivElement = null;

  render() {
    const { chartData, cryptoData, dispatch, ...rest } = this.props;
    return (
      <div {...rest} id={chartData.key} ref={node => (this.graphEl = node)}>
        {!this.loaded ? <div className={styles.loading}>Loading</div> : null}
      </div>
    );
  }
}

const InteralOHLCVGraph = connect(mapStateToProps)(OHLCVGraph);

export default sizeMe()(props => (
  <InteralOHLCVGraph width={props.size.width} {...props} />
));

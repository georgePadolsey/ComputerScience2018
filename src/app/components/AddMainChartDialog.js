// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogComponent from './DialogComponent';
import CryptoAPI from '../utils/CryptoAPI';
import styles from './AddMainChartDialog.scss';

const mapStateToProps = ({ cryptoData }) => ({
  cryptoData
});

const mapDispatchToProps = dispatch => ({});

type Props = {};

class AddMainChartDialog extends Component<Props> {
  // @todo move state to redux
  state = {
    selectedExchange: null
  };
  render() {
    console.log('re-render');
    return (
      <DialogComponent dismiss={this.dismiss}>
        <div className={styles.main}>
          <label htmlFor="exchangeSelect">
            <span>Exchange:</span>
            <select
              id="exchangeSelect"
              onChange={e => this.setState({ selectedExchange: e.target.value })}
            >
              {CryptoAPI.loadedExchanges.map(exchange => (
                <option key={exchange.id}>{exchange.id}</option>
              ))}
            </select>
          </label>
          {this.state.selectedExchange}
        </div>
      </DialogComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMainChartDialog);

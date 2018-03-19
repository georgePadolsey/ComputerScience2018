//
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DialogComponent from "./DialogComponent";
import CryptoAPI from "../utils/CryptoAPI";
import * as uiActions from "../actions/ui";
import styles from "./AddMainChartDialog.scss";

const mapStateToProps = ({ cryptoData }) => ({
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch)
});

class AddMainChartDialog extends Component {
  /**
   * We choose to not save this
   * as the options are relative to the loaded exchanges at the time
   * So if someone reloaded the program - the exchange could not be loaded at the time
   */
  state = {
    selectedExchange: null
  };

  dismiss() {
    this.props.uiActions.hideAddMainChart();
  }

  render() {
    if (
      CryptoAPI.loadedExchanges.length > 0 &&
      this.state.selectedExchange == null
    ) {
      this.setState({ selectedExchange: CryptoAPI.loadedExchanges[0].id });
    }
    return (
      <DialogComponent dismiss={() => this.dismiss()}>
        <div className={styles.main}>
          <label htmlFor="exchangeSelect">
            <span>Exchange:</span>
            <select
              id="exchangeSelect"
              onChange={e =>
                this.setState({ selectedExchange: e.target.value })
              }
            >
              {CryptoAPI.loadedExchanges.map(exchange => (
                <option key={exchange.id}>{exchange.id}</option>
              ))}
            </select>
          </label>
          {this.state.selectedExchange != null ? (
            <label htmlFor="symbolSelect">
              <span>Symbols:</span>
              <select id="symbolSelect">
                {CryptoAPI.getExchange(this.state.selectedExchange).symbols.map(
                  symbol => <option key={symbol}>{symbol}</option>
                )}
              </select>
            </label>
          ) : null}
        </div>
      </DialogComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMainChartDialog);

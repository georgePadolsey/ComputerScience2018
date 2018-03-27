//
import React, { Component } from "react";
import { bindActionCreators } from "redux";

import Select from "react-select";
import { connect } from "react-redux";
import DialogComponent from "./DialogComponent";
import CryptoAPI from "../utils/CryptoAPI";
import * as uiActions from "../actions/ui";
import * as addMainChartActions from "../actions/addMainChart";
import styles from "./styles/AddMainChartDialog.scss";

const mapStateToProps = ({ cryptoData, uiData }) => ({
  cryptoData,
  uiData,
  data: uiData.addMainChartState
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(addMainChartActions, dispatch)
});

class AddMainChartDialog extends Component {
  componentWillMount() {
    if (
      CryptoAPI.loadedExchanges.length > 0 &&
      this.props.data.selectedExchange == null
    ) {
      this.props.actions.setSelectedExchange(CryptoAPI.loadedExchanges[0].id);
    }
  }

  validateForm() {
    return (
      !!this.props.data.chartName &&
      !!this.props.data.selectedExchange &&
      !!this.props.data.selectedSymbol
    );
  }

  render() {
    return (
      <DialogComponent dismiss={() => this.props.actions.hide()} showExit>
        <div className={styles.main}>
          <div className={styles.heading}>Add Main Chart</div>
          <label htmlFor="graphName">
            <span> Graph Name: </span>
            <input
              type="text"
              placeholder="Name"
              defaultValue={this.props.data.chartName}
              onBlur={ev => this.props.actions.setChartName(ev.target.value)}
            />
          </label>
          <label htmlFor="exchangeSelect">
            <span>Exchange:</span>
            <Select
              id="exchangeSelect"
              value={this.props.data.selectedExchange}
              onChange={({ value }) =>
                this.props.actions.setSelectedExchange(value)
              }
              options={CryptoAPI.loadedExchanges
                .filter(
                  exchange =>
                    exchange.has.fetchOHLCV &&
                    exchange.has.fetchOHLCV !== "emulated"
                )
                .map(exchange => ({
                  value: exchange.id,
                  label: exchange.name
                }))}
            />
          </label>
          {this.props.data.selectedExchange != null ? (
            <label htmlFor="symbolSelect">
              <span>Symbols:</span>
              <Select
                id="symbolSelect"
                value={this.props.data.selectedSymbol}
                onChange={({ value }) =>
                  this.props.actions.setSelectedSymbol(value)
                }
                options={
                  CryptoAPI.getExchange(this.props.data.selectedExchange) &&
                  CryptoAPI.getExchange(
                    this.props.data.selectedExchange
                  ).symbols.map(symbol => ({
                    value: symbol,
                    label: symbol
                  }))
                }
              />
            </label>
          ) : null}
          <button
            id="add"
            onClick={() =>
              this.validateForm() &&
              this.props.uiActions.addMainChart(
                this.props.data.chartName,
                this.props.data.selectedExchange,
                this.props.data.selectedSymbol
              ) &&
              this.props.actions.hide()
            }
          >
            Add Chart
          </button>
          <span className={styles.error}>
            {!this.validateForm() ? "Please fill in form completely!" : ""}
          </span>
        </div>
      </DialogComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMainChartDialog);

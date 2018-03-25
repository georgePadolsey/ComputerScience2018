// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { connect } from 'react-redux';
import DialogComponent from './DialogComponent';
import CryptoAPI from '../utils/CryptoAPI';
import * as uiActions from '../actions/ui';
import * as addMainChartActions from '../actions/addMainChart';
import styles from './styles/AddMainChartDialog.scss';
import type { addMainChartState } from '../_types/UI';

const mapStateToProps = ({ cryptoData, uiData }) => ({
  cryptoData,
  data: uiData.addMainChart
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(addMainChartActions, dispatch)
});

type Props = {
  actions: typeof addMainChartActions,
  data: addMainChartState
};

type State = {
  selectedExchange: ?string
};

class AddMainChartDialog extends Component<Props, State> {
  componentWillMount() {
    if (CryptoAPI.loadedExchanges.length > 0 && this.props.data.selectedExchange == null) {
      this.props.actions.setSelectedExchange(CryptoAPI.loadedExchanges[0].id);
    }
  }
  dismiss() {
    this.props.actions.hide();
  }

  render() {
    return (
      <DialogComponent dismiss={() => this.dismiss()}>
        <div className={styles.main}>
          <label htmlFor="graphName">
            <span> Graph Name: </span>
            <input type="text" placeholder="Name" />
          </label>
          <label htmlFor="exchangeSelect">
            <span>Exchange:</span>
            <Select
              id="exchangeSelect"
              value={this.props.data.selectedExchange}
              onChange={({ value }) => this.props.actions.setSelectedExchange(value)}
              options={CryptoAPI.loadedExchanges.map(exchange => ({
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
                onChange={({ value }) => this.props.actions.setSelectedSymbol(value)}
                options={CryptoAPI.getExchange(this.props.data.selectedExchange).symbols.map(symbol => ({
                    value: symbol,
                    label: symbol
                  }))}
              />
            </label>
          ) : null}
          <button id="add">Add Chart</button>
        </div>
      </DialogComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMainChartDialog);

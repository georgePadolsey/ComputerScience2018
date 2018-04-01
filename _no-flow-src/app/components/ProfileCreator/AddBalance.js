//
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { CSSTransitionGroup } from "react-transition-group";
import VirtualizedSelect from "react-virtualized-select";
import isFinite from "lodash/isFinite";
import hash from "string-hash";

import styles from "../styles/ProfileCreator.scss";

import {
  faBalanceScale,
  faExchangeAlt,
  faCreditCard,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/fontawesome-free-solid";

// Actions/reducers
import * as uiActions from "../../actions/ui";
import CryptoAPI from "../../utils/CryptoAPI";
import { PROFILE_CREATOR_STAGES } from "../../actions/types/profileCreator";
import * as profileCreatorActions from "../../actions/profileCreator";

// Logo
import logo from "../../../resources/icon.png";

// Types:

const mapStateToProps = ({ profileData, uiData, cryptoData }) => ({
  profileData,
  state: uiData.profileCreatorState || {},
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(profileCreatorActions, dispatch)
});

class AddBalance extends Component {
  checkBalanceName() {
    if (
      this.props.state.balanceName == null ||
      this.props.state.balanceName.length === 0
    ) {
      return "Balance Name is required!";
    }

    if (!/^[a-z0-9\ ]+$/gi.test(this.props.state.balanceName)) {
      return "Balance name must only use alphanumerical characters!";
    }
  }

  checkCurrencyType() {
    return this.props.state.currencySelected == null
      ? "Currency is required!"
      : undefined;
  }

  checkAmountOfCurrency() {
    if (this.props.state.balanceAmount == null) {
      return "Balance Amount is required";
    }

    if (this.props.state.balanceAmount <= 0) {
      return "Balance Amount must be bigger than 0 and reasonable!";
    }
  }

  checkForm() {
    return [
      this.checkBalanceName(),
      this.checkCurrencyType(),
      this.checkAmountOfCurrency()
    ];
  }

  render() {
    const changeStage = s => this.props.actions.setStage(s);
    return (
      <div key={PROFILE_CREATOR_STAGES.ADD_BALANCE}>
        <button
          className={styles.back}
          onClick={() => changeStage(PROFILE_CREATOR_STAGES.ACCOUNT_ADDER)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Add Crypto Currency Balance</p>
        </div>
        <form>
          <label htmlFor="name">
            <span>Balance Name</span>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={this.props.state.balanceName}
              placeholder="New Balance"
              onBlur={ev => this.props.actions.setBalanceName(ev.target.value)}
            />
          </label>
          <label htmlFor="currency">
            <span>Currency Type</span>
            <VirtualizedSelect
              name="currency"
              value={this.props.state.currencySelected || ""}
              id="currency"
              className={styles.selectBox}
              onChange={selectedOption => {
                this.props.actions.setCurrentCurrency(
                  selectedOption ? selectedOption.value : null
                );
              }}
              options={Object.keys(CryptoAPI.currencyExchangeLookup).map(
                symbol => ({
                  value: symbol,
                  label: symbol
                })
              )}
            />
          </label>
          <label htmlFor="amount">
            <span>Amount of currency</span>
            <input
              type="number"
              placeholder={0}
              min={0}
              defaultValue={this.props.state.balanceAmount}
              step={0.0001}
              onBlur={ev =>
                this.props.actions.setBalanceAmount(+ev.target.value)
              }
            />
          </label>
          <div className={styles.formError}>
            {this.checkForm()
              .filter(e => e != null)
              .map(e => <span key={hash(e || "")}>{e}</span>)}
          </div>
        </form>
        <button
          className={styles.next}
          onClick={() => this.props.actions.hide()}
        >
          {"Add"}
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBalance);

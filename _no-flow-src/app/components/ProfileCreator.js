//
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faExchangeAlt,
  faCreditCard,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/fontawesome-free-solid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";
import VirtualizedSelect from "react-virtualized-select";

import DialogComponent from "./DialogComponent";
// Actions/reducers
import * as uiActions from "../actions/ui";
import * as profileActions from "../actions/profile";
import CryptoAPI from "../utils/CryptoAPI";
import { PROFILE_CREATOR_STAGES } from "../actions/types/ui";
// Styles:
import styles from "./styles/ProfileCreator.scss";
// Logo
import logo from "../../resources/icon.png";
// Types:

const mapStateToProps = ({ profileData, uiData, cryptoData }) => ({
  profileData,
  profileCreatorState: uiData.profileCreatorState || {},
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch)
});

class ProfileCreator extends Component {
  dismiss() {
    this.props.uiActions.hideProfileCreator();
  }

  setStage(stage) {
    this.props.uiActions.setProfileCreatorStage(stage);
  }

  getAccountAdderStage() {
    return (
      <div key={PROFILE_CREATOR_STAGES.ACCOUNT_ADDER}>
        <div className={styles.titleContainer}>
          {this.props.profileCreatorState.firstTime ? (
            <div className={styles.firstTime}>
              <img src={logo} alt="Cryptolium logo" title="Cryptolium logo" />
              <span>Welcome to Cryptolium</span>
            </div>
          ) : (
            <p className={styles.title}>Create a profile</p>
          )}
          <p className={styles.metaTitle}>Let's add an account.</p>
        </div>
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionAppear
          transitionAppearTimeout={2000}
          transitionEnter={false}
          // transitionEnterTimeout={500}
          transitionLeave={false}
        >
          <button
            className={styles.button}
            onClick={() => this.setStage(PROFILE_CREATOR_STAGES.ADD_BALANCE)}
            onKeyPress={() => this.setStage(PROFILE_CREATOR_STAGES.ADD_BALANCE)}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faBalanceScale} />
            </span>
            <span className={styles.meta}> Crypto Coin Balance</span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faExchangeAlt} />
            </span>
            <span className={styles.meta}> Exchange</span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faCreditCard} />
            </span>
            <span className={styles.meta}>Crypto Wallet (BTC or ETH)</span>
          </button>
          <span
            className={styles.next}
            onClick={() =>
              this.setStage(PROFILE_CREATOR_STAGES.PROFILE_SETTINGS)
            }
          >
            {"I don't want to add a balance..."}
          </span>
        </CSSTransitionGroup>
      </div>
    );
  }

  /**
   * Basic balence stage
   */
  getAddBalanceStage() {
    return (
      <div key={PROFILE_CREATOR_STAGES.ADD_BALANCE}>
        <button
          className={styles.back}
          onClick={() => this.setStage(PROFILE_CREATOR_STAGES.ACCOUNT_ADDER)}
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
              placeholder="New Balance"
            />
          </label>
          <label htmlFor="currency">
            <span>Currency Type</span>
            <VirtualizedSelect
              name="currency"
              value={this.props.profileCreatorState.currencySelected || ""}
              id="currency"
              className={styles.selectBox}
              onChange={selectedOption =>
                this.props.uiActions.setProfileCreatorCurrentCurrency(
                  selectedOption.label
                )
              }
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
            <input type="number" placeholder={0} min={0} step={0.0001} />
          </label>
        </form>
        <button
          className={styles.next}
          onClick={() => this.setStage(PROFILE_CREATOR_STAGES.PROFILE_SETTINGS)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }

  getAddExchangeStage() {
    return (
      <div key={PROFILE_CREATOR_STAGES.ADD_EXCHANGE}>
        <button
          className={styles.back}
          onClick={() => this.setStage(PROFILE_CREATOR_STAGES.ACCOUNT_ADDER)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Add Exchange</p>
        </div>
        <form>
          <label htmlFor="exchange">
            <span>Exchange</span>

            <VirtualizedSelect
              name="exchange"
              value={this.props.profileCreatorState.exchangeSelected}
              id="exchange"
              className={styles.selectBox}
              onChange={selectedOption =>
                this.props.uiActions.setProfileCreatorCurrentExchange(
                  selectedOption.value
                )
              }
              options={Object.keys(CryptoAPI.loadedExchanges).map(exchange => ({
                value: exchange.id,
                label: exchange.name
              }))}
            />
          </label>
          <label htmlFor="name">
            <span>Balance Name</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="New Balance"
            />
          </label>
          <label htmlFor="currency">
            <span>Currency Type</span>
            <VirtualizedSelect
              name="currency"
              value={this.props.profileCreatorState.currencySelected || ""}
              id="currency"
              className={styles.selectBox}
              onChange={selectedOption =>
                this.props.uiActions.setProfileCreatorCurrentCurrency(
                  selectedOption.label
                )
              }
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
            <input type="number" placeholder={0} min={0} step={0.0001} />
          </label>
        </form>
        <button
          className={styles.next}
          onClick={() => this.setStage(PROFILE_CREATOR_STAGES.PROFILE_SETTINGS)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }

  getProfileSettingsStage() {
    return <div> cake</div>;
  }

  getStages() {
    const stages = {};
    stages[PROFILE_CREATOR_STAGES.ACCOUNT_ADDER] = this.getAccountAdderStage();
    stages[PROFILE_CREATOR_STAGES.ADD_BALANCE] = this.getAddBalanceStage();
    stages[PROFILE_CREATOR_STAGES.ADD_EXCHANGE] = this.getAddExchangeStage();
    stages[
      PROFILE_CREATOR_STAGES.PROFILE_SETTINGS
    ] = this.getProfileSettingsStage();
    return stages[this.props.profileCreatorState.stage];
  }
  render() {
    console.log("render");
    return (
      <DialogComponent dismiss={() => this.dismiss()}>
        {this.getStages()}
      </DialogComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreator);

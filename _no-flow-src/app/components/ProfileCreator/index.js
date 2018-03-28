//
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/fontawesome-free-solid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import VirtualizedSelect from "react-virtualized-select";

import swal from "sweetalert2";
import DialogComponent from "../DialogComponent";

import AccountAdder from "./AccountAdder";
import AddBalance from "./AddBalance";
import AddExchange from "./AddExchange";

// Actions/reducers
import * as uiActions from "../../actions/ui";
import CryptoAPI from "../../utils/CryptoAPI";
import { PROFILE_CREATOR_STAGES } from "../../actions/types/profileCreator";
import * as profileCreatorActions from "../../actions/profileCreator";
// Styles:
import styles from "../styles/ProfileCreator.scss";

// Types:

const mapStateToProps = ({ profileData, uiData, cryptoData }) => ({
  profileData,
  profileCreatorState: uiData.profileCreatorState || {},
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(profileCreatorActions, dispatch)
});

class ProfileCreator extends Component {
  async dismiss() {
    if (
      (await swal({
        title: "Are you sure you wish to exit the Profile Creator?",
        type: "warning",
        showCancelButton: true
      })).value
    ) {
      this.props.actions.hide();
    }
  }

  setStage(stage) {
    this.props.actions.setStage(stage);
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
                this.props.actions.setCurrentExchange(selectedOption.value)
              }
              options={CryptoAPI.loadedExchanges.map(exchange => ({
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
                this.props.actions.setCurrentCurrency(selectedOption.label)
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

    stages[PROFILE_CREATOR_STAGES.ACCOUNT_ADDER] = <AccountAdder />;
    stages[PROFILE_CREATOR_STAGES.ADD_BALANCE] = <AddBalance />;
    stages[PROFILE_CREATOR_STAGES.ADD_EXCHANGE] = <AddExchange />;
    stages[
      PROFILE_CREATOR_STAGES.PROFILE_SETTINGS
    ] = this.getProfileSettingsStage();
    return stages[this.props.profileCreatorState.stage];
  }
  render() {
    return (
      <DialogComponent dismiss={() => this.dismiss()}>
        {this.getStages()}
      </DialogComponent>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreator);

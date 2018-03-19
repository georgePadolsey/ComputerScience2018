// @flow
import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faExchangeAlt,
  faCreditCard,
  faTimes,
  faArrowLeft
} from "@fortawesome/fontawesome-free-solid";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CSSTransitionGroup } from "react-transition-group";

import DialogComponent from "./DialogComponent";
// Actions/reducers
import * as uiActions from "../actions/ui";
import * as profileActions from "../actions/profile";
// Styles:
import styles from "./ProfileCreator.scss";
// Logo
import logo from "../../resources/icon.png";
// Types:
import type { ProfileCreatorStage, UIData } from "../_types/UI";

const mapStateToProps = ({ profileData, uiData }) => ({ profileData, uiData });

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch)
});

const { PROFILE_CREATOR_STAGES } = uiActions;

type Props = {
  uiActions: typeof uiActions,
  uiData: UIData
};

class ProfileCreator extends Component<Props> {
  dismiss() {
    this.props.uiActions.hideProfileCreator();
  }

  setStage(stage: ProfileCreatorStage) {
    this.props.uiActions.setProfileCreatorStage(stage);
  }

  getAccountAdderStage() {
    return (
      <div key={PROFILE_CREATOR_STAGES.ACCOUNT_ADDER}>
        <button className={styles.exit} onClick={() => this.dismiss()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className={styles.titleContainer}>
          {this.props.uiData.firstTime ? (
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
          <button className={styles.button}>
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
            onClick={() => this.setStage(PROFILE_CREATOR_STAGES.ADD_BALANCE)}
          >
            {"I don't want to add a balance..."}
          </span>
        </CSSTransitionGroup>
      </div>
    );
  }

  getAddBalanceStage() {
    return (
      <div key={PROFILE_CREATOR_STAGES.ADD_BALANCE}>
        <button className={styles.exit} onClick={() => this.dismiss()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button
          className={styles.back}
          onClick={() => this.setStage(PROFILE_CREATOR_STAGES.ACCOUNT_ADDER)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Add Balance</p>
          <p className={styles.metaTitle}>Let's add an account.</p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
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
        </div>
      </div>
    );
  }

  getStages() {
    const stages = {};
    stages[PROFILE_CREATOR_STAGES.ACCOUNT_ADDER] = this.getAccountAdderStage();
    stages[PROFILE_CREATOR_STAGES.ADD_BALANCE] = this.getAddBalanceStage();
    return stages[this.props.uiData.profileCreatorStage];
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

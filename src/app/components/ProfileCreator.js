// @flow
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faBalanceScale,
  faExchangeAlt,
  faCreditCard,
  faTimes,
  faArrowLeft
} from '@fortawesome/fontawesome-free-solid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
// Actions/reducers
import { STAGES } from '../reducers/profile';
import * as profileActions from '../actions/profile';
// Styles:
import styles from './ProfileCreator.scss';
// Logo
import logo from '../../resources/icon.png';
// Types:
import type { ProfileCreatorStage } from '../reducers/profile';

const mapStateToProps = ({ profileData }) => ({ profileData });

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class ProfileCreator extends Component {
  componentDidMount() {}

  dismiss() {
    this.props.profileActions.hideProfileCreator();
  }

  setStage(stage: ProfileCreatorStage) {
    this.props.profileActions.setProfileCreatorStage(stage);
  }

  getAccountAdderStage() {
    return (
      <div className={styles.body} key={STAGES.ACCOUNT_ADDER}>
        <button className={styles.exit} onClick={() => this.dismiss()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className={styles.titleContainer}>
          {this.props.profileData.firstTime ? (
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
          <span className={styles.next} onClick={() => this.setStage(STAGES.ADD_BALANCE)}>
            {"I don't want to add a balance..."}
          </span>
        </CSSTransitionGroup>
      </div>
    );
  }

  getAddBalanceStage() {
    return (
      <div className={styles.body} key={STAGES.ADD_BALANCE}>
        <button className={styles.exit} onClick={() => this.dismiss()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button className={styles.back} onClick={() => this.setStage(STAGES.ACCOUNT_ADDER)}>
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
    stages[STAGES.ACCOUNT_ADDER] = this.getAccountAdderStage();
    stages[STAGES.ADD_BALANCE] = this.getAddBalanceStage();
    return stages[this.props.profileData.profileCreatorStage];
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.dimmedBackground} onClick={() => this.dismiss()} aria-hidden />
        {/* <CSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        > */}
        {this.getStages()}
        {/* </CSSTransitionGroup> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreator);

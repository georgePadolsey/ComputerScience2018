// @flow
import React, { Component } from 'react';
import styles from './ProfileCreator.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { CSSTransitionGroup } from 'react-transition-group';
import {
  faBalanceScale,
  faExchangeAlt,
  faCreditCard,
  faTimes,
  faHandPointRight,
  faArrowLeft
} from '@fortawesome/fontawesome-free-solid';
import { connect } from 'react-redux';
import { STAGES } from '../reducers/profile';
import { bindActionCreators } from 'redux';
import * as profileActions from '../actions/profile';

const mapStateToProps = ({ profileData }) => ({ profileData });

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class ProfileCreator extends Component {
  componentDidMount() {}

  dismiss() {
    this.props.profileActions.hideProfileCreator();
  }

  setStage(stage) {
    this.props.profileActions.setProfileCreatorStage(stage);
  }

  getAccountAdderStage() {
    return (
      <div className={styles.body} key={STAGES.ACCOUNT_ADDER}>
        <button className={styles.exit} onClick={() => this.dismiss()}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Create a profile</p>
          <p className={styles.metaTitle}>Let's add an account.</p>
        </div>
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
        <span className={styles.next} onClick={() => this.setStage(STAGES.ADD_BALANCE)}>
          {"I don't want to add a balance..."}
        </span>
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
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          {this.getStages()}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreator);

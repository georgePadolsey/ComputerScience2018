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
  faHandPointRight
} from '@fortawesome/fontawesome-free-solid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../actions/profile';

const mapStateToProps = ({ profileData }) => profileData;

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

const STAGES = {
  ACCOUNT_ADDER: 'ACCOUNT_ADDER',
  ADD_BALANCE: 'ADD_BALANCE',
  ADD_EXCHANGE: 'ADD_EXCHANGE',
  ADD_WALLET: 'ADD_WALLET'
};

class ProfileCreator extends Component {
  componentDidMount() {
    this.props.profileActions.setProfileCreatorStage(STAGES.ACCOUNT_ADDER);
  }

  dismiss() {
    this.props.profileActions.hideProfileCreator();
  }

  nextStage() {}
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.dimmedBackground} onClick={() => this.dismiss()} aria-hidden />
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.profileData.profileCreator.stage === STAGES.ACCOUNT_ADDER ? (
            <div className={styles.body}>
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
              <span className={styles.next} onClick={() => this.nextStage()}>
                I don't want to add a balance...
              </span>
            </div>
          ) : null}
          (this.state.stage === 2 ?
          <div className={styles.body}>
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
            <span className={styles.next}>I don't want to add a balance...</span>
          </div>
          : null)
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreator);

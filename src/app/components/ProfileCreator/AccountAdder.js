//@flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { CSSTransitionGroup } from 'react-transition-group';

import styles from '../styles/ProfileCreator.scss';

import {
  faBalanceScale,
  faExchangeAlt,
  faCreditCard,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/fontawesome-free-solid';

// Actions/reducers
import * as uiActions from '../../actions/ui';
import CryptoAPI from '../../utils/CryptoAPI';
import { PROFILE_CREATOR_STAGES } from '../../actions/types/profileCreator';
import * as profileCreatorActions from '../../actions/profileCreator';

// Logo
import logo from '../../../resources/icon.png';

// Types:
import type { UIData, ProfileCreatorState } from '../../_types/UI';
import type { ProfileCreatorStage } from '../../actions/types/profileCreator';
import type { ProfileData } from '../../_types/Profile';
import type { CryptoState } from '../../_types/Crypto';

const mapStateToProps = ({
  profileData,
  uiData,
  cryptoData
}: {
  uiData: UIData,
  profileData: ProfileData,
  cryptoData: CryptoState
}) => ({
  profileData,
  state: uiData.profileCreatorState || {},
  cryptoData
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(profileCreatorActions, dispatch)
});

type Props = {
  profileData: ProfileData,
  state: ProfileCreatorState,
  cryptoData: CryptoState,
  uiActions: typeof uiActions,
  actions: typeof profileCreatorActions,
  changeStage: ProfileCreatorStage => void
};

class AccountAdder extends Component<Props> {
  render() {
    const changeStage = this.props.changeStage;
    return (
      <div key={PROFILE_CREATOR_STAGES.ACCOUNT_ADDER}>
        <div className={styles.titleContainer}>
          {this.props.state.firstTime ? (
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
            onClick={() => changeStage(PROFILE_CREATOR_STAGES.ADD_BALANCE)}
            onKeyPress={() => changeStage(PROFILE_CREATOR_STAGES.ADD_BALANCE)}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faBalanceScale} />
            </span>
            <span className={styles.meta}> Crypto Coin Balance</span>
          </button>
          <button
            className={styles.button}
            onClick={() => changeStage(PROFILE_CREATOR_STAGES.ADD_EXCHANGE)}
            onKeyPress={() => changeStage(PROFILE_CREATOR_STAGES.ADD_EXCHANGE)}
          >
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
            role="button"
            tabIndex={0}
            onKeyPress={() =>
              changeStage(PROFILE_CREATOR_STAGES.PROFILE_SETTINGS)
            }
            onClick={() => changeStage(PROFILE_CREATOR_STAGES.PROFILE_SETTINGS)}
          >
            {"I don't want to add a balance..."}
          </span>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAdder);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { CSSTransitionGroup } from 'react-transition-group';
import VirtualizedSelect from 'react-virtualized-select';

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
  actions: typeof profileCreatorActions
};

class AddExchange extends Component<Props> {
  render() {
    const changeStage = s => this.props.actions.setStage(s);
    return (
      <div key={PROFILE_CREATOR_STAGES.ADD_EXCHANGE}>
        <button
          className={styles.back}
          onClick={() => changeStage(PROFILE_CREATOR_STAGES.ACCOUNT_ADDER)}
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
              value={this.props.state.exchangeSelected}
              id="exchange"
              className={styles.selectBox}
              onChange={(selectedOption?: { label: string, value: string }) =>
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
            <input type="text" name="name" id="name" placeholder="New Balance" />
          </label>
          <h3>API</h3>
          <label htmlFor="apiKey">
            <span>API key</span>
            <textarea />
          </label>
          <label htmlFor="apiSecret">
            <span>API key</span>
            <textarea />
          </label>
        </form>
        <button
          className={styles.next}
          onClick={() => changeStage(PROFILE_CREATOR_STAGES.PROFILE_SETTINGS)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExchange);

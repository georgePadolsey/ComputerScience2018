// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';

import * as profileActions from '../actions/profile';
import * as uiActions from '../actions/ui';
import * as profileCreatorActions from '../actions/profileCreator';
import * as settingsActions from '../actions/settings';
import Dialog from './DialogComponent';

import type { ProfileData, Profile } from '../_types/Profile';

import CryptoAPI from '../utils/CryptoAPI';
import styles from './styles/SettingsDialog.scss';

import type { CryptoState } from '../_types/Crypto';

const mapStateToProps = ({ profileData }) => ({ profileData });

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  profileCreatorActions: bindActionCreators(profileCreatorActions, dispatch),
  actions: bindActionCreators(settingsActions, dispatch)
});

type Props = {
  profileActions: typeof profileActions,
  uiActions: typeof uiActions,
  profileCreatorActions: typeof profileCreatorActions,
  cryptoData: CryptoState,
  actions: typeof settingsActions,
  profileData: ProfileData
};

class SettingsDialog extends Component<Props> {
  dismiss() {
    this.props.actions.hide();
  }

  getProfile(): Profile {
    if (this.props.profileData.currentProfile == null) {
      this.props.profileActions.correctProfileData();
      throw new Error('Profile data has no profile loaded!');
    }
    // check if currentProfile is valid
    return this.props.profileData.loadedProfiles[this.props.profileData.currentProfile];
  }
  render() {
    return (
      <Dialog dismiss={() => this.dismiss()} showExit>
        <h1 className={styles.mainTitle}>Settings</h1>
        <form className={styles.formBody}>
          <label htmlFor="selectProfile">
            <span>Select Profile:</span>
            <Select
              id="selectProfile"
              value={this.props.profileData.currentProfile}
              options={Object.values(this.props.profileData.loadedProfiles).map(({ displayName, uuid }) => ({ label: displayName, value: uuid }))}
              onChange={result => result && this.props.profileActions.changeProfile(result.value)}
            />
          </label>
          <h2 className={styles.subheading}>Profile Settings - {this.getProfile().displayName}</h2>
          <label htmlFor="autoUpdateTime">
            <span>Set autoupdate time (ms) </span>
            <input
              type="number"
              id="autoUpdateTime"
              min={0}
              step={100}
              defaultValue={this.getProfile().expiryTimeout}
              onBlur={ev =>
                this.props.profileActions.setExpiryTimeout(
                  this.props.profileData.currentProfile,
                  +ev.target.value
                )
              }
            />
          </label>
          <label htmlFor="compareCurrency">
            <span>Compare Currency </span>
            <VirtualizedSelect
              name="currency"
              id="compareCurrency"
              value={this.getProfile().compareCurrency || ''}
              className={styles.selectBox}
              onChange={(selectedOption?: { label: string, value: string } | null) => {
                this.props.profileActions.setCompareCurrency(
                  this.props.profileData.currentProfile,
                  selectedOption ? selectedOption.value : null
                );
              }}
              options={Object.keys(CryptoAPI.currencyExchangeLookup).map(symbol => ({
                value: symbol,
                label: symbol
              }))}
            />
          </label>
        </form>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);

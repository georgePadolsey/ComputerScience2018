// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { faSync, faCogs, faPlus } from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import * as profileActions from '../actions/profile';
import * as cryptoActions from '../actions/crypto';
import * as settingsActions from '../actions/settings';
import * as profileCreatorActions from '../actions/profileCreator';
import SpinOnHoverFontAwesome from './SpinOnHoverFontAwesome';

import styles from './styles/SidePanel.scss';
import EditableText from './EditableText';

import type { ProfileData } from '../_types/Profile';
import type { CryptoState } from '../_types/Crypto';

const mySwal = withReactContent(swal);

type Props = {
  profileData: ProfileData,
  profileCreatorActions: typeof profileCreatorActions,
  profileActions: typeof profileActions,
  settingsActions: typeof settingsActions
};

const mapStateToProps = ({
  profileData,
  cryptoData
}: {
  profileData: ProfileData,
  cryptoData: CryptoState
}) => ({ profileData, cryptoData });

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  profileCreatorActions: bindActionCreators(profileCreatorActions, dispatch),
  settingsActions: bindActionCreators(settingsActions, dispatch),
  cryptoData: bindActionCreators(cryptoActions, dispatch)
});

class SidePanel extends Component<Props> {
  refreshData() {
    this.forceUpdate();
  }

  getCurrentProfile() {
    if (this.props.profileData.currentProfile == null) {
      this.props.profileActions.correctProfileData();
      throw new Error('Profile data has no profile loaded!');
    }
    // check if currentProfile is valid
    return this.props.profileData.loadedProfiles[this.props.profileData.currentProfile];
  }

  getProfileName(): string {
    return this.getCurrentProfile().displayName || 'Default';
  }

  getLastDataUpdate() {
    // todo
    return +new Date();
  }

  async changeProfileName(newName) {
    if (newName === this.getProfileName()) {
      return;
    }

    const result = await mySwal({
      type: 'warning',
      title: `Change profile name to '${newName}'?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });
    if (result.value) {
      this.props.profileActions.changeProfileName(this.props.profileData.currentProfile, newName);
    }
  }

  render() {
    return (
      <div className={styles.sidePanel}>
        <div className={styles.topContainer}>
          <div className={styles.profileName}>
            <EditableText
              html={this.getProfileName()}
              onBlur={name => this.changeProfileName(name)}
            />
          </div>
          <div className={styles.settings}>
            <button onClick={() => this.props.settingsActions.show()}>
              <FontAwesomeIcon icon={faCogs} />
            </button>
            <button onClick={() => this.props.profileCreatorActions.show()}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <span>
            updated {moment(this.getLastDataUpdate()).fromNow()}{' '}
            <SpinOnHoverFontAwesome
              className={styles.refreshButton}
              icon={faSync}
              onClick={() => this.refreshData()}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

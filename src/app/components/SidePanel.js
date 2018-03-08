// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './SidePanel.scss';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import * as profileActions from '../actions/profile';
import * as cryptActions from '../actions/crypt';
import type { ProfileType } from '../_types/Profile';
import SpinOnHoverFontAwesome from './SpinOnHoverFontAwesome';

type Props = {
  profile: ProfileType,
  lastDataUpdate: ?number
};

const defaultProfile: ProfileType = {
  displayName: 'Unnamed User',
  isReal: false,
  uuid: '_'
};

const mapStateToProps = ({ profileData, cryptData }) => ({ profileData, cryptData });

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  cryptData: bindActionCreators(cryptActions, dispatch)
});

class SidePanel extends Component<Props> {
  props: Props;

  componentDidMount() {}

  refreshData() {}

  getCurrentProfile() {
    if (this.props.profileData.currentProfile == null) {
      return null;
    }
    return this.props.profileData.loadedProfiles[this.props.profileData.currentProfile];
  }

  getProfileName() {
    const profile = this.getCurrentProfile();
    return profile ? profile.displayName : 'Default';
  }

  getLastDataUpdate() {
    // todo
    return +new Date();
  }

  render() {
    return (
      <div className={styles.sidePanel}>
        <div className={styles.topContainer}>
          <div className={styles.profileName}>{this.getProfileName()}</div>
          <span>
            updated {moment(this.getLastDataUpdate()).fromNow()}{' '}
            <SpinOnHoverFontAwesome
              className={styles.refreshButton}
              name="sync"
              onClick={() => this.refreshData()}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { faSync } from '@fortawesome/fontawesome-free-solid';

import Dropdown from 'react-dropdown';
import * as profileActions from '../actions/profile';
import * as cryptoActions from '../actions/crypto';
import type { ProfileType } from '../_types/Profile';
import SpinOnHoverFontAwesome from './utils/SpinOnHoverFontAwesome';
import styles from './SidePanel.scss';
import EditableText from './utils/EditableText';

const mySwal = withReactContent(swal);

type Props = {
  profile: ProfileType,
  lastDataUpdate: ?number
};

const defaultProfile: ProfileType = {
  displayName: 'Unnamed User',
  isReal: false,
  uuid: '_'
};

const mapStateToProps = ({ profileData, cryptoData }) => ({ profileData, cryptoData });

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  cryptoData: bindActionCreators(cryptoActions, dispatch)
});

class SidePanel extends Component<Props> {
  props: Props;

  componentDidMount() {}

  refreshData() {
    this.forceUpdate();
  }

  getCurrentProfile() {
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

          <span>
            updated {moment(this.getLastDataUpdate()).fromNow()}{' '}
            <SpinOnHoverFontAwesome
              className={styles.refreshButton}
              icon={faSync}
              onClick={() => this.refreshData()}
            />
          </span>
          <Dropdown
            options={[1, 2, 'argsnkl']}
            onChange={(...args) => console.log(args)}
            value={1}
            placeholder="V"
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

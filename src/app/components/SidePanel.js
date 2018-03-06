// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './SidePanel.scss';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import * as profileActions from '../actions/profile';
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

const mapStateToProps = ({ profile, lastDataUpdate }) => {
  if (profile != null) {
    return { profile, lastDataUpdate };
  }
  return { profile: defaultProfile, lastDataUpdate };
};

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class SidePanel extends Component<Props> {
  props: Props;

  componentDidMount() {}

  refreshData() {}

  render() {
    return (
      <div className={styles.sidePanel}>
        {!this.props.profile.isReal ? (
          <div className={styles.topContainer}>
            <div className={styles.profileName}>{this.props.profile.displayName}</div>
            <span>
              updated {moment(this.props.lastDataUpdate).fromNow()}{' '}
              <SpinOnHoverFontAwesome
                className={styles.refreshButton}
                name="sync"
                onClick={() => this.refreshData()}
              />
            </span>
          </div>
        ) : (
          <h1>Setup Account</h1>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

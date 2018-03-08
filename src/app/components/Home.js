// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from '../actions/profile';
// import { Link } from 'react-router-dom';
import styles from './Home.scss';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import CryptoAPI from '../utils/CryptoAPI';
import matches from 'lodash/matches';
import type { ProfileType } from '../_types/Profile';
import swal from 'sweetalert2';
import ProfileCreator from '../components/ProfileCreator';

type Props = {
  profileActions: {
    [string]: Function
  }
};

const mapStateToProps = ({ profileData }) => ({ profileData });

const mapDispatchToProps = (dispatch, props) => ({
  profileActions: bindActionCreators(profileActions, dispatch)
});

class Home extends Component<Props> {
  props: Props;
  state = {
    profileCreate: false
  };

  componentDidMount() {
    this.props.profileActions.loadProfileData();
  }

  componentDidCatch(error, info) {
    swal({
      title: 'Error',
      html: `<b>Contact the developer with this error</b><br>${error}`,
      type: 'error'
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('Reciving props', nextProps);
    if (nextProps.profileData) {
      console.log('ProfileData defined ?');
      if (!matches(this.props.profileData, nextProps.profileData)) {
        console.log('Profile data updated', nextProps.profileData);
      }
      if (!nextProps.profileData.offeredCreator) {
        this.props.profileActions.showProfileCreator();
        this.props.profileActions.setOfferedCreator(true);
      }
    }
  }

  // <div className={styles.container} data-tid="container" />
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <SidePanel />
          <MainPanel />
        </div>
        {this.props.profileData.showProfileCreator ? <ProfileCreator /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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

type Props = {};

const mapStateToProps = state => {};

const mapDispatchToProps = (dispatch, props) => ({ profileActions: bindActionCreators(profileActions, dispatch) });

class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.profileActions.loadProfiles();
  }

  // <div className={styles.container} data-tid="container" />
  render() {
    return (
      <div className={styles.mainContainer}>
        <SidePanel />
        <MainPanel />
      </div>
    );
  }
}

export default connect(mapDispatchToProps, mapDispatchToProps)(Home);

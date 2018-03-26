// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as profileActions from '../actions/profile';
import * as uiActions from '../actions/ui';
import * as addMainChartActions from '../actions/addMainChart';
import * as profileCreatorActions from '../actions/profileCreator';

import styles from './styles/Home.scss';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';
import CryptoAPI from '../utils/CryptoAPI';
import ProfileCreatorDialog from './ProfileCreator';
import AddMainChartDialog from './AddMainChartDialog';
import SettingsDialog from './SettingsDialog';

import type { ProfileData } from '../_types/Profile';

import type { UIData } from '../_types/UI';

type Props = {
  profileActions: typeof profileActions,
  uiActions: typeof uiActions,
  addMainChartActions: typeof addMainChartActions,
  profileCreatorActions: typeof profileCreatorActions,
  uiData: UIData,
  profileData: ProfileData
};

const mapStateToProps = ({ profileData, uiData }) => ({ profileData, uiData });

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  profileCreatorActions: bindActionCreators(profileCreatorActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  addMainChartActions: bindActionCreators(addMainChartActions, dispatch)
});

class Home extends Component<Props> {
  componentDidMount() {
    console.log('Mount home');
    this.props.profileActions.loadProfileData();
    this.props.uiActions.loadUIData();
    CryptoAPI.loadMarkets();
  }

  // <div className={styles.container} data-tid="container" />
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <SidePanel />
          <MainPanel />
        </div>
        <button onClick={() => this.props.profileCreatorActions.show()}>Show PC</button>
        {this.props.uiData.profileCreatorState.show ? <ProfileCreatorDialog /> : null}
        {this.props.uiData.addMainChartState.show ? <AddMainChartDialog /> : null}
        {this.props.uiData.settingsState.show ? <SettingsDialog /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

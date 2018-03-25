//
import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as profileActions from "../actions/profile";
import * as uiActions from "../actions/ui";
import * as addMainChartActions from "../actions/addMainChart";
import * as profileCreatorActions from "../actions/profileCreator";

import styles from "./styles/Home.scss";
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";
import ProfileCreatorDialog from "../components/ProfileCreator";
import AddMainChartDialog from "../components/AddMainChartDialog";

const mapStateToProps = ({ profileData, uiData }) => ({ profileData, uiData });

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  profileCreatorActions: bindActionCreators(profileCreatorActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  addMainChartActions: bindActionCreators(addMainChartActions, dispatch)
});

class Home extends Component {
  componentDidMount() {
    this.props.profileActions.loadProfileData();
    this.props.uiActions.loadUIData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uiData) {
      if (!nextProps.uiData.profileCreator.offered) {
        this.props.profileCreatorActions.show();
        this.props.profileCreatorActions.setOffered(true);
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
        {this.props.uiData.profileCreatorState &&
        this.props.uiData.profileCreatorState.show ? (
          <ProfileCreatorDialog />
        ) : null}
        {this.props.uiData.addMainChart.show ? <AddMainChartDialog /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

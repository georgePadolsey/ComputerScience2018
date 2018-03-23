//
import React, { Component } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { bindActionCreators } from "redux";

import * as profileActions from "../actions/profile";
import * as uiActions from "../actions/ui";

import styles from "./styles/Home.scss";
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";
import ProfileCreatorDialog from "../components/ProfileCreator";
import AddMainChartDialog from "../components/AddMainChartDialog";

const mySwal = withReactContent(swal);

const mapStateToProps = ({ profileData, uiData }) => ({ profileData, uiData });

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch)
});

class Home extends Component {
  componentDidMount() {
    this.props.profileActions.loadProfileData();
    this.props.uiActions.loadUIData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uiData) {
      if (!nextProps.uiData.offeredCreator) {
        this.props.uiActions.showProfileCreator();
        this.props.uiActions.setOfferedCreator(true);
      }
    }
  }

  /**
   * Catch any error within the component stack
   * @param {Error} error - the error thrown
   */
  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error) {
    mySwal({
      title: "Error",
      html: (
        <div style={{ textAlign: "center" }}>
          <b>Contact the developer with this error</b>
          <br />
          {error.toString()}
        </div>
      ),
      type: "error"
    });
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
        {this.props.uiData.showAddMainChart ? <AddMainChartDialog /> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

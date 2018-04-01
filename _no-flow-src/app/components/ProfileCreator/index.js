//
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import swal from "sweetalert2";
import Dialog from "../DialogComponent";

import AccountAdder from "./AccountAdder";
import AddBalance from "./AddBalance";
import AddExchange from "./AddExchange";

// Actions/reducers
import * as uiActions from "../../actions/ui";
import CryptoAPI from "../../utils/CryptoAPI";
import { PROFILE_CREATOR_STAGES } from "../../actions/types/profileCreator";
import * as profileCreatorActions from "../../actions/profileCreator";
// Styles:
import styles from "../styles/ProfileCreator.scss";

// Types:

const mapStateToProps = ({ profileData, uiData, cryptoData }) => ({
  profileData,
  profileCreatorState: uiData.profileCreatorState || {},
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(profileCreatorActions, dispatch)
});

class ProfileCreator extends Component {
  async dismiss() {
    if (
      (await swal({
        title: "Are you sure you wish to exit the Profile Creator?",
        type: "warning",
        showCancelButton: true
      })).value
    ) {
      this.props.actions.hide();
    }
  }

  setStage(stage) {
    this.props.actions.setStage(stage);
  }

  getStages() {
    const stages = {};

    stages[PROFILE_CREATOR_STAGES.ACCOUNT_ADDER] = <AccountAdder />;
    stages[PROFILE_CREATOR_STAGES.ADD_BALANCE] = <AddBalance />;
    stages[PROFILE_CREATOR_STAGES.ADD_EXCHANGE] = <AddExchange />;
    return stages[this.props.profileCreatorState.stage];
  }
  render() {
    return (
      <Dialog dismiss={() => this.dismiss()} showExit>
        {this.getStages()}
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCreator);

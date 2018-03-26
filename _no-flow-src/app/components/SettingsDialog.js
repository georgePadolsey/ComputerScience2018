//
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as profileActions from "../actions/profile";
import * as uiActions from "../actions/ui";
import * as profileCreatorActions from "../actions/profileCreator";
import * as settingsActions from "../actions/settings";
import Dialog from "./DialogComponent";
import Select from "react-select";

const mapStateToProps = ({ profileData }) => ({ profileData });

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  uiActions: bindActionCreators(uiActions, dispatch),
  profileCreatorActions: bindActionCreators(profileCreatorActions, dispatch),
  actions: bindActionCreators(settingsActions, dispatch)
});

class SettingsDialog extends Component {
  dismiss() {
    this.props.actions.hide();
  }
  render() {
    return (
      <Dialog dismiss={() => this.dismiss()} showExit>
        <h1>Settings</h1>
        <form>
          <label htmlFor="selectProfile">
            <span>Select Profile:</span>
            <Select
              id="selectProfile"
              value={this.props.profileData.currentProfile}
              options={Object.values(this.props.profileData.loadedProfiles).map(
                ({ displayName, uuid }) => ({ label: displayName, value: uuid })
              )}
              onChange={result =>
                result && this.props.profileActions.changeProfile(result.value)
              }
            />
          </label>
        </form>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);

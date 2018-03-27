//
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Select from "react-select";

import * as profileActions from "../actions/profile";
import * as uiActions from "../actions/ui";
import * as profileCreatorActions from "../actions/profileCreator";
import * as settingsActions from "../actions/settings";
import Dialog from "./DialogComponent";

import styles from "./styles/SettingsDialog.scss";

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

  getProfile() {
    if (this.props.profileData.currentProfile == null) {
      this.props.profileActions.correctProfileData();
      throw new Error("Profile data has no profile loaded!");
    }
    // check if currentProfile is valid
    return this.props.profileData.loadedProfiles[
      this.props.profileData.currentProfile
    ];
  }
  render() {
    return (
      <Dialog dismiss={() => this.dismiss()} showExit>
        <h1 className={styles.mainTitle}>Settings</h1>
        <form className={styles.formBody}>
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
          <h2 className={styles.subheading}>
            Profile Settings - {this.getProfile().displayName}
          </h2>
          <label>
            <span>Set autoupdate time (ms) </span>
            <input
              type="number"
              min={0}
              step={100}
              defaultValue={this.getProfile().expiryTimeout}
              onBlur={ev =>
                this.props.profileActions.setExpiryTimeout(
                  this.props.profileData.currentProfile,
                  +ev.target.value
                )
              }
            />
          </label>
        </form>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);

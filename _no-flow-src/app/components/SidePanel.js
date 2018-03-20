// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { faSync } from "@fortawesome/fontawesome-free-solid";

import Dropdown from "react-dropdown";
import * as profileActions from "../actions/profile";
import * as cryptoActions from "../actions/crypto";
import type { Profile, ProfileData } from "../_types/Profile";
import SpinOnHoverFontAwesome from "./SpinOnHoverFontAwesome";
import styles from "./SidePanel.scss";
import EditableText from "./EditableText";

const mySwal = withReactContent(swal);

type Props = {
  profileActions: typeof profileActions,
  profileData: ProfileData
};

const mapStateToProps = ({ profileData, cryptoData }) => ({
  profileData,
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  cryptoData: bindActionCreators(cryptoActions, dispatch)
});

class SidePanel extends Component<Props> {
  props: Props;

  refreshData() {
    this.forceUpdate();
  }

  getCurrentProfile() {
    // check if currentProfile is valid
    return this.props.profileData.loadedProfiles[
      this.props.profileData.currentProfile
    ];
  }

  getProfileName(): string {
    return this.getCurrentProfile().displayName || "Default";
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
      type: "warning",
      title: `Change profile name to '${newName}'?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    });
    if (result.value) {
      this.props.profileActions.changeProfileName(
        this.props.profileData.currentProfile,
        newName
      );
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
            updated {moment(this.getLastDataUpdate()).fromNow()}{" "}
            <SpinOnHoverFontAwesome
              className={styles.refreshButton}
              icon={faSync}
              onClick={() => this.refreshData()}
            />
          </span>
          <Dropdown
            options={[1, 2, "argsnkl"]}
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

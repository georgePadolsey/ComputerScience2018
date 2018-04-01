//
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { bindActionCreators } from "redux";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  faSync,
  faCogs,
  faPlus,
  faChevronUp,
  faChevronDown,
  faCompress
} from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import * as profileActions from "../actions/profile";
import * as cryptoActions from "../actions/crypto";
import * as settingsActions from "../actions/settings";
import * as profileCreatorActions from "../actions/profileCreator";
import SpinOnHoverFontAwesome from "./SpinOnHoverFontAwesome";

import styles from "./styles/SidePanel.scss";
import EditableText from "./EditableText";

const mySwal = withReactContent(swal);

const mapStateToProps = ({ profileData, cryptoData }) => ({
  profileData,
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  profileActions: bindActionCreators(profileActions, dispatch),
  profileCreatorActions: bindActionCreators(profileCreatorActions, dispatch),
  settingsActions: bindActionCreators(settingsActions, dispatch),
  cryptoData: bindActionCreators(cryptoActions, dispatch)
});

class SidePanel extends Component {
  refreshData() {
    this.forceUpdate();
  }

  getCurrentProfile() {
    if (this.props.profileData.currentProfile == null) {
      this.props.profileActions.correctProfileData();
      throw new Error("Profile data has no profile loaded!");
    }
    // check if currentProfile is valid
    return this.props.profileData.loadedProfiles[
      this.props.profileData.currentProfile
    ];
  }

  getProfileName() {
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
          <div className={styles.settings}>
            <button onClick={() => this.props.settingsActions.show()}>
              <FontAwesomeIcon icon={faCogs} />
            </button>
            <button onClick={() => this.props.profileCreatorActions.show()}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <span>
            updated {moment(this.getLastDataUpdate()).fromNow()}{" "}
            <SpinOnHoverFontAwesome
              className={styles.refreshButton}
              icon={faSync}
              onClick={() => this.refreshData()}
            />
          </span>

          <div className={styles.portfolioMoney}>
            <p>Portfolios</p>
            <span className={styles.portfolio}>
              <span className={styles.balanceName}>Original Bitcoin</span>
              <span className={styles.toRight}>
                <span className={styles.amount}>1.3001 BTC</span>
              </span>
            </span>
            <span className={styles.portfolio}>
              <span className={styles.balanceName}>Other Ethereum</span>
              <span className={styles.toRight}>
                <span className={styles.amount}>0.5101 BTC</span>
              </span>
            </span>
            <span className={styles.portfolio}>
              <span className={styles.balanceName}>Just Made</span>
              <span className={styles.toRight}>
                <span className={styles.amount}>0.0000 BTC</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

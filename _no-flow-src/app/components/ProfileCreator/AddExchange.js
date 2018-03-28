//
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { faArrowLeft, faArrowRight } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import VirtualizedSelect from "react-virtualized-select";

import styles from "../styles/ProfileCreator.scss";

// Actions/reducers
import * as uiActions from "../../actions/ui";
import CryptoAPI from "../../utils/CryptoAPI";
import { PROFILE_CREATOR_STAGES } from "../../actions/types/profileCreator";
import * as profileCreatorActions from "../../actions/profileCreator";

// Logo
import logo from "../../../resources/icon.png";

// Types:

const mapStateToProps = ({ profileData, uiData, cryptoData }) => ({
  profileData,
  state: uiData.profileCreatorState || {},
  cryptoData
});

const mapDispatchToProps = dispatch => ({
  uiActions: bindActionCreators(uiActions, dispatch),
  actions: bindActionCreators(profileCreatorActions, dispatch)
});

class AddExchange extends Component {
  render() {
    const changeStage = s => this.props.actions.setStage(s);
    return (
      <div key={PROFILE_CREATOR_STAGES.ADD_EXCHANGE}>
        <button
          className={styles.back}
          onClick={() => changeStage(PROFILE_CREATOR_STAGES.ACCOUNT_ADDER)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Add Exchange</p>
        </div>
        <form>
          <label htmlFor="exchange">
            <span>Exchange</span>

            <VirtualizedSelect
              name="exchange"
              value={this.props.state.exchangeSelected}
              id="exchange"
              className={styles.selectBox}
              onChange={selectedOption =>
                this.props.actions.setCurrentExchange(selectedOption.value)
              }
              options={CryptoAPI.loadedExchanges.map(exchange => ({
                value: exchange.id,
                label: exchange.name
              }))}
            />
          </label>
          <label htmlFor="name">
            <span>Balance Name</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="New Balance"
            />
          </label>
          <h3>API</h3>
          <label htmlFor="apiKey">
            <span>API key</span>
            <textarea />
          </label>
          <label htmlFor="apiSecret">
            <span>API key</span>
            <textarea />
          </label>
        </form>
        <button
          className={styles.next}
          onClick={() => this.props.actions.hide()}
        >
          {"Add"}
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExchange);

// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import styles from './Home.scss';
import SidePanel from './SidePanel';
import CryptoAPI from '../utils/CryptoAPI';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <SidePanel />
        <div className={styles.container} data-tid="container" />
      </div>
    );
  }
}

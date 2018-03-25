// @flow
import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Home from '../components/Home';

type Props = {};
const mySwal = withReactContent(swal);

export default class HomePage extends Component<Props> {
  props: Props;

  /**
   * Catch any error within the component stack
   * @param {Error} error - the error thrown
   */
  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error: Error) {
    mySwal({
      title: 'Error',
      html: (
        <div style={{ textAlign: 'center' }}>
          <b>Contact the developer with this error</b>
          <br />
          {error.toString()}
        </div>
      ),
      type: 'error'
    });
  }

  render() {
    return <Home />;
  }
}

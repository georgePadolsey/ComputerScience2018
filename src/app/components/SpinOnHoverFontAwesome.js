import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/fontawesome-free-solid';

export default class SpinOnHoverFontAwesome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false
    };
  }

  render() {
    // Composition > Extension :)
    return (
      <FontAwesomeIcon
        {...this.props}
        spin={this.state.mouseOver}
        icon={faSync}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseOut={() => this.setState({ mouseOver: false })}
      />
    );
  }
}

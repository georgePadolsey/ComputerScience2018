import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class SpinOnHoverFontAwesome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false
    };
  }

  render() {
    const { icon, ...rest } = this.props;

    // Composition > Extension :)
    return (
      <FontAwesomeIcon
        {...rest}
        spin={this.state.mouseOver}
        icon={icon}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseOut={() => this.setState({ mouseOver: false })}
      />
    );
  }
}

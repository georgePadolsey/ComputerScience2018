import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

type Props = {
  icon: object
};

export default class SpinOnHoverFontAwesome extends Component<Props> {
  state = {
    mouseOver: false
  };

  render() {
    const { icon, ...rest } = this.props;

    // Composition > Extension :)
    return (
      <FontAwesomeIcon
        {...rest}
        spin={this.state.mouseOver}
        icon={icon}
        onFocus={() => this.setState({ mouseOver: true })}
        onBlur={() => this.setState({ mouseOver: false })}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseOut={() => this.setState({ mouseOver: false })}
      />
    );
  }
}

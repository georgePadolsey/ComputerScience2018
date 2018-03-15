import React, { Component } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/fontawesome-free-solid";

type Props = {
  icon: typeof solidIcons
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

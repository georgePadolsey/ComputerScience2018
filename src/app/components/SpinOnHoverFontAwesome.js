// @flow
// Module imports
import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

// Object requires no itself props
type Props = {};

/**
 * State only has one boolean
 * whether the mouse is currently over
 * the component
 */
type State = { mouseOver: boolean };

/**
 * React component to provide a icon which spins
 * when the mouse is over it. Useful for a refresh button.
 */
export default class SpinOnHoverFontAwesome extends Component<Props, State> {
  /**
   * Set defualt state of mouseOver to false
   * So not spinning
   */
  state = {
    mouseOver: false
  };

  render() {
    // Composition > Extension :)
    return (
      <FontAwesomeIcon
        {...this.props}
        spin={this.state.mouseOver}
        onFocus={() => this.setState({ mouseOver: true })}
        onBlur={() => this.setState({ mouseOver: false })}
        onMouseOver={() => this.setState({ mouseOver: true })}
        onMouseOut={() => this.setState({ mouseOver: false })}
      />
    );
  }
}

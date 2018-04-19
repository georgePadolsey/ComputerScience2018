// @flow
import * as React from 'react';

// flow type props
type Props = {
  children: React.Node
};

/**
 * App class is a react component
 * which wraps everything -> Parent element
 */
export default class App extends React.Component<Props> {
  props: Props;

  render() {
    // wrap children in a div element
    return <div>{this.props.children}</div>;
  }
}

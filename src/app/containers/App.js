// @flow
import * as React from 'react';

type Props = {
  children?: React.Node
};

export default class App extends React.Component<Props> {
  render() {
    return this.props.children;
  }
}

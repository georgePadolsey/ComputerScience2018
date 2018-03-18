import React, { Component } from 'react';
import styles from './DialogComponent.scss';

type Props = {
  dismiss: () => void,
  children: React.children
};

class DialogComponent extends Component<Props> {
  render() {
    const { dismiss, children, ...rest } = this.props;

    return (
      <div className={styles.container} {...rest}>
        <div className={styles.dimmedBackground} onClick={() => dismiss()} aria-hidden />
        {children}
      </div>
    );
  }
}

export default DialogComponent;

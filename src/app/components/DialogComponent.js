import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './styles/DialogComponent.scss';
import { faTimes } from '@fortawesome/fontawesome-free-solid';

type Props = {
  dismiss: () => void,
  children: React.children,
  showExit?: boolean
};

class DialogComponent extends Component<Props> {
  render() {
    const {
      dismiss, children, showExit, ...rest
    } = this.props;

    return (
      <div className={styles.container} {...rest}>
        <div className={styles.dimmedBackground} onClick={() => dismiss()} aria-hidden />

        <div>
          <button className={styles.exit} onClick={() => this.dismiss()}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {children}
        </div>
      </div>
    );
  }
}

export default DialogComponent;

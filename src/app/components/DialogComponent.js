import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import styles from './styles/DialogComponent.scss';

type Props = {
  dismiss: () => void,
  children: React.Node,
  showExit?: boolean
};

class DialogComponent extends React.Component<Props> {
  render() {
    const {
      dismiss, children, showExit, ...rest
    } = this.props;

    return (
      <div className={styles.container} {...rest}>
        <div className={styles.dimmedBackground} onClick={() => dismiss()} aria-hidden />

        <div>
          {showExit ? <button className={styles.exit} onClick={() => dismiss()}>
            <FontAwesomeIcon icon={faTimes} />
          </button>: null}
          {children}
        </div>
      </div>
    );
  }
}

export default DialogComponent;

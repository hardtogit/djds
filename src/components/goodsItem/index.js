import React, {Component} from 'react';
import styles from './index.module.scss'

class Index extends Component {
  render() {
    return (
      <div className={styles.item}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>

      </div>
    );
  }
}

export default Index;

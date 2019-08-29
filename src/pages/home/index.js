import React, {Component} from 'react';
import GoodsItem from '@/components/goodsItem'
import styles from './index.module.scss'

class Index extends Component {
  render() {
    return (
      <div className={styles.test}>
        <GoodsItem/>

      </div>
    );
  }
}

export default Index;

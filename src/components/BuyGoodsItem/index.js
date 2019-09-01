import React, {Component} from 'react';
import {staticPathDown} from '@/config/setting'
import styles from './index.module.scss'
import classNames from "classnames";

class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {goods:{goodsname,serialnum,picture,price,num}}=this.props
    return (
      <div className={styles.item}>
        <div className={styles.left}>
          <img src={staticPathDown+picture} alt=""/>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            {goodsname}
          </div>
          <div className={styles.dis}>
            产品编号：{serialnum}
          </div>
          <div className={styles.bottom}>
            <div className={styles.price}>
             ￥ {price} <span className={styles.num}>x{num}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

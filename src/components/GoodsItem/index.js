import React, {Component} from 'react';
import {staticPathDown} from '@/config/setting'
import styles from './index.module.scss'
import classNames from "classnames";

class Index extends Component {
  constructor(props) {
    super(props);
  }
  handleCheck=()=>{
     this.props.handleCheck()
  }
  handleSub=()=>{
    this.props.handleSub()
  }
  handleAdd=()=>{
    this.props.handleAdd()
  }
  render() {
    const {goods:{checked,goodsname,serialnum,price,num,picture}}=this.props
    return (
      <div className={styles.item}>
        <div onClick={this.handleCheck}  className={classNames([styles.checked,checked&&styles.active])}/>
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
             ￥ {price}
              <div className={styles.count}>
                <div className={styles.sub} onClick={this.handleSub}>-</div>
                <div className={styles.input}>{num}</div>
                <div className={styles.add} onClick={this.handleAdd}>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

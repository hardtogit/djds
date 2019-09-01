import React, {Component} from 'react';
import classNames from 'classnames'
import zfb from '../../assets/img/zfb.png'
import wx from '../../assets/img/wx.png'
import styles from './index.module.scss'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      payType:'zfb'
    }
  }
  handleChange=(payType)=>{
    this.setState({
      payType
    })
  }
  render() {
    const {payType}=this.state
    return (
      <div className={styles.pay}>
        <div className={classNames([styles.item,styles.first])}>
          <div className={styles.left}>
            <img src={zfb} alt=""/>支付宝
          </div>
          <div className={styles.right} onClick={()=>{this.handleChange('zfb')}}>
            <div  className={classNames([styles.checked,payType==='zfb'&&styles.active])}/>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.left}>
            <img src={wx} alt=""/>微信
          </div>
          <div className={styles.right} onClick={()=>{this.handleChange('wx')}}>
            <div  className={classNames([styles.checked,payType==='wx'&&styles.active])}/>
          </div>
        </div>
        <div className={styles.btn}>
          确定
        </div>

      </div>
    );
  }
}

export default Index;

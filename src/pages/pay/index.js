import React, {Component} from 'react';
import classNames from 'classnames'
import {hashHistory} from 'react-router'
import NavBar from '@/components/NavBar'
import Fetch from '@/utils/baseSever'
import zfb from '../../assets/img/zfb.png'
import wx from '../../assets/img/wx.png'
import styles from './index.module.scss'
import toast from "@/utils/toast";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      payType:'wx'
    }
  }
  handleChange=(payType)=>{
    this.setState({
      payType
    })
  }
  handleSubmit=()=>{
    const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'))||{}
    if(this.state.payType==='wx'){
      const ua = navigator.userAgent.toLowerCase();
      const isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        Fetch({
          obj:'user',
          act:'getpayinfo',
          paytype:this.state.payType==='zfb'?'alipay':'wechatpay',
          order_id:orderInfo['_id'],
          money:orderInfo.total_payments,
          openid:sessionStorage.getItem('openid'),
          browser_type:'wechat'
        }).then((data)=>{
          if(data.ustr){
            toast(data.ustr)
            return
          }
          // if(this.state.payType==='zfb'){
          //   window.location.href=`https://openapi.alipay.com/gateway.do?${data.info.sign}`
          // }else{
          //   // return
          //   window.location.href=`https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=${data.info.prepayid}&package=${data.info.partnerid}`
          // }
          function onBridgeReady(){
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId" : data.info.appId,     //公众号名称，由商户传入
                "timeStamp":data.info.timestamp,         //时间戳，自1970年以来的秒数
                "nonceStr" : data.info.noncestr, //随机串
                "package" : data.info.package,
                "signType" : "MD5",         //微信签名方式:
                "paySign" : data.info.sign //微信签名
              },
              function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                  toast('支付成功')
                  hashHistory.push('home?name='+sessionStorage.getItem('goodsName'))
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            );
          }
          if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          }else{
            onBridgeReady();
          }
        })
       return
      }
    }



    Fetch({
      obj:'user',
      act:'getpayinfo',
      paytype:this.state.payType==='zfb'?'alipay':'wechatpay',
      order_id:orderInfo['_id'],
      money:orderInfo.total_payments
    }).then((data)=>{
      if(data.ustr){
        toast(data.ustr)
        return
      }
      if(this.state.payType==='zfb'){
        window.location.href=`https://openapi.alipay.com/gateway.do?${data.info.sign}`
      }else{
        // return
        window.location.href=`https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=${data.info.prepayid}&package=${data.info.package}`
      }
    })
  }
  render() {
    const {payType}=this.state
    return (
      <div className={styles.pay}>
          <NavBar onLeft={()=>{hashHistory.goBack()}}>确认支付</NavBar>
        <div className={classNames([styles.item,styles.first])}>
          <div className={styles.left}>
            <img src={wx} alt=""/>微信
          </div>
          <div className={styles.right} onClick={()=>{this.handleChange('wx')}}>
            <div  className={classNames([styles.checked,payType==='wx'&&styles.active])}/>
          </div>

        </div>
        <div className={styles.item}>
          <div className=
                 {styles.left}>
            <img src={zfb} alt=""/>支付宝
          </div>
          <div className={styles.right} onClick={()=>{this.handleChange('zfb')}}>
            <div  className={classNames([styles.checked,payType==='zfb'&&styles.active])}/>
          </div>
        </div>
        <div className={styles.btn} onClick={this.handleSubmit}>
          确定
        </div>

      </div>
    );
  }
}

export default Index;

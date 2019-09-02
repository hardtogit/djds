import React, {Component} from 'react';
import BuyGoodsItem from '@/components/BuyGoodsItem'
import BestInput from '@/components/BestInput'
import NavBar from '@/components/NavBar'
import line from '@/assets/img/line.png'
import Fetch from '@/utils/baseSever'
import {hashHistory} from 'react-router'
import toast from '@/utils/toast'
import styles from './index.module.scss'
import classNames from "classnames";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:JSON.parse(sessionStorage.getItem('buyGoods'))||[],
      gender:undefined
    }
  }
  handleSubmit=()=>{
    console.log(this.name.value)
    console.log(JSON.parse(sessionStorage.getItem('buyGoods')))
    const price=JSON.parse(sessionStorage.getItem('buyGoods')).reduce((total,current)=>{if(current.checked){
      return (parseFloat(total)+ parseFloat(current.price*current.num)).toFixed(2)
    }else{
      return parseFloat(total).toFixed(2)
    } },0.00)
    const params={
      name:this.name.value,
      phone:this.phone.value,
      address:this.address.value,
      comment:this.comment.value,
      gender:this.state.gender,
      seller:this.props.location.query.name,
      datas:JSON.parse(sessionStorage.getItem('buyGoods')).map((item)=>{
        return {...item,goodsid:item['_id'],number:item.num}
      }),
      total_payments:price
    }
    Fetch({
      obj:'user',
      act:'ordernow',
      ...params
    }).then((response)=>{
      if(response.ustr){
        toast(response.ustr)
        return
      }
      hashHistory.push('/pay')
    })
  }
  handleCheck=(gender)=>{
    this.setState({
      gender
    })
  }
  render() {
    const {data,gender}=this.state
    return (
      <div className={styles.buy}>
          <NavBar onLeft={()=>{hashHistory.goBack()}}>商家名称-{this.props.location.query.name}</NavBar>
          <img className={styles.line} src={line} alt=""/>
        {data.map((item,index)=>{
          return(
            <BuyGoodsItem goods={item} key={index}/>
            )
        })
        }
        <div className={styles.subTitle}>
          收货地址
        </div>
        <BestInput label='姓名' getInput={(name)=>{this.name=name}} />
        <div className={styles.flex}>
          <div className={styles.left}>
            性别
          </div>
          <div className={styles.right}>
            <div className={styles.item} onClick={()=>this.handleCheck('男')}>
              <div  className={classNames([styles.checked,gender==='男'&&styles.active])} />
              男
            </div>
            <div className={styles.item} onClick={()=>this.handleCheck('女')}>
              <div  className={classNames([styles.checked,gender==='女'&&styles.active])} />
              女
            </div>
          </div>
        </div>
        <BestInput label='联系方式' getInput={(phone)=>{this.phone=phone}}/>
        <BestInput label='快递地址' getInput={(address)=>{this.address=address}}/>
        <div className={styles.subTitle}>
          备注
        </div>
        <textarea className={styles.mark} ref={(comment)=>{this.comment=comment}} name="" id="" cols="30" rows="10">

        </textarea>
        <div className={styles.btn} onClick={()=>this.handleSubmit()}>
          下单
        </div>
      </div>
    );
  }
}

export default Index;

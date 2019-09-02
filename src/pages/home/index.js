import React, {Component} from 'react';
import classNames from 'classnames';
import {hashHistory} from 'react-router'
import NavBar from '@/components/NavBar'
import GoodsItem from '@/components/GoodsItem'
import Fetch from '@/utils/baseSever'
import styles from './index.module.scss'
import toast from "@/utils/toast";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      checkedAll:false,
      data:[]
    }
  }
  componentDidMount(){
    console.log(this.props)
    Fetch({
      obj:'user',
      act:'goodslist',
      seller:this.props.location.query.name
    }).then((data)=>{
      this.setState({
        data:data.info.map((item)=>({...item, checked:false, num:1}))
      })
    })
  }
  handleCheck=(index,goods)=>{
      const {data}=this.state
       data[index].checked=!goods.checked
    this.setState({
      data
    })
  }
  handleAdd=(index,goods)=>{
    const {data}=this.state
    const {num}=goods
    // if(num===1){
    //   toast('至少买一件')
    // }else{
      data[index].num=num+1
      this.setState({
        data
      })
    // }
  }
  handleSub=(index,goods)=>{
    const {data}=this.state
    const {num}=goods
    if(num===1){
      toast('至少买一件')
    }else{
      data[index].num=num-1
      this.setState({
        data
      })
    }
  }
  handleCheckAll=()=>{
    const {data}=this.state
    const flag=data.filter((item)=>{return(item.checked)}).length===data.length
    data.map((item)=>{item.checked=!flag;return item})
    this.setState({
      data
    })
  }
  handleSubmit=()=>{
    if(this.state.data.filter((item)=>{return(item.checked)}).length===0){
      toast('至少选择一件商品')
      return
    }
    sessionStorage.setItem('buyGoods',JSON.stringify(this.state.data.filter((item)=>{return(item.checked)})))
    hashHistory.push('/buy?name='+this.props.location.query.name)
  }
  render() {
    const {data}=this.state
    const checkedAll=data.filter((item)=>{return(item.checked)}).length===data.length
    const price=data.reduce((total,current)=>{if(current.checked){
      return total+current.price*current.num
    }else{
      return total
    } },0)
    return (
      <div className={styles.home}>
          <NavBar onLeft={()=>{window.history.go(-1)}}>商家名称-{this.props.location.query.name}</NavBar>
        {data.map((item,index)=>{
          return (<GoodsItem
            handleCheck={()=>{this.handleCheck(index,item)}}
            handleAdd={()=>{this.handleAdd(index,item)}}
            handleSub={()=>{this.handleSub(index,item)}}
            key={index}
            goods={item}/>)
        })}
        <div className={styles.bottomBar}>
          <div className={styles.left}>
            <div className={styles.all}
                 onClick={this.handleCheckAll}
            >
          <div  className={classNames([styles.checked,checkedAll&&styles.active])}/>
              全部
            </div>
            <div className={styles.price}>
              <div className={styles.text}>
                合计
              </div>
              <div className={styles.num}>
                ￥{price.toFixed(2)}
              </div>
            </div>
          </div>
          <div className={styles.right}>
              <div className={styles.btn} onClick={this.handleSubmit}>
                    立即购买
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import Fetch from '@/utils/baseSever'
import toast from '@/utils/toast'
import data from '@/pages/choice/data'
import btnPng  from '../../assets/img/btnCopy.png'
import Swiper from 'swiper'
import 'swiper/swiper.scss'
import styles from './index.module.scss'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      toname:"",
      fromname:""
    }
  }
  componentWillMount(){
    console.log(this.props)
  }
  handleSubmit=()=>{
    if(!this.state.toname||!this.state.fromname){
     toast('请填写完整信息')
      return
    }
    Fetch({
      obj:'user',
      act:'sendjs',
      subtype:data[this.props.params.type].label,
      title:`${data[this.props.params.type].content[this.props.params.content].prefix+this.state.toname}：`,
      toname:this.state.toname,
      fromname:this.state.fromname,
      content:data[this.props.params.type].content[this.props.params.content].text
    }).then((data)=>{
      sessionStorage.setItem('share','true')
      hashHistory.push(`/share/${data.info}`)
    })
  }
  render() {
    const {toname,fromname}=this.state
    return (
      <div className={styles.fill}>
          <div className={styles.inputGroup}>
            <div className={styles.label}>
              祝福对象：
            </div>
          <div className={styles.input}>
            <input onChange={(e)=>{this.setState({
              toname:e.target.value
            })}} value={toname} type="text"/>
          </div>
          </div>
        <div className={styles.inputGroup}>
          <div className={styles.label}>
            你的姓名或昵称：
          </div>
          <div className={styles.input}>
            <input onChange={(e)=>{this.setState({
              fromname:e.target.value
            })}} value={fromname} type="text"/>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.label}>
            预览页面：
          </div>
          <div className={styles.content}>
            <div className={styles.inner}>
              <div>
                {data[this.props.params.type].content[this.props.params.content].prefix}{toname}：{data[this.props.params.type].content[this.props.params.content].text}
              </div>
              <div className={styles.bottom}>
                ——{fromname}
              </div>
            </div>
          </div>
        </div>
          <div className={styles.btn} onClick={this.handleSubmit}>
            <img src={btnPng} alt=""/>
          </div>
      </div>
    );
  }
}
export default Index;

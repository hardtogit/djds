import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import Fetch from '@/utils/baseSever'
import classNames from 'classnames'
import data from './data'
import btnPng  from '../../assets/img/btn.png'
import leftPng  from '../../assets/img/laft.png'
import rightPng  from '../../assets/img/right.png'
import Swiper from 'swiper'
import 'swiper/swiper.scss'
import styles from './index.module.scss'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      selectIndex:0,
      contents:data[0].content
    }
    this.mySwiper=null
  }
  componentDidMount(){
    Fetch({
      obj:'user',
      act:'sendjs'

    }).then(()=>{

    })
    this.mySwiper = new Swiper('#swiper-container', {
      autoplay: false,//可选选项，自动滑动
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  }
  handleChangeLabel=(i)=>{
    this.setState({
      selectIndex:i,
      contents:data[i].content
    },()=>{
      this.mySwiper.updateSlides()
      this.mySwiper.slideTo(0,0)
    })

  }
  render() {
    const {selectIndex,contents}=this.state
    return (
      <div className={styles.choice}>
          <div id="swiper-container">
            <div className="swiper-wrapper">
              {contents.map((item,i)=>{
                return(
                  <div className="swiper-slide" key={i}>
                    <div className={styles.item}>
                      <div className={styles.title}>
                        {item.prefix}______
                      </div>
                      <div className={styles.subTitle}>
                        (请填写祝福的对象):
                      </div>
                      <div className={styles.content}>
                        {item.text}
                      </div>
                      <div className={styles.bottom}>
                        ________
                      </div>
                      <div className={styles.subBottom}>
                        (请填写你的姓名和昵称)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next">
              <img src={rightPng} alt=""/>
            </div>
            <div className="swiper-button-prev">
              <img src={leftPng} alt=""/>
            </div>
          </div>
          <div className={styles.labels}>
            {data.map((item,i)=>{
              return  (<div key={i}
                            onClick={()=>this.handleChangeLabel(i)}
                            className={classNames([styles.label,selectIndex===i&&styles.active]) }>
                {item.label}
              </div>)
            })}
          </div>
          <div className={styles.btn} onClick={()=>hashHistory.push(`/fill/${selectIndex}/${this.mySwiper.activeIndex}`)}>
            <img src={btnPng} alt=""/>
          </div>
      </div>
    );
  }
}
export default Index;

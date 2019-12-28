import React, {Component} from 'react';
import Fetch from '@/utils/baseSever'
import classNames from 'classnames'
import Share from '@/assets/img/share.png'
import styles from './index.module.scss'

const clientWidth = document.clientWidth || document.body.clientWidth;
const clientHeight = document.documentElement.clientHeight||document.body.clientHeight;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      entity:{},
      visible:false
    }
  }
  componentDidMount(){
    Fetch({
      obj:'user',
      act:'readjs',
      id:this.props.params.id
    }).then((data)=>{

      this.setState({
        entity:data.info
      })
    })

  }
  render() {
    const flag=sessionStorage.getItem('share')?true:false
    const {entity,visible}=this.state
    console.log(clientHeight)
    const style= {
      height: `${clientHeight * 0.6}px`,
      margin:`${clientHeight * 0.14}px auto 0 auto`
    }
    if(!flag){
      style.margin=`${clientHeight * 0.26}px auto 0 auto`
    }
    return (
      <div className={classNames([styles.share,!flag&&styles.formShare]) }>
        <div className={styles.content} style={style}>
          <div className={styles.inner}>
            <div className={styles.title}>
              {entity.title}
            </div>
            <div className={styles.text}>
              {entity.content&&entity.content}
            </div>
            <div className={styles.bottom}>
              ——{entity.fromname}
            </div>
          </div>
        </div>
        <div onClick={()=>{this.setState({visible:true})}} className={styles.btn}/>
        {visible&&<div>
          <div className={styles.bg} onClick={()=>{this.setState({visible:false})}}>
          </div>
          <img src={Share} className={styles.icon} alt=""/>
        </div>}

      </div>
    );
  }
}
export default Index;

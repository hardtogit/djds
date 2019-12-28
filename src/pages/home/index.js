import React, {Component} from 'react';
import {hashHistory} from 'react-router'
import styles from './index.module.scss'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
      checkedAll:false,
      data:[]
    }
  }
  render() {
    return (
      <div className={styles.home}>
          <div onClick={()=>hashHistory.push('/choice')} className={styles.btn}/>
      </div>
    );
  }
}
export default Index;

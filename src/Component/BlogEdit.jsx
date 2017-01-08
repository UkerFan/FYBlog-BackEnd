import React, { Component, PropTypes } from 'react'
import { History, Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable'
import { Tool } from '../Libs/Tool'

import {
  setFilters,
  setToolBar
} from '../Redux/Action/Index'

class BlogEdit extends Component {
  constructor() {
    super();
    this.state = {
      toolBar: [{
        type: 'link',
        name: '取消',
        icon: 'iconfont icon-close',
        callBack: '/blogs'
      },{
        type: 'action',
        name: '保存',
        icon: 'iconfont icon-check',
        callBack: () => {
          this.dataPost();
        }
      }],
      postData: {
        title: '',
        remark: '',
        content: ''
      }
    };
  }
  dataPost() {
    let postData = this.state.postData;
    postData.icon = '/images/404.jpg';
    Tool.get('/token').then(data => {
      postData.token = data.token;
      if (this.props.params.id) {
        postData.id = this.props.params.id;
        Tool.post('/blog/set', postData).then(data => {
          console.log('success', this.props);
          this.props.router.push('/blogs');
        }).catch(err => {
          console.log('error', err);
        });
      } else {
        Tool.post('/blog/new', postData).then(data => {
          this.props.router.push('/blogs');
        }).catch(err => {
          console.log('error', err);
        });
      }
    }).catch(err => {
      console.log('get Token error', err);
    });

  }
  dataChange(event, key) {
    let data = this.state.postData;
    data[key] = event.target.value;
    this.setState({
      postData: data
    });
  }
  componentWillMount() {
    this.props.dispatch(setFilters([]));
    this.props.dispatch(setToolBar(this.state.toolBar));
    this.initPostData();
    document.body.scrollTop = 0;
  }
  initPostData() {
    if (this.props.params.id) {
      Tool.get('/blog/get/' + this.props.params.id).then(data => {
        this.setState({
          postData: {
            title: data.result.title,
            remark: data.result.remark,
            content: data.result.content
          }
        });
      }).catch(err => {
        console.log('get error', err);
      });
    }
  }
  render() {
    return (
      <div className={this.props.sideBarStatus ? 'edit-container wide' : 'edit-container'}>
        <div className='input-block'>
          <label>标题</label>
          <input type="text" value={ this.state.postData.title } onChange={event => this.dataChange(event, 'title')} placeholder='输入文章标题'/>
        </div>
        <div className='input-block'>
          <label>摘要</label>
          <input type="text" value={ this.state.postData.remark } onChange={event => this.dataChange(event, 'remark')} placeholder='输入文章摘要'/>
        </div>
        <div className='input-block'>
          <label>正文</label>
          <textarea placeholder='文章正文' value={ this.state.postData.content } onChange={event => this.dataChange(event, 'content')}></textarea>
        </div>
      </div>
    );
  }
}

BlogEdit.propTypes = {
  sideBarStatus: PropTypes.bool.isRequired
};

function select(state) {
  return {
    sideBarStatus: state.sideBarToggle
  };
}

export default connect(select)(BlogEdit);

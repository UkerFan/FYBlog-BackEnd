import React, { Component, PropTypes } from 'react'
import { History, Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable'
import { Tool } from '../Libs/Tool'

import {
  setFilters,
  setToolBar,
  showMessage,
  setConfirmDialog,
  closeConfirmDialog
} from '../Redux/Action/Index'

class TagEdit extends Component {
  constructor() {
    super();
    this.state = {
      toolBar: [{
        type: 'link',
        name: '取消',
        icon: 'iconfont icon-close',
        callBack: '/tags'
      },{
        type: 'action',
        name: '保存',
        icon: 'iconfont icon-check',
        callBack: () => {
          this.props.dispatch(setConfirmDialog({
            title: '确认要保存嘛？',
            confirmCallback: () => {
              this.props.dispatch(closeConfirmDialog());
              this.dataPost();
            }
          }));
        }
      }],
      postData: {
        name: '',
        type: 1
      }
    };
  }
  dataPost() {
    let postData = this.state.postData;
    Tool.get('/token').then(data => {
      postData.token = data.token;
      if (this.props.params.id) {
        postData.id = this.props.params.id;
        Tool.post('/tag/set', postData).then(data => {
          this.props.dispatch(showMessage({
            type: data.code === 0 ? 'success' : 'warn',
            text: data.msg
          }));
          if (data.code === 0) {
            this.props.router.push('/tags');
          }
        }).catch(err => {
          this.props.dispatch(showMessage({
            type: 'danger',
            text: '网络错误，请稍后重试'
          }));
        });
      } else {
        Tool.post('/tag/new', postData).then(data => {
          this.props.dispatch(showMessage({
            type: data.code === 0 ? 'success' : 'warn',
            text: data.msg
          }));
          if (data.code === 0) {
            this.props.router.push('/tags');
          }
        }).catch(err => {
          this.props.dispatch(showMessage({
            type: 'danger',
            text: '网络错误，请稍后重试'
          }));
        });
      }
    }).catch(err => {
      this.props.dispatch(showMessage({
        type: 'danger',
        text: '网络错误，请稍后重试'
      }));
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
      Tool.get('/tag/get/' + this.props.params.id).then(data => {
        this.setState({
          postData: {
            name: data.result.name
          }
        });
      }).catch(err => {
        this.props.dispatch(showMessage({
          type: 'danger',
          text: '网络错误，请稍后重试'
        }));
      });
    }
  }
  render() {
    return (
      <div className={this.props.sideBarStatus ? 'edit-container wide' : 'edit-container'}>
        <div className='input-block'>
          <label>名称</label>
          <input type="text" value={ this.state.postData.name } onChange={event => this.dataChange(event, 'name')} placeholder='输入标签名称'/>
        </div>
      </div>
    );
  }
}

TagEdit.propTypes = {
  sideBarStatus: PropTypes.bool.isRequired
};

function select(state) {
  return {
    sideBarStatus: state.sideBarToggle
  };
}

export default connect(select)(TagEdit);

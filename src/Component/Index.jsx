import React, { Component, PropTypes } from 'react'
import { History, Link } from 'react-router'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable'
import { Tool } from '../Libs/Tool'

import BlogRow from './common/BlogRow'

import {
  changeMenu,
  setFilters,
  setToolBar,
  setIndexScrollPos,
  showMessage,
  setConfirmDialog,
  closeConfirmDialog
} from '../Redux/Action/Index'
import { fetchGets } from '../Redux/Action/Data'


class Main extends Component {
  constructor() {
    super();
    this.state = {
      filters: [{
        index: 0,
        name:'全部',
        on:true,
        callBack: (index) => this.refreshList(index)
      },{
        index: 1,
        name: '未锁',
        key: 'isOff',
        value: false,
        callBack: (index) => this.refreshList(index)
      },{
        index: 2,
        name: '已锁',
        key: 'isOff',
        value: true,
        callBack: (index) => this.refreshList(index)
      }],
      toolBar: [{
        type: 'link',
        name: '新增',
        icon: 'iconfont icon-add',
        callBack: '/blogs/edit'
      },{
        type: 'reducer',
        name: '设置',
        icon: 'iconfont icon-settings',
        callBack: 'toggleSetting'
      }],
      list: []
    };
  }
  deleteBlog(id) {
    this.props.dispatch(setConfirmDialog({
      title: '确认删除？',
      confirmCallback: () => {
        this.props.dispatch(closeConfirmDialog());
        Tool.get('/token').then(data => {
          Tool.post(`/blog/remove/${id}`,{token: data.token}).then(data => {
            this.props.dispatch(showMessage({
              type: data.code === 0 ? 'success' : 'warn',
              text: data.msg
            }));
            if (data.code === 0) {
              this.refreshList();
            }
          }).catch(err => {
            this.props.dispatch(showMessage({
              type: 'danger',
              text: '网络错误，请稍后重试'
            }));
          });
        });
      }
    }));
  }
  refreshList(index) {
    var param = {};
    this.props.currentFilters.forEach((filter, i) => {
      if (filter.index === index && filter.key) {
        param[filter.key.toLowerCase()] = filter.value;
      }
    });
    this.props.dispatch(setIndexScrollPos(document.body.scrollTop));
    this.props.dispatch(fetchGets('/blog/page', param, (list) => {
      this.setState({
        list: list
      });
    }, 'BlogList'));
  }
  componentWillMount() {
    this.props.dispatch(changeMenu(1));
    this.props.dispatch(setFilters(this.state.filters));
    this.props.dispatch(setToolBar(this.state.toolBar));
    this.refreshList();
  }
  componentDidUpdate() {
    document.body.scrollTop = this.props.indexScrollPos;
  }
  componentWillUnmount() {
    this.props.dispatch(setIndexScrollPos(document.body.scrollTop));
  }
  blogPropChange(key, url) {
    this.props.dispatch(setConfirmDialog({
      title: '确认修改属性？',
      confirmCallback: () => {
        this.props.dispatch(closeConfirmDialog());
        Tool.get('/token').then(data => {
          let postData ={
            token: data.token
          };
          Tool.post(url + '/' + key, postData).then(data => {
            this.props.dispatch(showMessage({
              type: data.code === 0 ? 'success' : 'warn',
              text: data.msg
            }));
            if (data.code === 0) {
              this.refreshList();
            }
          }).catch(err => {
            this.props.dispatch(showMessage({
              type: 'danger',
              text: '网络错误，请稍后重试'
            }));
          });
        }).catch(err => {
          this.props.dispatch(showMessage({
            type: 'danger',
            text: '网络错误，请稍后重试'
          }));
        });
      }
    }));
  }
  render() {
    return (
      <div className={this.props.sideBarStatus ? 'blog-container wide' : 'blog-container'}>
        {
          this.state.list.map((blog, index) => {
            return <BlogRow key={blog._id} blog={blog} onDelete={id => this.deleteBlog(id)} settingStatus={this.props.settingStatus} propChange={(key, url) => this.blogPropChange(key, url)}/>
          })
        }
      </div>
    );
  }
}

Main.propTypes = {
  sideBarStatus: PropTypes.bool.isRequired,
  settingStatus: PropTypes.bool.isRequired,
  currentFilters: PropTypes.array.isRequired,
  indexScrollPos: PropTypes.number.isRequired
};

function select(state) {
  return {
    sideBarStatus: state.sideBarToggle,
    settingStatus: state.settingStatus,
    currentFilters: state.currentFilters,
    indexScrollPos: state.indexScrollPos
  };
}

export default connect(select)(Main);

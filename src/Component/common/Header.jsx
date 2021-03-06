import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: ''
    };
  }
  setTitle(menuList) {
    menuList.forEach((menu, index) => {
      if (menu.active) {
        this.setState({
          title: menu.name
        });
        return;
      }
    });
  }
  componentWillMount() {
    this.setTitle(this.props.menuList);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      this.setTitle(nextProps.menuList);
    }
  }
  render() {
    return (
      <header>
        <div className='side-toggle' onClick={this.props.sideBarTigger}>
          <img src={this.props.userInfo.icon} />
          <i className={this.props.sideBarStatus ? 'iconfont icon-more' : 'iconfont icon-more rotate-90'}></i>
        </div>
        <h1>{this.state.title}</h1>
        <ul className='tool-bar'>
          {this.props.toolBar.map((tool, index) => {
            return tool.type === 'reducer' ?
              <li key={index} title={tool.name} onClick={() => this.props.toolAction(tool.callBack)}><i className={tool.icon}></i></li>
              : (tool.type === 'link' ? <Link key={index} to={tool.callBack}><li title={tool.name}><i className={tool.icon}></i></li></Link>
              : <li key={index} title={tool.name} onClick={() => tool.callBack()}><i className={tool.icon}></i></li>);
          })}
        </ul>
      </header>
    );
  }
}

Header.propTypes = {
  sideBarStatus: PropTypes.bool.isRequired,
  sideBarTigger: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
  toolBar: PropTypes.array.isRequired,
  toolAction: PropTypes.func.isRequired
};

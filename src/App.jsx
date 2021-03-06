import React, { Component, PropTypes } from 'react'
import ReactDOM, {render} from 'react-dom'
import {Provider} from 'react-redux'
import route from './Router/Route' //路由配置
import store from './Redux/Store/Store'
import './Libs/Config'//引入默认配置
// 引入样式
import './Styles/index.scss'
import './Styles/blog.scss'
import './Styles/blog-edit.scss'
import './Styles/tag.scss'
import './Styles/file.scss'
import './Styles/comment.scss'
import './Styles/issue.scss'
import './Styles/users.scss'

let unsubscribe = store.subscribe(() => { //监听state变化
    // console.log(store.getState())
});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById('app-root')
);

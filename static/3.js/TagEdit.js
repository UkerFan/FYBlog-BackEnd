webpackJsonp([3],{300:function(t,exports,e){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function r(t){return{sideBarStatus:t.sideBarToggle}}Object.defineProperty(exports,"__esModule",{value:!0});var i=function(){function t(t,e){for(var o=0;o<e.length;o++){var a=e[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(e,o,a){return o&&t(e.prototype,o),a&&t(e,a),e}}(),c=e(1),p=o(c),u=(e(220),e(171)),l=(e(281),e(285)),f=e(287),h=function(t){function e(){a(this,e);var t=n(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.state={toolBar:[{type:"link",name:"取消",icon:"iconfont icon-close",callBack:"/tags"},{type:"action",name:"保存",icon:"iconfont icon-check",callBack:function(){t.props.dispatch((0,f.setConfirmDialog)({title:"确认要保存嘛？",confirmCallback:function(){t.props.dispatch((0,f.closeConfirmDialog)()),t.dataPost()}}))}}],postData:{name:"",type:1}},t}return s(e,t),i(e,[{key:"dataPost",value:function(){var t=this,e=this.state.postData;l.Tool.get("/token").then(function(o){e.token=o.token,t.props.params.id?(e.id=t.props.params.id,l.Tool.post("/tag/set",e).then(function(e){t.props.dispatch((0,f.showMessage)({type:0===e.code?"success":"warn",text:e.msg})),0===e.code&&t.props.router.push("/tags")}).catch(function(e){t.props.dispatch((0,f.showMessage)({type:"danger",text:"网络错误，请稍后重试"}))})):l.Tool.post("/tag/new",e).then(function(e){t.props.dispatch((0,f.showMessage)({type:0===e.code?"success":"warn",text:e.msg})),0===e.code&&t.props.router.push("/tags")}).catch(function(e){t.props.dispatch((0,f.showMessage)({type:"danger",text:"网络错误，请稍后重试"}))})}).catch(function(e){t.props.dispatch((0,f.showMessage)({type:"danger",text:"网络错误，请稍后重试"}))})}},{key:"dataChange",value:function(t,e){var o=this.state.postData;o[e]=t.target.value,this.setState({postData:o})}},{key:"componentWillMount",value:function(){this.props.dispatch((0,f.setFilters)([])),this.props.dispatch((0,f.setToolBar)(this.state.toolBar)),this.initPostData(),document.body.scrollTop=0}},{key:"initPostData",value:function(){var t=this;this.props.params.id&&l.Tool.get("/tag/get/"+this.props.params.id).then(function(e){t.setState({postData:{name:e.result.name}})}).catch(function(e){t.props.dispatch((0,f.showMessage)({type:"danger",text:"网络错误，请稍后重试"}))})}},{key:"render",value:function(){var t=this;return p.default.createElement("div",{className:this.props.sideBarStatus?"edit-container wide":"edit-container"},p.default.createElement("div",{className:"input-block"},p.default.createElement("label",null,"名称"),p.default.createElement("input",{type:"text",value:this.state.postData.name,onChange:function(e){return t.dataChange(e,"name")},placeholder:"输入标签名称"})))}}]),e}(c.Component);h.propTypes={sideBarStatus:c.PropTypes.bool.isRequired},exports.default=(0,u.connect)(r)(h)}});
//# sourceMappingURL=TagEdit.js.map
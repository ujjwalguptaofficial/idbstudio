(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"8UiN":function(t,e,n){t.exports=n("fX0E")},fX0E:function(t,e){
/*!
 * @license :godam - V0.7.1 - 28/08/2021
 * https://github.com/ujjwalguptaofficial/godam
 * Copyright (c) 2021 @Ujjwal Gupta; Licensed ISC
 */
t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="./src/index.ts")}({"./src/abstracts/expression.ts":
/*!*************************************!*\
  !*** ./src/abstracts/expression.ts ***!
  \*************************************/
/*! exports provided: Expression */function(t,e,n){"use strict";n.r(e),n.d(e,"Expression",function(){return o});var r=n(/*! ../decorators */"./src/decorators/index.ts"),o=function(){function t(){}return t.prototype.markComputed=function(t,e){var n=Object.getOwnPropertyDescriptor(this,e)||Object.getOwnPropertyDescriptor(this.__proto__,e);r.Computed.apply(void 0,t)(this,e,n)},t}()},"./src/abstracts/index.ts":
/*!********************************!*\
  !*** ./src/abstracts/index.ts ***!
  \********************************/
/*! exports provided: Task, Mutation, Expression, Room */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./task_list */"./src/abstracts/task_list.ts");n.d(e,"Task",function(){return r.Task});var o=n(/*! ./mutation */"./src/abstracts/mutation.ts");n.d(e,"Mutation",function(){return o.Mutation});var s=n(/*! ./expression */"./src/abstracts/expression.ts");n.d(e,"Expression",function(){return s.Expression});var i=n(/*! ./room */"./src/abstracts/room.ts");n.d(e,"Room",function(){return i.Room})},"./src/abstracts/mutation.ts":
/*!***********************************!*\
  !*** ./src/abstracts/mutation.ts ***!
  \***********************************/
/*! exports provided: Mutation */function(t,e,n){"use strict";n.r(e),n.d(e,"Mutation",function(){return r});var r=function(){return function(){}}()},"./src/abstracts/room.ts":
/*!*******************************!*\
  !*** ./src/abstracts/room.ts ***!
  \*******************************/
/*! exports provided: Room */function(t,e,n){"use strict";n.r(e),n.d(e,"Room",function(){return r});var r=function(){function t(t){this.__private__={},this.__private__.store=t}return t.prototype.__getNameWithRoom__=function(t){return t.includes("@")?t:t+"@"+this.__prefix__},t.prototype.do=function(t,e){return this.__watchBus__.emitSync("do",this.__getNameWithRoom__(t),e)[0]},t.prototype.set=function(t,e){this.__watchBus__.emitSync("commit",this.__getNameWithRoom__(t),e)},t.prototype.get=function(t){return this.__watchBus__.emitSync("get",this.__getNameWithRoom__(t))[0]},t.prototype.eval=function(t,e){return this.__watchBus__.emitSync("eval",this.__getNameWithRoom__(t),e)[0]},t.prototype.__onChange__=function(t,e,n){this.__watchBus__.emit("change",t,e,n),this.__watchBus__.emit(t,e,n)},t.prototype.watch=function(t,e){return this.__watchBus__.on(t,e),this},t.prototype.unwatch=function(t,e){return this.__watchBus__.off(t,e),this},t}()},"./src/abstracts/task_list.ts":
/*!************************************!*\
  !*** ./src/abstracts/task_list.ts ***!
  \************************************/
/*! exports provided: Task */function(t,e,n){"use strict";n.r(e),n.d(e,"Task",function(){return r});var r=function(){function t(){}return t.prototype.set=function(t,e){},t.prototype.eval=function(t,e){},t.prototype.do=function(t,e){},t}()},"./src/decorators/computed.ts":
/*!************************************!*\
  !*** ./src/decorators/computed.ts ***!
  \************************************/
/*! exports provided: Computed */function(t,e,n){"use strict";n.r(e),n.d(e,"Computed",function(){return r});var r=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return function(e,n,r){e.__computed__||(e.__computed__={});var o=r.get;null==o&&(o=function(){return"Computed method should be get only"}),e.__computed__[n]={args:t,fn:o}}}},"./src/decorators/index.ts":
/*!*********************************!*\
  !*** ./src/decorators/index.ts ***!
  \*********************************/
/*! exports provided: Computed */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./computed */"./src/decorators/computed.ts");n.d(e,"Computed",function(){return r.Computed})},"./src/helpers/event_bus.ts":
/*!**********************************!*\
  !*** ./src/helpers/event_bus.ts ***!
  \**********************************/
/*! exports provided: EventBus */function(t,e,n){"use strict";n.r(e),n.d(e,"EventBus",function(){return o});var r=function(t,e){for(var n=0,r=e.length,o=t.length;n<r;n++,o++)t[o]=e[n];return t},o=function(){function t(t){this._events={},this._ctx=t}return t.prototype.on=function(t,e){return null==this._events[t]&&(this._events[t]=[]),this._events[t].push(e),this},t.prototype.off=function(t,e){if(this._events[t])if(e){var n=this._events[t].indexOf(e);this._events[t].splice(n,1)}else this._events[t]=[]},t.prototype.emit=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];var s=this._events[t]||[];return Promise.all(s.map(function(t){var o=t.call.apply(t,r([e._ctx],n));return o&&o.then?o:Promise.resolve(o)}))},t.prototype.emitSync=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return(this._events[t]||[]).map(function(t){return t.call.apply(t,r([e._ctx],n))})},t.prototype.emitLinear=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];var s=this._events[t]||[],i=0,u=s.length,c=[];return new Promise(function(t){var o=function(){i<u?function(){var t=s[i++];if(t){var o=t.call.apply(t,r([e._ctx],n));return o&&o.then?o:Promise.resolve(o)}}().then(function(t){c.push(t),o()}):t(c)};o()})},t.prototype.destroy=function(){this._events=null,this._ctx=null},t}()},"./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/*! exports provided: EventBus, initRoom */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./event_bus */"./src/helpers/event_bus.ts");n.d(e,"EventBus",function(){return r.EventBus});var o=n(/*! ./init_room */"./src/helpers/init_room.ts");n.d(e,"initRoom",function(){return o.initRoom})},"./src/helpers/init_room.ts":
/*!**********************************!*\
  !*** ./src/helpers/init_room.ts ***!
  \**********************************/
/*! exports provided: initRoom */function(t,e,n){"use strict";n.r(e),n.d(e,"initRoom",function(){return s});var r=n(/*! ../utils */"./src/utils/index.ts"),o=n(/*! ./event_bus */"./src/helpers/event_bus.ts");function s(t,e){var n=this;this.__state__="function"==typeof t.state?new t.state:t.state;var s=t.mutations;(s=s?new t.mutations:{}).state=this.__state__,this.__mutation__=s;var i=t.expressions||{};i="function"==typeof i?new t.expressions:i;var u=this.get.bind(this);i.get=u,this.__expression__=i;var c=t.tasks||{};if(this.__task__="function"==typeof c?new c:c,Object.assign(this.__task__,{get:u,set:this.set.bind(this),eval:this.eval.bind(this),do:this.do}),this.__watchBus__=new o.EventBus(this),e&&e(),this.__computed__={},!1!==t.track){var a=this.__expression__,_=a.__computed__;this.__ob__=new r.Observer(this.__onChange__.bind(this));var f=this.__state__;if(this.__ob__.create(f),_){var h=function(t){var e=_[t];p.__computed__[t]=e.fn.call(a),e.args.forEach(function(o){var s=[o];Object(r.isArray)(f[o])&&(s=s.concat(["push","pop","splice"].map(function(t){return o+"."+t}))),s.forEach(function(r){n.watch(r,function(){n.__computed__[t]=e.fn.call(a)})})})},p=this;for(var l in _)h(l);new r.Observer(function(t,e,r){n.__onChange__.call(n,"expression."+t,e,r)}).create(this.__computed__)}}}},"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Godam, Task, Mutation, Expression, Room, Computed, isArray, isObject, getObjectLength, getNameAndModule, Observer */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./store */"./src/store.ts");n.d(e,"Godam",function(){return r.Godam});var o=n(/*! ./abstracts */"./src/abstracts/index.ts");n.d(e,"Task",function(){return o.Task}),n.d(e,"Mutation",function(){return o.Mutation}),n.d(e,"Expression",function(){return o.Expression}),n.d(e,"Room",function(){return o.Room});var s=n(/*! ./decorators */"./src/decorators/index.ts");n.d(e,"Computed",function(){return s.Computed});var i=n(/*! ./utils */"./src/utils/index.ts");n.d(e,"isArray",function(){return i.isArray}),n.d(e,"isObject",function(){return i.isObject}),n.d(e,"getObjectLength",function(){return i.getObjectLength}),n.d(e,"getNameAndModule",function(){return i.getNameAndModule}),n.d(e,"Observer",function(){return i.Observer})},"./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/*! exports provided: Godam */function(t,e,n){"use strict";n.r(e),n.d(e,"Godam",function(){return s});var r=n(/*! ./helpers */"./src/helpers/index.ts"),o=n(/*! ./utils */"./src/utils/index.ts"),s=function(){function t(e,n){var o=this;null==this.track&&(this.track=t.track),r.initRoom.call(this,e),n="function"==typeof(n=n||{})?new n:n,this.rooms=n;var s=function(t){var e=n[t];e.__prefix__=t,r.initRoom.call(e,e.__private__.store,function(){e.__watchBus__.on("do",function(t,e){return o.do(t,e)}).on("commit",function(t,e){return o.set(t,e)}).on("eval",function(t,e){return o.eval(t,e)}).on("get",function(t,e){return o.get(t,e)}).on("change",function(e,n,r){return o.__onChange__(e+"@"+t,n,r)})})};for(var i in n)s(i)}return t.prototype.do=function(t,e){var n=Object(o.getNameAndModule)(t),r=n.name,s=n.moduleName,i=this.__getCtx__("__task__",s)||{},u=i[r];if(!u)throw("No task exist with name "+r+" "+(s?"& module "+s:"")).trim();return u.call(i,e)},t.prototype.set=function(t,e){var n=Object(o.getNameAndModule)(t),r=n.name,s=n.moduleName,i=this.__getCtx__("__mutation__",s)||{},u=i[r];if(!u)throw("No mutation exist with name "+r+" "+(s?"& module "+s:"")).trim();u.call(i,e)},t.prototype.get=function(t,e){if(!e){var n=Object(o.getNameAndModule)(t);t=n.name,e=n.moduleName}var r=this.__getCtx__("__state__",e);return t in r?r[t]:console.error("No state exist with name "+t+" "+(e?"":"& module "+e))},t.prototype.eval=function(t,e){var n=Object(o.getNameAndModule)(t),r=n.name,s=n.moduleName,i=this.__getRoom__(s),u=i.__expression__;if(r in u){var c=i.__computed__[r]||u[r];return c&&c.call?c.call(u,e):c}throw"No expression exist with name "+r+" "+(s?"":"& module "+s)},t.prototype.on=function(t,e){return this.__watchBus__.on(t,e),this},t.prototype.off=function(t,e){return this.__watchBus__.off(t,e),this},t.prototype.watch=function(t,e){return this.on(t,e)},t.prototype.unwatch=function(t,e){return this.off(t,e)},t.prototype.__onChange__=function(t,e,n){this.__watchBus__.emit(t,e,n),this.__watchBus__.emit("change",t,e,n)},t.prototype.__getRoom__=function(t){var e=t&&"root"!==t?this.rooms[t]:this;if(null==e)throw new Error("no room found - "+t);return e},t.prototype.__getCtx__=function(t,e){return this.__getRoom__(e)[t]},t.track=!0,t}()},"./src/utils/get_name_and_module.ts":
/*!******************************************!*\
  !*** ./src/utils/get_name_and_module.ts ***!
  \******************************************/
/*! exports provided: getNameAndModule */function(t,e,n){"use strict";n.r(e),n.d(e,"getNameAndModule",function(){return r});var r=function(t){var e=t.split("@");return{name:e[0],moduleName:e[1]}}},"./src/utils/get_object_length.ts":
/*!****************************************!*\
  !*** ./src/utils/get_object_length.ts ***!
  \****************************************/
/*! exports provided: getObjectLength */function(t,e,n){"use strict";n.r(e),n.d(e,"getObjectLength",function(){return r});var r=function(t){return t.length||Object.keys(t).length}},"./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: isArray, isObject, getObjectLength, getNameAndModule, Observer */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./is_array */"./src/utils/is_array.ts");n.d(e,"isArray",function(){return r.isArray});var o=n(/*! ./is_object */"./src/utils/is_object.ts");n.d(e,"isObject",function(){return o.isObject});var s=n(/*! ./get_object_length */"./src/utils/get_object_length.ts");n.d(e,"getObjectLength",function(){return s.getObjectLength});var i=n(/*! ./get_name_and_module */"./src/utils/get_name_and_module.ts");n.d(e,"getNameAndModule",function(){return i.getNameAndModule});var u=n(/*! ./observer */"./src/utils/observer.ts");n.d(e,"Observer",function(){return u.Observer})},"./src/utils/is_array.ts":
/*!*******************************!*\
  !*** ./src/utils/is_array.ts ***!
  \*******************************/
/*! exports provided: isArray */function(t,e,n){"use strict";function r(t){return Array.isArray(t)}n.r(e),n.d(e,"isArray",function(){return r})},"./src/utils/is_object.ts":
/*!********************************!*\
  !*** ./src/utils/is_object.ts ***!
  \********************************/
/*! exports provided: isObject */function(t,e,n){"use strict";function r(t){return null!=t&&"object"==typeof t}n.r(e),n.d(e,"isObject",function(){return r})},"./src/utils/observer.ts":
/*!*******************************!*\
  !*** ./src/utils/observer.ts ***!
  \*******************************/
/*! exports provided: Observer */function(t,e,n){"use strict";n.r(e),n.d(e,"Observer",function(){return i});var r=n(/*! ./get_object_length */"./src/utils/get_object_length.ts"),o=n(/*! ./is_object */"./src/utils/is_object.ts"),s=n(/*! ./is_array */"./src/utils/is_array.ts"),i=function(){function t(t){this.onChange=t}return t.prototype.create=function(t,e,n){var i=this;void 0===n&&(n="");var u={},c=this.onChange;Object(s.isArray)(t)?(e=e||["push","splice","pop"]).forEach(function(e){u[e]=i[e],Object.defineProperty(t,e,{value:function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o=Array.prototype[e].apply(this,t);return c(n+e,function(){switch(e){case"push":return{value:t[0],key:o-1,length:o};default:return t}}()),o}})}):((e=e||Object.keys(t)).forEach(function(e){u[e]=t[e];var r=function(){Object(o.isObject)(t[e])&&i.create(t[e],null,""+n+e+".")};Object.defineProperty(t,e,{set:function(t){var o=u[e];o!==t&&(u[e]=t,c(n+e,t,o),r())},get:function(){return u[e]}}),r()}),Object.defineProperty(t,"push",{enumerable:!1,value:function(t,e){this[e]=t;var o=Object(r.getObjectLength)(this);return c(n+"push",{value:t,key:e,length:o}),o}}),Object.defineProperty(t,"splice",{enumerable:!1,value:function(t,e){c(n+"splice",[t,e])}}),Object.defineProperty(t,"update",{enumerable:!1,value:function(t,e){this[t]=e,c(n+"update",[t,e])}}))},t.prototype.destroy=function(){this.onChange=null},t}()}})}}]);
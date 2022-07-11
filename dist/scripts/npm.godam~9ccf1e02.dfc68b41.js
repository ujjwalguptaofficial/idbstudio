(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"8UiN":function(t,e,n){t.exports=n("fX0E")},fX0E:function(t,e){
/*!
 * @license :godam - V1.0.4 - 08/01/2022
 * https://github.com/ujjwalguptaofficial/godam
 * Copyright (c) 2022 @Ujjwal Gupta; Licensed ISC
 */
t.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s="./src/index.ts")}({"./node_modules/just-clone/index.mjs":
/*!*******************************************!*\
  !*** ./node_modules/just-clone/index.mjs ***!
  \*******************************************/
/*! exports provided: default */function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return r});var r=function t(e){if("function"==typeof e)return e;var n=Array.isArray(e)?[]:{};for(var r in e){var i=e[r],s={}.toString.call(i).slice(8,-1);n[r]="Array"==s||"Object"==s?t(i):"Date"==s?new Date(i.getTime()):"RegExp"==s?RegExp(i.source,o(i)):i}return n};function o(t){if("string"==typeof t.source.flags)return t.source.flags;var e=[];return t.global&&e.push("g"),t.ignoreCase&&e.push("i"),t.multiline&&e.push("m"),t.sticky&&e.push("y"),t.unicode&&e.push("u"),e.join("")}},"./src/abstracts/expression.ts":
/*!*************************************!*\
  !*** ./src/abstracts/expression.ts ***!
  \*************************************/
/*! exports provided: Expression */function(t,e,n){"use strict";n.r(e),n.d(e,"Expression",function(){return o});var r=n(/*! ../decorators */"./src/decorators/index.ts"),o=function(){function t(){}return t.prototype.markComputed=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var o=Object.getOwnPropertyDescriptor(this,t)||Object.getOwnPropertyDescriptor(this.__proto__,t);r.Computed.apply(void 0,e)(this,t,o)},t}()},"./src/abstracts/index.ts":
/*!********************************!*\
  !*** ./src/abstracts/index.ts ***!
  \********************************/
/*! exports provided: Task, Mutation, Expression, Room */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./task_list */"./src/abstracts/task_list.ts");n.d(e,"Task",function(){return r.Task});var o=n(/*! ./mutation */"./src/abstracts/mutation.ts");n.d(e,"Mutation",function(){return o.Mutation});var i=n(/*! ./expression */"./src/abstracts/expression.ts");n.d(e,"Expression",function(){return i.Expression});var s=n(/*! ./room */"./src/abstracts/room.ts");n.d(e,"Room",function(){return s.Room})},"./src/abstracts/mutation.ts":
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
/*! exports provided: EventBus */function(t,e,n){"use strict";n.r(e),n.d(e,"EventBus",function(){return o});var r=function(t,e){for(var n=0,r=e.length,o=t.length;n<r;n++,o++)t[o]=e[n];return t},o=function(){function t(t){this._events={},this._ctx=t}return t.prototype.on=function(t,e){return null==this._events[t]&&(this._events[t]=[]),this._events[t].push(e),this},t.prototype.once=function(t,e){var n=this,r=function(){for(var o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];e.apply(void 0,o),n.off(t,r)};return this.on(t,r),this},t.prototype.off=function(t,e){if(this._events[t])if(e){var n=this._events[t].indexOf(e);this._events[t].splice(n,1)}else this._events[t]=[]},t.prototype.emit=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];var i=this._events[t]||[];return Promise.all(i.map(function(t){var o=t.call.apply(t,r([e._ctx],n));return o&&o.then?o:Promise.resolve(o)}))},t.prototype.emitSync=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return(this._events[t]||[]).map(function(t){return t.call.apply(t,r([e._ctx],n))})},t.prototype.emitLinear=function(t){for(var e=this,n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];var i=this._events[t]||[],s=0,u=i.length,c=[];return new Promise(function(t){var o=function(){s<u?function(){var t=i[s++];if(t){var o=t.call.apply(t,r([e._ctx],n));return o&&o.then?o:Promise.resolve(o)}}().then(function(t){c.push(t),o()}):t(c)};o()})},t.prototype.destroy=function(){this._events=null,this._ctx=null},t}()},"./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/*! exports provided: EventBus, initRoom */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./event_bus */"./src/helpers/event_bus.ts");n.d(e,"EventBus",function(){return r.EventBus});var o=n(/*! ./init_room */"./src/helpers/init_room.ts");n.d(e,"initRoom",function(){return o.initRoom})},"./src/helpers/init_room.ts":
/*!**********************************!*\
  !*** ./src/helpers/init_room.ts ***!
  \**********************************/
/*! exports provided: initRoom */function(t,e,n){"use strict";n.r(e),n.d(e,"initRoom",function(){return i});var r=n(/*! ../utils */"./src/utils/index.ts"),o=n(/*! ./event_bus */"./src/helpers/event_bus.ts");function i(t,e){var n=this;this.__state__="function"==typeof t.state?new t.state:t.state;var i=t.mutation;(i=i?new t.mutation:{}).state=this.__state__,this.__mutation__=i;var s=t.expression||{};s="function"==typeof s?new t.expression:s;var u=this.get.bind(this);s.get=u,this.__expression__=s;var c=t.task||{};if(this.__task__="function"==typeof c?new c:c,Object.assign(this.__task__,{get:u,set:this.set.bind(this),eval:this.eval.bind(this),do:this.do}),this.__watchBus__=new o.EventBus(this),e&&e(),this.__computed__={},!1!==t.track){var a=this.__expression__,_=a.__computed__;this.__ob__=new r.Observer(this.__onChange__.bind(this));var f=this.__state__;if(this.__ob__.create(f),_){var l=function(t){var e=_[t],o=function(){r.Observer.shouldRegisterChild=!1,n.__computed__[t]=e.fn.call(a),r.Observer.shouldRegisterChild=!0};o(),e.args.forEach(function(t){var e=[t];Object(r.isArray)(f[t])&&(e=e.concat(["push","pop","splice"].map(function(e){return t+"."+e}))),e.forEach(function(t){n.watch(t,o)})})};for(var h in _)l(h);new r.Observer(function(t,e,r){n.__onChange__.call(n,"expression."+t,e,r)}).create(this.__computed__)}}}},"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Godam, Task, Mutation, Expression, Room, Computed, isArray, isObject, getObjectLength, getNameAndModule, Observer, clone */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./store */"./src/store.ts");n.d(e,"Godam",function(){return r.Godam});var o=n(/*! ./abstracts */"./src/abstracts/index.ts");n.d(e,"Task",function(){return o.Task}),n.d(e,"Mutation",function(){return o.Mutation}),n.d(e,"Expression",function(){return o.Expression}),n.d(e,"Room",function(){return o.Room});var i=n(/*! ./decorators */"./src/decorators/index.ts");n.d(e,"Computed",function(){return i.Computed});var s=n(/*! ./utils */"./src/utils/index.ts");n.d(e,"isArray",function(){return s.isArray}),n.d(e,"isObject",function(){return s.isObject}),n.d(e,"getObjectLength",function(){return s.getObjectLength}),n.d(e,"getNameAndModule",function(){return s.getNameAndModule}),n.d(e,"Observer",function(){return s.Observer}),n.d(e,"clone",function(){return s.clone})},"./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/*! exports provided: Godam */function(t,e,n){"use strict";n.r(e),n.d(e,"Godam",function(){return i});var r=n(/*! ./helpers */"./src/helpers/index.ts"),o=n(/*! ./utils */"./src/utils/index.ts"),i=function(){function t(e,n){var o=this;this.shouldCallExpression=!0,null==this.track&&(this.track=t.track),r.initRoom.call(this,e),n="function"==typeof(n=n||{})?new n:n,this.rooms=n;var i=function(t){var e=n[t];e.__prefix__=t,r.initRoom.call(e,e.__private__.store,function(){e.__watchBus__.on("do",function(t,e){return o.do(t,e)}).on("commit",function(t,e){return o.set(t,e)}).on("eval",function(t,e){return o.eval(t,e)}).on("get",function(t,e){return o.get(t,e)}).on("change",function(e,n,r){return o.__onChange__(e+"@"+t,n,r)})})};for(var s in n)i(s)}return t.prototype.do=function(t,e){var n=Object(o.getNameAndModule)(t),r=n.name,i=n.moduleName,s=this.__getCtx__("__task__",i)||{},u=s[r];if(!u)throw("No task exist with name "+r+" "+(i?"& module "+i:"")).trim();return u.call(s,Object(o.clone)(e))},t.prototype.set=function(t,e){var n=Object(o.getNameAndModule)(t),r=n.name,i=n.moduleName,s=this.__getCtx__("__mutation__",i)||{},u=s[r];if(!u)throw("No mutation exist with name "+r+" "+(i?"& module "+i:"")).trim();u.call(s,Object(o.clone)(e))},t.prototype.get=function(t,e){if(!e){var n=Object(o.getNameAndModule)(t);t=n.name,e=n.moduleName}var r=this.__getCtx__("__state__",e);return t in r?r[t]:console.error("No state exist with name "+t+" "+(e?"":"& module "+e))},t.prototype.eval=function(t,e){var n=Object(o.getNameAndModule)(t),r=n.name,i=n.moduleName,s=this.__getRoom__(i),u=s.__expression__;if(r in u){var c=s.__computed__[r]||u[r];return c&&c.call?this.shouldCallExpression?c.call(u,Object(o.clone)(e)):c.bind(u):c}throw("No expression exist with name "+r+" "+(i?"& module "+i:"")).trim()},t.prototype.on=function(t,e){return this.__watchBus__.on(t,e),this},t.prototype.off=function(t,e){return this.__watchBus__.off(t,e),this},t.prototype.watch=function(t,e){return this.on(t,e)},t.prototype.unwatch=function(t,e){return this.off(t,e)},t.prototype.__onChange__=function(t,e,n){this.__watchBus__.emit(t,e,n),this.__watchBus__.emit("change",t,e,n)},t.prototype.__getRoom__=function(t){var e=t&&"root"!==t?this.rooms[t]:this;if(null==e)throw new Error("no room found - "+t);return e},t.prototype.__getCtx__=function(t,e){return this.__getRoom__(e)[t]},t.track=!0,t}()},"./src/utils/clone.ts":
/*!****************************!*\
  !*** ./src/utils/clone.ts ***!
  \****************************/
/*! exports provided: clone */function(t,e,n){"use strict";n.r(e),n.d(e,"clone",function(){return o});var r=n(/*! just-clone */"./node_modules/just-clone/index.mjs"),o=function(t){return"object"==typeof t?Object(r.default)(t):t}},"./src/utils/get_name_and_module.ts":
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
/*! exports provided: isArray, isObject, getObjectLength, getNameAndModule, Observer, clone */function(t,e,n){"use strict";n.r(e);var r=n(/*! ./is_array */"./src/utils/is_array.ts");n.d(e,"isArray",function(){return r.isArray});var o=n(/*! ./is_object */"./src/utils/is_object.ts");n.d(e,"isObject",function(){return o.isObject});var i=n(/*! ./get_object_length */"./src/utils/get_object_length.ts");n.d(e,"getObjectLength",function(){return i.getObjectLength});var s=n(/*! ./get_name_and_module */"./src/utils/get_name_and_module.ts");n.d(e,"getNameAndModule",function(){return s.getNameAndModule});var u=n(/*! ./observer */"./src/utils/observer.ts");n.d(e,"Observer",function(){return u.Observer});var c=n(/*! ./clone */"./src/utils/clone.ts");n.d(e,"clone",function(){return c.clone})},"./src/utils/is_array.ts":
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
/*! exports provided: Observer */function(t,e,n){"use strict";n.r(e),n.d(e,"Observer",function(){return s});var r=n(/*! ./get_object_length */"./src/utils/get_object_length.ts"),o=n(/*! ./is_object */"./src/utils/is_object.ts"),i=n(/*! ./is_array */"./src/utils/is_array.ts"),s=function(){function t(t){this.onChange=t}return t.prototype.create=function(e,n,s){var u=this;void 0===s&&(s="");var c={},a=this.onChange;Object(i.isArray)(e)?(n=n||["push","splice","pop"]).forEach(function(t){c[t]=u[t],Object.defineProperty(e,t,{value:function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var r=Array.prototype[t].apply(this,e);return a(s+t,function(){switch(t){case"push":return{value:e[0],key:r-1,length:r};default:return e}}()),r}})}):((n=n||Object.keys(e)).forEach(function(n){c[n]=e[n];var r=function(){Object(o.isObject)(e[n])&&u.create(e[n],null,""+s+n+".")};Object.defineProperty(e,n,{set:function(e){var o=c[n];o!==e&&(c[n]=e,a(s+n,e,o),t.shouldRegisterChild&&r())},get:function(){return c[n]}}),r()}),Object.defineProperty(e,"push",{enumerable:!1,value:function(t,e){this[e]=t;var n=Object(r.getObjectLength)(this);return a(s+"push",{value:t,key:e,length:n}),n}}),Object.defineProperty(e,"splice",{enumerable:!1,value:function(t,e){a(s+"splice",[t,e])}}),Object.defineProperty(e,"update",{enumerable:!1,value:function(t,e){this[t]=e,a(s+"update",[t,e])}}))},t.prototype.destroy=function(){this.onChange=null},t.shouldRegisterChild=!0,t}()}})}}]);
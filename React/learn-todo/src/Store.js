import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as todoReducer} from './todos';
import {reducer as filterReducer} from './filter';

// 合并多个 reducer 函数
// 当返回的这个新的 reducer 函数被执行，会把传入的 state 对象拆开处理：
// todoReducer 的 state 是 allState（假设时所有的）.todos
// == 这样，一个状态节点只属于一个模块
const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

// 添加插件
const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  // 没有default()会报错
  middlewares.push(require('redux-immutable-state-invariant').default());
}

// 第三个参数用于扩展，加入redux支持
export default createStore(reducer, {}, composeWithDevTools(
  applyMiddleware(...middlewares),
));
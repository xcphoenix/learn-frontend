import {createStore, combineReducers} from 'redux';

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

export default createStore(reducer);
import React from "react";
// import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import { FilterTypes } from "../../constant";
import { removeTodo, toggleTodo } from "../action";
import { connect } from "react-redux";
import TodoItem from "./todoItem";
import { createSelector } from "reselect";

// 解构赋值+箭头函数
const TodoList = ({ todos }) => {
  return (
    <ul className={"todo-list"}>
      {
        // 里面时候直接返回
        todos.map((item) => (
          <TodoItem
            /* 对于动态数量的子组件，每个子组件必须带上一个key属性，且能唯一标识这个子组件的值 */
            /* React 对于动态数量的组件的渲染而言，会直接按照顺序比较，如果只是在组件之间插入了新的组件，很可能会
             * 导致大部分甚至所有的组件被重新渲染，即使有些组件并没有发生变化；这就需要通过 key 来为每个组件标识唯一的身份，
             * 从而判断出哪些组件需要加载、卸载、和重新渲染
             */
            id={item.id}
            key={item.id}
            text={item.text}
            completed={item.completed}
            // onToggle={() => onToggleTodo(item.id)}
            // onRemove={() => onRemoveTodo(item.id)}
          />
        ))
      }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

// 使用 reselect 来对第一层数据做缓存，避免在 state.todos state.filter 不变的情况下任然更新 props

const getFilter = (state) => state.filter;
const getTodos = (state) => state.todos;

const selectVisibleTodos = createSelector (
  // 第一个参数是函数数组，每个元素代表选择器步骤一需要做的映射计算，每个函数运算要尽量简单快捷
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case FilterTypes.ALL:
        return todos;
      case FilterTypes.COMPLETED:
        return todos.filter((item) => item.completed);
      case FilterTypes.UNCOMPLETED:
        return todos.filter((item) => !item.completed);
      default:
        throw new Error("unsupported filter");
    }
  }
);

const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state),
  };
};

// 存在重复代码
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id));
    },
  };
};

// 很多 mapDispatchToProps 只是把 action 构造函数与 prop 关联起来，所以以 prop 名为字段名，action 构造函数为对应字段值
// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   onToggleTodo: toggleTodo,
//   onRemoveTodo: removeTodo
// }, dispatch);

// 或者直接映射 props -> action
// const mapDispatchToProps = {
//   onToggleTodo: toggleTodo,
//   onRemoveTodo: removeTodo
// };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

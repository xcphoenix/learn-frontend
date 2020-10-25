import React from "react";
// import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {FilterTypes} from "../../constant";
import {removeTodo, toggleTodo} from "../action";
import {connect} from "react-redux";
import TodoItem from "./todoItem"

// 解构赋值+箭头函数
const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
  return (
    <ul className={"todo-list"}>
      {
        // 里面时候直接返回
        todos.map((item) => (
          <TodoItem
            /* 对于动态数量的子组件，每个子组件必须带上一个key属性，且能唯一标识这个子组件的值 */
            key={item.id}
            text={item.text}
            completed={item.completed}
            onToggle={() => onToggleTodo(item.id)}
            onRemove={() => onRemoveTodo(item.id)}
          />
        ))
      }
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

const selectVisibleTodos = (todos, filter) => {
  switch (filter) {
    case FilterTypes.ALL:
      return todos;
    case FilterTypes.COMPLETED:
      return todos.filter(item => item.completed);
    case FilterTypes.UNCOMPLETED:
      return todos.filter(item => !item.completed);
    default:
      throw new Error('unsupported filter');
  }
}

const mapStateToProps = (state) => {
  return {
    todos: selectVisibleTodos(state.todos, state.filter)
  }
};

// 存在重复代码
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    onRemoveTodo: (id) => {
      dispatch(removeTodo(id));
    }
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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeTodo, toggleTodo } from "../action";

class TodoItem extends Component {
  // 没有变化不更新组件
  // shouldComponentUpdate(nextProps, _nextState) {
  //   return (
  //     nextProps.completed !== this.props.completed ||
  //     nextProps.text !== this.props.text
  //   );
  // }

  render() {
    return (
      <li
        className={"todo-item"}
        style={{
          textDecoration: this.props.completed ? "line-through" : "none",
        }}
      >
        <input
          className={"toggle"}
          type={"checkbox"}
          checked={this.props.completed ? "checked" : ""}
          readOnly
          onClick={this.props.onToggle}
        />
        <label className={"text"}>{this.props.text}</label>
        <button className={"remove"} onClick={this.props.onRemove}>
          -
        </button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {id} = ownProps;
  return {
    onToggle: () => dispatch(toggleTodo(id)),
    onRemove: () => dispatch(removeTodo(id))
  };
};

// export default TodoItem;
// 使用 react-redux 产生的无名组件的 shouldComponentUpdate，浅层比较(===) props是否更新
// 而 onToggle、onRemove每次会产生一个匿名函数，每次===都不同，所以每次都会重新渲染组件
export default connect(null, mapDispatchToProps)(TodoItem);

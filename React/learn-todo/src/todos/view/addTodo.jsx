import React, {Component} from "react";
import PropTypes from "prop-types";
import {addTodo} from "../action";
import {connect} from "react-redux";

class AddTodo extends Component {

  constructor(props, content) {
    super(props, content);

    this.refInput = this.refInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  refInput(node) {
    // 获取dom元素
    this.input = node;
  }

  onSubmit(ev) {
    // 取消浏览器的默认行为
    ev.preventDefault();

    const input = this.input;
    if (!input.value.trim()) {
      return ;
    }
    this.props.onAdd(input.value);
    input.value = '';
  }

  render() {
    return (
      <div className={"add-todo"}>
        <form onSubmit={this.onSubmit}>
          <input className={"new-todo"} ref={this.refInput}/>
          <button className={'add-on'} type={"submit"}>
            添加
          </button>
        </form>
      </div>
    );
  }

}

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text));
    }
  }
};

export default connect(null, mapDispatchToProps)(AddTodo);
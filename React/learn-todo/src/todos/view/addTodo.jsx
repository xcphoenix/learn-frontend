import React, {Component} from "react";
import PropTypes from "prop-types";
import {addTodo} from "../action";
import {connect} from "react-redux";

class AddTodo extends Component {

  constructor(props, content) {
    super(props, content);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      value: ''
    };
  }

  onInputChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onSubmit(ev) {
    // 取消浏览器的默认行为
    ev.preventDefault();

    const inputValue = this.state.value;
    if (!inputValue.trim()) {
      return ;
    }
    this.props.onAdd(inputValue);
    this.setState({value: ''});
  }

  render() {
    return (
      <div className={"add-todo"}>
        <form onSubmit={this.onSubmit}>
          <input className={"new-todo"} onChange={this.onInputChange} value={this.state.value}/>
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
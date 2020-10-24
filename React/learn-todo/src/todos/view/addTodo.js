import React, {Component} from "react";

class AddTodo extends Component {

  constructor(props, content) {
    super(props, content);

    this.refInput = this.refInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  refInput(node) {
    this.input = node;
  }

  onSubmit(ev) {
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
  onAdd: PropTypes
}

export default AddTodo;
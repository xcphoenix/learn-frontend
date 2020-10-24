import React, {Component} from 'react';
import PropTypes from 'prop-types';
import store from "../Store";
import * as Actions from "../Actions"

class Counter extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClickDecrement = this.onClickDecrement.bind(this);
        this.onClickIncrement = this.onClickIncrement.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState() {
        return {
            value: store.getState()[this.props.caption],
        }
    }

    onClickIncrement() {
        store.dispatch(Actions.increment(this.props.caption));
    }

    onClickDecrement() {
        store.dispatch(Actions.decrement(this.props.caption));
    }

    // 事件处理
    componentDidMount() {
        this.unsubscribe = store.subscribe(this.onChange);
    }

    // 现在通过 subscribe 返回的对象来取消订阅
    componentWillUnmount() {
        this.unsubscribe();
    }

    onChange() {
        const newState = this.getOwnState();
        this.setState({...newState});
    }

    render() {
        const value = this.state.value;
        const {caption} = this.props;
        const style = {
            margin: '10px'
        }
        return (
            <div>
                <button style={style} onClick={this.onClickIncrement}>+</button>
                <button style={style} onClick={this.onClickDecrement}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       -</button>
                <span>{caption} count: {value}</span>
            </div>
        );
    }

}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
}

export default Counter;
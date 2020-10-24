import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CounterStore from "./store/CounterStore";
import * as Actions from "./Actions"

class Counter extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClickDecrement = this.onClickDecrement.bind(this);
        this.onClickIncrement = this.onClickIncrement.bind(this);

        this.state = {
            count: CounterStore.getCounterValues()[props.caption],
        }
    }

    onClickIncrement() {
        Actions.increment(this.props.caption);
    }

    onClickDecrement() {
        Actions.decrement(this.props.caption);
    }

    // 事件处理
    componentDidMount() {
        CounterStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        CounterStore.removeChangeListener(this.onChange);
    }

    onChange() {
        const newCount = CounterStore.getCounterValues()[this.props.caption];
        this.setState({count: newCount});
    }

    render() {
        console.log('enter counter render')
        const {caption} = this.props;
        const style = {
            margin: '10px'
        }
        return (
            <div>
                <button style={style} onClick={this.onClickIncrement}>+</button>
                <button style={style} onClick={this.onClickDecrement}>-</button>
                <span>{caption} count: {this.state.count}</span>
            </div>
        );
    }

}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
}

export default Counter;
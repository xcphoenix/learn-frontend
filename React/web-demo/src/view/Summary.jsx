import React, {Component} from "react";
import store from "../Store";

class Summary extends Component{

    constructor(props) {
        super(props);

        this.updateSum = this.updateSum.bind(this);
        this.state = this.getOwnState();
    }

    getOwnState() {
        const state = store.getState();
        console.log(state);
        let sum = 0;
        for (const key in state) {
            // 如果你只要考虑对象本身的属性，而不是它的原型，那么使用 getOwnPropertyNames()
            // 或执行 hasOwnProperty() 来确定某属性是否是对象本身的属性
            if (state.hasOwnProperty(key)) {
                sum += state[key];
            }
        }
        return {sum: sum};
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(this.updateSum);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    updateSum() {
        const newState = this.getOwnState();
        this.setState({...newState});
    }

    render() {
        return (
            <div>
                Total Count: {this.state.sum}
            </div>
        )
    }

}

export default Summary;
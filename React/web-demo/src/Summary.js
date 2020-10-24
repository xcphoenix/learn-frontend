import React, {Component} from "react";
import CounterStore from "./store/CounterStore";
import SummaryStore from "./store/SummaryStore";

class Summary extends Component{

    constructor(props) {
        super(props);

        this.updateSum = this.updateSum.bind(this);
        this.state = {
            total: SummaryStore.getSummary(),
        }
    }

    componentDidMount() {
        CounterStore.addChangeListener(this.updateSum);
    }

    componentWillUnmount() {
        CounterStore.removeChangeListener(this.updateSum);
    }

    updateSum() {
        const newSum = SummaryStore.getSummary();
        this.setState({total: newSum});
    }

    render() {
        return (
            <div>
                Total Count: {this.state.total}
            </div>
        )
    }

}

export default Summary;
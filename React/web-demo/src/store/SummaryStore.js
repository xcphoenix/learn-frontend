import {EventEmitter} from "events";
import CounterStore from "./CounterStore";
import AppDispatcher from "../AppDispatcher";
import * as ActionTypes from '../ActionTypes'

function computeSummary(counterValues) {
    let summary = 0;
    for (const key in counterValues) {
        if (counterValues.hasOwnProperty(key)) {
            summary += counterValues[key];
        }
    }
    return summary;
}

const SummaryStore = Object.assign({}, EventEmitter.prototype, {
    getSummary: function () {
        return computeSummary(CounterStore.getCounterValues());
    },
})

SummaryStore.dispatcherToken = AppDispatcher.register((action) => {
    if ((action.type === ActionTypes.INCREMENT) ||
        (action.type === ActionTypes.DECREMENT)) {
        // 先处理 dispatchToken 代表的回调函数
        AppDispatcher.waitFor([CounterStore.dispatchToken]);
        // TODO ???
        CounterStore.emitChange();
    }
});

export default SummaryStore;
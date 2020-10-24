import { EventEmitter } from 'events';
import AppDispatcher from "../AppDispatcher";
import * as ActionTypes from '../ActionTypes'

const CHANGE_EVENT = 'changed';

const counterValues = {
    'First': 0,
    'Second': 10,
    'Third': 30
};

const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCounterValues: function () {
        return counterValues;
    },
    // 广播事件
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// 将 Store 注册到 Dispatcher 实例上
// 返回一个 token ，用于 Store 之间的同步
CounterStore.dispatchToken = AppDispatcher.register((action) => {
    if (action.type === ActionTypes.INCREMENT) {
        counterValues[action.counterCaption] ++;
        CounterStore.emitChange();
    } else if (action.type === ActionTypes.DECREMENT) {
        counterValues[action.counterCaption] --;
        CounterStore.emitChange();
    }
});

export default CounterStore;
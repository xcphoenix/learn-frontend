import * as ActionTypes from './ActionTypes'

export const increment = (counterCaption) => {
    // 返回一个Action对象
    return {
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
    };
}

export const decrement = (counterCaption) => {
    return {
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
    }
}
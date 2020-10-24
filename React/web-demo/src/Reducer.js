import * as ActionTypes from './ActionTypes'

// 只去关心如何更新 state，而不管 state 怎么存
// reducer应该是纯函数，不能有副作用，故而不能去修改 state
export default (state, action) => {
    const {counterCaption} = action;

    switch (action.type) {
        case ActionTypes.INCREMENT:
            return {
                ...state,
                // 计算属性，从counterCaption这个变量中获取属性
                // 如果 counterCaption = 'hello' 那么 obj['hello'] = state['hello'] + 1
                [counterCaption]: state[counterCaption] + 1
            };

        case ActionTypes.DECREMENT:
            return {
                ...state,
                [counterCaption]: state[counterCaption] - 1
            };

        default:
            return state;
    }
}
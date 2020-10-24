import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO} from './actionTypes';

// 函数默认参数允许在没有值或undefined被传入时使用默认形参。
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ];
    }
    case TOGGLE_TODO: {
      return state.map((todoItem) => {
        if (todoItem.id === action.id) {
          // 扩展运算符可以在一对{}中把一个对象展开，而后面部分的值可以覆盖展开的部分
          return {...todoItem, completed: !todoItem.completed};
        } else {
          return todoItem;
        }
      });
    }
    case REMOVE_TODO: {
      return state.filter((todoItem) => {
        return todoItem.id !== action.id;
      });
    }
    default: {
      return state;
    }
  }
}
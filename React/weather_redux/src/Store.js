import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunkMiddleware from 'redux-thunk'

import {reducer as weatherReducer} from './weather/';

const reducer = combineReducers({
  weather: weatherReducer
});

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
);

export default createStore(reducer, {}, storeEnhancers);
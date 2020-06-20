import { createStore,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootreducers from './reducers/index';

const store = createStore(rootreducers,compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;
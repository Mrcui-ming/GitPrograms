import reducerone from './reducerone';
import reducertwo from './reducertwo';
import reducerthree from './reducerthree';
import reducerfour from './reducerfour';
import { combineReducers } from 'redux';

const rootreducers = combineReducers({
  state1: reducerone,
  state2: reducertwo,
  state3: reducerthree,
  state4: reducerfour
})

export default rootreducers;
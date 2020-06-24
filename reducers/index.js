import {combineReducers} from 'redux';

import CartReducer from './CartReducer';
// import LoadingReducer from './LoadingReducer'

const rootReducer = combineReducers({
  cartList: CartReducer,
  //  loadingReducer:LoadingReducer
});

export default rootReducer;

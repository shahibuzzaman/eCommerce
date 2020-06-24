export default function (state = {}, action) {
  switch (action.type) {
    case 'CART_FETCH':
      return {
        ...state,
        cartList: action.payload,
      };

    default:
      return state;
  }
}

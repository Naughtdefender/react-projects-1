const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    case "INCREASE":
      const incTempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return {
            ...cartItem,
            amount: cartItem.amount + 1,
          };
        } else {
          return cartItem;
        }
      });
      return {
        ...state,
        cart: incTempCart,
      };
    case "DECREASE":
      const decTempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload) {
            return {
              ...cartItem,
              amount: cartItem.amount - 1,
            };
          } else {
            return cartItem;
          }
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return {
        ...state,
        cart: decTempCart,
      };
    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          cartTotal.amount += amount;
          cartTotal.total += price * amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return {
        ...state,
        total,
        amount,
      };
    case "DISPLAY_ITEMS":
      return { ...state, cart: action.payload, loading: false };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "TOGGLE_AMOUNT":
      const tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === "inc") {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (action.payload.type === "dec") {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cart: tempCart };

    default:
      throw new Error("no matching action type");
  }
};
export default reducer;

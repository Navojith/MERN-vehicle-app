import { createContext, useReducer } from 'react';

export const BidContext = createContext();

// create the reducer
export const BidReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BID':
      return {
        bid: action.payload,
      };

    case 'CREATE_BID':
      if (state.bid) {
        return {
          bid: [action.payload, ...state.bid],
        };
      } else {
        return {
          bid: [action.payload],
        };
      }

    case 'DELETE_BID':
      return {
        bid: state.bid.filter((b) => b._id !== action.payload._id),
      };
    case 'UPDATE_BID':
      return {
        ...state,
        bid: state.bid.map((b) =>
          b._id === action.payload._id ? action.payload : b
        ),
      };

    default:
      return state;
  }
};

export const BidContextProvider = ({ children }) => {
  // Use the reducer
  const [state, dispatch] = useReducer(BidReducer, {
    bid: null,
  });

  return (
    <BidContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BidContext.Provider>
  );
};

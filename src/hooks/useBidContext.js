import { useContext } from 'react';
import { BidContext } from '../context/Bid';

export const useBidContext = () => {
  const context = useContext(BidContext);

  if (!context) {
    throw Error('useBidContext must be used inside a BidContextProvider');
  }

  return context;
};

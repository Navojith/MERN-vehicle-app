import { useBidContext } from '../hooks/useBidContext';
import { useEffect, useState } from 'react';

const BidList = () => {
  const { bid, dispatch } = useBidContext();

  useEffect(() => {
    console.log(bid);
  }, []);
  return <div>{bid}</div>;
};

export default BidList;

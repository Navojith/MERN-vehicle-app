import { useBidContext } from '../hooks/useBidContext';
import { useEffect, useState } from 'react';

const BidList = () => {
  const { bid, dispatch } = useBidContext();
  const [bidItems, setBidItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (bid !== null) {
      let tot = 0;
      for (let i = 0; i < bid.length; i++) {
        tot += parseFloat(bid[i].bidAmount);
      }
      setTotal(tot);
    }

    setBidItems(bid);
  }, [bid]);
  return (
    <div className="mt-12 ">
      {bidItems &&
        bidItems.map((item) => (
          <div
            key={item.vehicle.id}
            className="inline-block text-white m-4 border-2 p-4"
          >
            <img src={item.vehicle.details.image} alt="vehicle" width={300} />
            <h2>
              {item.vehicle.details.brand +
                ' ' +
                item.vehicle.name +
                ' - ' +
                item.vehicle.details.manufactureYear}
            </h2>
            <p>Bid amount : {item.bidAmount} lkr</p>
          </div>
        ))}
      <hr />
      <h1 className="text-2xl text-right">Total : {total} lkr</h1>
      <hr />
    </div>
  );
};

export default BidList;

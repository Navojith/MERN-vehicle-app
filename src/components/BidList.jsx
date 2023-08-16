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
    <>
      {bidItems &&
        bidItems.map((item) => (
          <div key={item.vehicle.id} className="text-white m-4">
            <img src={item.vehicle.details.image} />
            <h2>
              {item.vehicle.details.brand +
                ' ' +
                item.vehicle.name +
                ' - ' +
                item.vehicle.details.manufactureYear}
            </h2>
            <p></p>
          </div>
        ))}
      <h1>Total : {total} lkr</h1>
    </>
  );
};

export default BidList;

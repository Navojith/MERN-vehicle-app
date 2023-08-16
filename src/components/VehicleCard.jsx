import { useState, useEffect } from 'react';
import { useBidContext } from '../hooks/useBidContext';
import imgNotFound from '../assets/images/Image_not_available.png';

const VehicleCard = () => {
  const [data, setData] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [minValueError, setMinValueError] = useState('');
  const { bid, dispatch } = useBidContext();
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://157.245.61.32:7979/vehicles');
      const json = await response.json();

      if (response.ok) {
        setData(json);
        dispatch({ type: 'SET_BID', payload: '' });
      }
    };
    fetchData();
  }, []);

  const handleFilter = async (e) => {
    if (e.target.value !== '') {
      const response = await fetch(
        `http://157.245.61.32:7979/vehicles?details.brand=${e.target.value}`
      );
      const json = await response.json();

      if (response.ok) {
        setData(json);
      }
    } else {
      const response = await fetch('http://157.245.61.32:7979/vehicles');
      const json = await response.json();

      if (response.ok) {
        setData(json);
      }
    }
  };

  const handleSubmit = (id, amount) => {
    dispatch({ type: 'CREATE_BID', payload: { vid: id, bidAmount: amount } });
  };

  const handleInputBid = (e, price) => {
    if (e.target.value > price) {
      setIsSubmitDisabled(false);
      setMinValueError('');
      setBidAmount(e.target.value);
    } else if (e.target.value <= price) {
      setIsSubmitDisabled(true);
      setMinValueError('Bid must be greater than the current price');
      setBidAmount(0);
    }
  };

  return (
    <>
      <div>
        <label for="filter">Brand</label>
        <br />
        <select
          name="filter"
          id="filter"
          onChange={handleFilter}
          className="text-black"
        >
          <option value="">All</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="Ford">Ford</option>
          <option value="Audi">Audi</option>
          <option value="Mercedes">Mercedes</option>
          <option value="BMW">BMW</option>
        </select>
      </div>

      <div className="card flex flex-wrap mt-12">
        {data &&
          data.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-gray-800 border-4 rounded-md md:w-[300px] mx-auto m-4 p-8"
            >
              <img
                src={
                  vehicle.details.image ? vehicle.details.image : imgNotFound
                }
                alt="vehicle"
                width={800}
                height={500}
              />
              <p className="text-xl mt-2">
                {vehicle.details.brand + ' '}
                {vehicle.name}
              </p>
              <p>{vehicle.details.description}</p>
              <p>
                {vehicle.details.price} {' ' + vehicle.details.currency}
              </p>
              <input
                type="number"
                id="bid"
                className="mt-4 px-2 py-1 rounded-md w-[75%] mr-2 text-black"
                placeholder="Enter your bid"
                onChange={(e, price) =>
                  handleInputBid(e, vehicle.details.price)
                }
                min={vehicle.details.price + 1}
              />
              <label htmlFor="bid"></label>LKR
              <br />
              {isSubmitDisabled ? (
                <button
                  className="mt-4 border-2 p-2 rounded-md text-gray-500 border-gray-500 "
                  disabled
                >
                  Submit
                </button>
              ) : (
                <button
                  className="mt-4 border-2 p-2 rounded-md hover:bg-indigo-600 "
                  onClick={() => handleSubmit(vehicle.id, bidAmount)}
                >
                  Submit
                </button>
              )}
              <p className="text-pink-600 border-1">{minValueError}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default VehicleCard;

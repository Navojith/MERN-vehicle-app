import { useState, useEffect } from 'react';
import { useBidContext } from '../hooks/useBidContext';
import Vehicle from '../components/Vehicle';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [data, setData] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [minValueError, setMinValueError] = useState('');
  const { dispatch } = useBidContext();
  const [bidAmount, setBidAmount] = useState(0);
  const navigate = useNavigate();

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

  const handleSubmit = (vehicle, amount) => {
    dispatch({
      type: 'CREATE_BID',
      payload: { vehicle: vehicle, bidAmount: amount },
    });
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
        <label htmlFor="filter">Brand</label>
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
      <button onClick={() => navigate('./current-bids')}>Show Bids</button>
      <div className="card flex flex-wrap mt-12 justify-center">
        {data &&
          data.map((vehicle) => (
            <div className="m-4">
              <Vehicle
                vehicle={vehicle}
                key={vehicle.id}
                minValueError={minValueError}
                handleSubmit={handleSubmit}
                isSubmitDisabled={isSubmitDisabled}
                handleInputBid={handleInputBid}
                bidAmount={bidAmount}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Landing;

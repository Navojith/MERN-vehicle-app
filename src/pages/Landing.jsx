import { useState, useEffect } from 'react';
import { useBidContext } from '../hooks/useBidContext';
import Vehicle from '../components/Vehicle';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findAllByDisplayValue } from '@testing-library/react';

const Landing = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useBidContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://157.245.61.32:7979/vehicles');
      const json = await response.json();

      if (response.ok) {
        setData(json);
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

  return (
    <>
      <ToastContainer />
      <div className="mt-16">
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

      <div className="card flex flex-wrap mt-12 justify-center">
        {data &&
          data.map((vehicle) => (
            <div className="m-4" key={vehicle.id}>
              <Vehicle vehicle={vehicle} isDetailsPage={false} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Landing;

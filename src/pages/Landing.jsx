import { useState, useEffect } from 'react';
import Vehicle from '../components/Vehicle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landing = () => {
  const [data, setData] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://157.245.61.32:7979/vehicles');
      const json = await response.json();

      if (response.ok) {
        setData(json);
        setNumOfPages(Math.ceil(json.length / 5));
      }
    };
    fetchData();
    handlePage(1);
  }, []);

  const handlePage = async (id) => {
    const response = await fetch(
      `http://157.245.61.32:7979/vehicles?_page=${id}&_limit=5`
    );
    const json = await response.json();

    if (response.ok) {
      setData(json);
    }
  };

  const page = (id) => {
    return (
      <span
        key={id}
        className={
          currentPage === id
            ? 'bg-pink-600 border-black text-black rounded-full border-4 p-2 m-2 cursor-pointer'
            : 'rounded-full border-2 p-2 m-2 cursor-pointer'
        }
        onClick={() => handlePage(id) && setCurrentPage(id)}
      >
        {id}
      </span>
    );
  };

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

      <div className="flex flex-wrap justify-center">
        {Array.from({ length: numOfPages }, (_, i) => page(i + 1))}
      </div>
    </>
  );
};

export default Landing;

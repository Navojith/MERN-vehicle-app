import { useState, useEffect } from 'react';
import imgNotFound from '../assets/images/Image_not_available.png';

const VehicleCard = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="card flex flex-wrap space-evenly mt-12">
      {data &&
        data.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-gray-800 border-4 rounded-md md:w-[300px] mx-auto m-4 p-8"
          >
            <img
              src={vehicle.details.image ? vehicle.details.image : imgNotFound}
              alt="vehicle"
              width={800}
              height={500}
            />
            <p className="text-xl mt-2">{vehicle.name}</p>
            <p>{vehicle.details.description}</p>
            <input
              type="number"
              id="bid"
              className="mt-4 px-2 py-1 rounded-md w-[75%] mr-2 text-black"
              placeholder="Enter your bid"
            />
            <label htmlFor="bid"></label>LKR
            <br />
            <button className="mt-4 border-2 p-2 rounded-md hover:bg-indigo-600 ">
              Submit
            </button>
          </div>
        ))}
    </div>
  );
};

export default VehicleCard;

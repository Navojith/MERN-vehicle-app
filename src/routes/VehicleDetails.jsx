import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import noImage from '../assets/images/Image_not_available.png';

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://157.245.61.32:7979/vehicles?id=${id}`
      );
      const json = await response.json();
      if (response.ok) {
        setVehicle(json[0]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap p-4 m-4">
      {vehicle && (
        <>
          <img
            src={vehicle.details.image ? vehicle.details.image : noImage}
            alt="vehicle"
            className="w-full md:w-[60vw]"
          />
          <div className="ml-4">
            <p className="text-xl">
              {vehicle.details.brand +
                ' ' +
                vehicle.name +
                ' ' +
                vehicle.details.manufactureYear}
            </p>
            <p className="mt-4">Description</p>
            <p className="mt-2">{vehicle.details.description}</p>
            <div className="flex align-middle mt-4">
              Color:
              <span
                style={{ backgroundColor: vehicle.details.color }}
                className={'rounded-full w-6 h-6 inline-block ml-2 border-2'}
              ></span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleDetails;

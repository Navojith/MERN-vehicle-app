import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    <div>
      {vehicle && (
        <>
          <div>{vehicle.name}</div>
          <img src={vehicle.details.image} alt="vehicle"></img>
        </>
      )}
    </div>
  );
};

export default VehicleDetails;

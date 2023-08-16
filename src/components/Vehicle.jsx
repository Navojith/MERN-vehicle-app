import imgNotFound from '../assets/images/Image_not_available.png';
import { useNavigate } from 'react-router-dom';
const Vehicle = ({
  vehicle,
  bidAmount,
  handleInputBid,
  isSubmitDisabled,
  minValueError,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={vehicle.id}
      className="bg-gray-800 border-4 rounded-md md:w-[300px] md:h-[450px] mx-auto m-8 p-8"
    >
      <img
        src={vehicle.details.image ? vehicle.details.image : imgNotFound}
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
        onChange={(e) => handleInputBid(e, vehicle.details.price)}
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
          onClick={() => handleSubmit(vehicle, bidAmount)}
        >
          Submit
        </button>
      )}
      <button
        onClick={() => navigate(`./vehicle/${vehicle.id}`)}
        className="mt-4 ml-2  border-2 p-2 rounded-md hover:bg-sky-600"
      >
        View Details
      </button>
      <p className="text-pink-600 border-1">{minValueError}</p>
    </div>
  );
};

export default Vehicle;
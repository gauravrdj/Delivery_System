import React from 'react';

const BookingCard = ({ details }: any) => {
  return (
    <div className="min-w-[300px] rounded overflow-hidden shadow-lg p-4 bg-white border border-gray-200 flex-shrink-0">
      <h3 className="text-xl font-bold mb-2">Booking ID: {details.id}</h3>
      <p className="text-gray-700 mb-2">
        <strong>Status:</strong> {details.booking_status}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Driver Status:</strong> {details.driver_status}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Post Date:</strong> {new Date(details.post_date).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Pickup Location:</strong> {details.pickup_location}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Dropoff Location:</strong> {details.dropoff_location}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Vehicle:</strong> {details.vehicle}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Amount:</strong> ₹{details.amount}
      </p>

      {details.accepted_date && (
        <p className="text-gray-700 mb-2">
          <strong>Accepted Date:</strong> {new Date(details.accepted_date).toLocaleString()}
        </p>
      )}
      {details.pick_up && (
        <p className="text-gray-700 mb-2">
          <strong>Pick-up Time:</strong> {new Date(details.pick_up).toLocaleString()}
        </p>
      )}
      {details.drop_off && (
        <p className="text-gray-700 mb-2">
          <strong>Drop-off Time:</strong> {new Date(details.drop_off).toLocaleString()}
        </p>
      )}

      {details.driverId && (
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Track
        </button>
      )}
    </div>
  );
};

export default BookingCard;

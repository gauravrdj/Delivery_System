"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {handleBooking, CreateBooking} from "../../lib/actions/addBooking";
import {io} from 'socket.io-client'
import axios from 'axios'
// import { useSession } from "next-auth/react";

export default function DeliveryForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("bike");
  const [socket, setSocket] = useState<any>(undefined);
  const [booking, setBooking] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  // const [query, setQuery] = useState<any>('');
  // const [places, setPlaces] = useState<any>([]);
  // const [selectedPlace, setSelectedPlace] = useState<any>(null);
  // const [selectedCity, setSelectedCity] = useState<any>(null)
  // const session = useSession<any>();
  
  const handleSubmit = async (event:any) => {
    // Prevent form from refreshing the page
    event.preventDefault();
       let res;
      
     const socket  = io('http://localhost:3003');
     setSocket(socket);
    //  console.log('arrived')
   

    socket.on('connect', async () => {
      const socketId = socket.id;
      console.log('user:', socketId);
      setLoading(true);
      const res = await handleBooking(from, to, vehicle, socketId);
      console.log('res: ', res);
      
      if (res && res.length > 0) {
        let booking = false;
        
        for (let i = 0; i < res.length && !booking; i++) {
          const drive = res[i];
          const driverSocketId = drive?.socketId;
          console.log('driver: ', driverSocketId);
          
          // Emit delivery request to the current driver
          socket.emit('deliveryRequest', {
            driverSocketId,
            userSocket: socketId
          });
          
          const waitForTenSeconds = () => new Promise(resolve => setTimeout(resolve, 10000));
          
          // Wait for the driver's response or 10 seconds timeout
          let driverResponse = await new Promise((resolve) => {
            socket.once('deliveryResponse', ({ accepted }) => {
              resolve(accepted);
            });
            
            // Timeout if no response in 10 seconds
            (async () => {
              await waitForTenSeconds();
              resolve(false);  // Treat as a rejection if no response
              console.log("10 seconds have passed without response!");
            })();
          });
          
          if (driverResponse) {
            // If the driver accepts, create the booking
            await CreateBooking(from, to, vehicle, drive?.driverId);
            booking = true;
            setBooking(true);
            Swal.fire({
              title: "Booking Status",
              text: "Booked Successfully🎉",
              icon: "success",
              timer: 2000
            });
            break;  // Exit the loop after successful booking
          }
        }
        setLoading(false);
        if (!booking) {
          // Handle the case where no drivers accepted the booking
          Swal.fire({
            title: "Booking Status",
            text: "No drivers accepted your request",
            icon: "error",
            timer: 2000
          });
        }
        else{
          setLoading(false);
        }
      }
    });
    

    
  
  };

  // const fetchPlaces = async (text:any) => {
  //   if (text.length > 0) {
  //     try {
  //       const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=a513d281d8f348ea9237b587345aed50`);
  //       setPlaces(response.data.results); // Adjusting to the correct 'results' key in the response
  //     } catch (error) {
  //       console.error('Error fetching places:', error);
  //     }
  //   } else {
  //     setPlaces([]);
  //   }
  // };

 

  return (
    <div className="w-[500px] h-[500px] mx-auto bg-white p-8 rounded-lg shadow-md mt-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Delivery Details
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Pickup Location */}
        <div>
          <label
            htmlFor="pickupLocation"
            className="block text-lg font-medium text-gray-700"
          >
            Pickup Location
          </label>
          <input
            type="text"
            id="pickupLocation"
            // value={query}
            placeholder="Enter pickup location"
            onChange={(e) => {
              // await handleInputChange(e);
              setFrom(e.target.value);
            }}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
            required
          />
          
    </div>
        {/* Drop Off Location */}
        <div>
          <label
            htmlFor="dropOffLocation"
            className="block text-lg font-medium text-gray-700"
          >
            Drop Off Location
          </label>
          <input
            type="text"
            id="dropOffLocation"
            placeholder="Enter drop off location"
            onChange={(e) => {
              setTo(e.target.value);
            }}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
            required
          />
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Vehicle Type
          </label>
          <div className="mt-2 flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                name="vehicleType"
                onChange={(e) => {
                  setVehicle(e.target.value);
                }}
                value="bike"
                id="bike"
                className="mr-2"
                defaultChecked
              />
              <label
                htmlFor="bike"
                className="text-base font-medium text-gray-700"
              >
                Bike
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="vehicleType"
                value="tempo"
                onChange={(e) => {
                  setVehicle(e.target.value);
                }}
                id="tempo"
                className="mr-2"
              />
              <label
                htmlFor="tempo"
                className="text-base font-medium text-gray-700"
              >
                Tempo
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="vehicleType"
                value="truck"
                onChange={(e) => {
                  setVehicle(e.target.value);
                }}
                id="truck"
                className="mr-2"
              />
              <label
                htmlFor="truck"
                className="text-base font-medium text-gray-700"
              >
                Truck
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 text-lg"
        >
          Submit Delivery Request
        </button>
      </form>
      <div>
        {/* <br />
        {booking? <div className="bg-green-100 text-green-800 font-bold p-4 rounded-md shadow-md">
  Booking Done
</div>
: ""
} */}
<br />
  {loading ? <div className="flex items-center justify-center">
    <div className="loader">Loading...</div>
  </div>: ""}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {handleBooking, CreateBooking} from "../../lib/actions/addBooking";
import {io} from 'socket.io-client'
// import { useSession } from "next-auth/react";

export default function DeliveryForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [vehicle, setVehicle] = useState("bike");
  const [socket, setSocket] = useState<any>(undefined);
  const [booking, setBooking] = useState<any>(false);
  // const session = useSession<any>();
  
  const handleSubmit = async (event:any) => {
    // Prevent form from refreshing the page
    event.preventDefault();
       let res;
      
     const socket  = io('http://localhost:3003');
     setSocket(socket);
    //  console.log('arrived')
     socket.on('connect', async()=>{
      const socketId = socket.id;
      console.log('user:', socketId)
     res = await handleBooking(from, to, vehicle, socketId);
     console.log('res: ', res);
    //  console.log(res);
     if(res && res.length>0){
      let i=0;
      // console.log(i);
      while(i<res.length){
        const drive = res[i];
        const driverSocketId  = drive?.socketId;
        // console.log(drive);
        console.log('driver: ', driverSocketId);
         socket.emit('deliveryRequest', {
          driverSocketId,
          userSocket : socketId
        });
        
        // const response = await new Promise((resolve) => {
        socket.on('deliveryResponse', async({accepted})=>{
        console.log(accepted);
        if(accepted){
          await CreateBooking(from,to,vehicle,drive?.driverId);
          setBooking(true);
          
        }
        });
        // if(response){
        //   await CreateBooking(from,to,vehicle,drive?.driverId);
        //   i=res.length;
        //   check=true;
          
        // }
        // else{
        //   i++;
        // }
      //  })
      if(booking){
        break;
      }
      // });
      i++;
    }
     }
  });
    // console.log(res);
    // if (check) {
    //   Swal.fire({
    //     icon: "success",
    //     title: "Booking",
    //     text: "Booking initiated",
    //   });
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Booking",
    //     text: "Error while booking",
    //   });
    // }
  };

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
            placeholder="Enter pickup location"
            onChange={(e) => {
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
        {booking? "Done" : ""}
      </div>
    </div>
  );
}

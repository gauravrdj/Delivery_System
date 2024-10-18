'use client'

// import { useEffect } from "react"
import { useEffect, useState } from "react"
import {ChangeStatus, GetActive} from "../../lib/actions/ActiveBooking";
import Swal from "sweetalert2";
// import { useRouter } from "next/router";
export default function ActiveBooking(){
//  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [status, setStatus] = useState<any>("")
  const [changed, setChanged] = useState<any>(false)

  useEffect(()=>{
    
    async function getData() {
      try {
        const res = await GetActive(); 
        if(res!=null){
        setBooking(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData(); 
  },[changed])
   if(booking!=null){
    return(
        <div className="mx-auto bg-white p-8 rounded-lg shadow-md mt-16 w-[500px] h-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4">Active Booking</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Booking ID:</span>
            <span>{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span>{booking.booking_status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Driver Status:</span>
            <span>{booking.driver_status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Pickup Location:</span>
            <span>{booking.pickup_location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Dropoff Location:</span>
            <span>{booking.dropoff_location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Amount:</span>
            <span>₹{booking.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Vehicle:</span>
            <span>{booking.vehicle}</span>
          </div>
        </div>
  
        {/* Status update input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Update Status
          </label>
          <select
            // value={status}
            // onChange={}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e)=>{
            // console.log(e.target.value)
            setStatus(e.target.value);
            
          }}>
            <option value="">Select a status</option>
            <option value="Goods collected">Goods collected</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
  
        {/* Update button */}
        <div className="mt-4">
          <button
            // onClick={updateBookingStatus}
            className="w-full bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={async()=>{
               const res  = await ChangeStatus(status);
               if(res!=null && res){
                Swal.fire({
                  title : "Status",
                  text : "Status updated successfully",
                  icon:"success",
                  timer : 2000
                })
                setChanged(true)
               }
               else{
                Swal.fire({
                  title : "Status",
                  text : "Something went wrong",
                  icon:"error",
                  timer : 2000
                })
               }
          }}>
            Update Status
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center w-full h-full m-28">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No  active bookings yet!</h2>
          <p className="text-gray-600">You covered up all till now👍</p>
        </div>
      </div>
  )
    

}
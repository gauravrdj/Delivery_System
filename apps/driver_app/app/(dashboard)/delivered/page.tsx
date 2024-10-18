"use client"

import { useState, useEffect } from "react"
import { GetClosed } from "../../lib/actions/ActiveBooking";
import BookingCard from "../../../components/Bookings";
export default function ClosedBookings(){
const [bookings, setBookings] = useState<any>(null);

useEffect(()=>{
    
    async function getData() {
      try {
        const res = await GetClosed(); 
        console.log(res);
        if(res!=null){
        setBookings(res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData(); 
  },[])

  if(bookings!=null && bookings.length>0){
    return(
        <div className='justify-between w-full m-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {bookings.map((ele:any) => <BookingCard details = {ele} key = {ele.id}></BookingCard>)}
            
        </div> 
    ) 
}
    return (
        <div className="flex justify-center items-center w-full h-full m-28">
  <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">No bookings completed yet!</h2>
    <p className="text-gray-600">You haven’t completed any bookings at the moment. Once you do, they will show up here.</p>
  </div>
</div>

    )
}
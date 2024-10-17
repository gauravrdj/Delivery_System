"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {io} from 'socket.io-client'
import SocketGenerate from "../../../components/SocketCreate";
import { Button } from "@repo/ui/button";
import OnlineDriver from "../../lib/actions/onlineDriver";
// import handleBooking from "../../lib/actions/addBooking";

export default function Notification() {
  const [socket, setSocket] = useState<any>(undefined);
  const [res, setRes] = useState<any>(undefined);
  const [accept, setAccept] = useState<any>(false);
  // const [from, setFrom] = useState("");
  // const [to, setTo] = useState("");
  // const [vehicle, setVehicle] = useState("bike");

  // const handleSubmit = async (event:any) => {
  //   // Prevent form from refreshing the page
  //   event.preventDefault();

    
  // };
  // useEffect(()=>{
   
  //   // const socket = SocketGenerate().then((response:any)=> response());
  //     async function socketOp(){
  //       const socket = await SocketGenerate();
  //           setSocket(socket);
  //           console.log(socket.id);
  //           socket.on("connect", async ()=>{
  //               socket.on('deliveryRequest', async(res:any)=>{
  //                 const {userSocket} = res;
  //                 console.log(userSocket);
                  
  //                 const accept = confirm('New delivery request, Accept?');
  //                 socket.emit('deliveryResponse', {
  //                   userSocket,
  //                   accepted : accept
  //                 })
  //               })
  //           })
  //           return () => {
  //             socket.disconnect();
  //           };
  //         }
  //         socketOp();
  // }, []);
      if(res!=undefined){
        return (
          <div className="w-[300px] h-[300px] mx-auto bg-white p-8 rounded-lg shadow-md mt-16 flex flex-col justify-between">
  {/* Header Section */}
  <div className="text-center">
    <h2 className="text-2xl font-semibold mb-4">Booking Request</h2>
    {/* <p className="text-gray-600 mb-2">Pickup: Location A</p>
    <p className="text-gray-600">Dropoff: Location B</p> */}
    <p>Do you want to accept the booking?</p>
  </div>

  {/* Buttons Section */}
  <div className="flex justify-between mt-4">
    <button
      className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-200" onClick={()=>{
        setAccept(true);
        console.log('Driver accepted the booking');
        setRes(undefined);
        socket.emit('deliveryResponse', {res, accepted : true});
      }}
    >
      Accept
    </button>
    <button
      className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition duration-200" onClick={()=>{
        setRes(undefined);
      }}
    >
      Decline
    </button>
  </div>
</div>

        )
      }   
  return (
    <div>
 
 
 <div>
   Notifications goes here
   </div>
   

   
  <Button onClick={async()=>{
     const socket = io('http://localhost:3003');
     setSocket(socket);
      socket.on("connect", async()=>{
        const res = await OnlineDriver(socket.id);
        console.log(res);
        console.log('driver: ', socket.id);

        socket.on('deliveryRequest', ({userSocket})=>{
            // Swal.fire({
            //   title: "New Booking",
            //   icon : "info",

            // })
            setRes(userSocket);
           console.log(userSocket);
        });
        
        })
      }}>Connect with user</Button>
   </div>
  );
}

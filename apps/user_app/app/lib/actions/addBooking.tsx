'use server'
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';


// import Swal from 'sweetalert2';

export  async function handleBooking(from:any,to:any, vehicle:any, socketId:any){
    const session=await getServerSession(authOptions);
    // console.log(session);
    //   await db.bookings.create({
    //      data:{
    //         post_date: new Date(),
    //         pickup_location : from,
    //         dropoff_location : to,
    //         amount : Math.random()*1000 + 1500,
    //         vehicle : vehicle,
    //         userId : Number(session.user.id),
    //      }
    //      });
    try{

    const res = await db.online.findMany({
        where:{
            driver:{
                AND:[
                    {
                Available : true
                    },
                    {
                  vehicle:{
                    has: vehicle
                  }
                    }
                ]
            }
        },
        include:{
            driver:{
               select:{
                number:true
               }
            }
        }
    });
    return res;
}
catch(e){
    
    console.log(e);
    return null;
}
    }
       
    // try{
    //  const res = await db.bookings.create({
    //      data:{
    //         post_date: new Date(),
    //         pickup_location : from,
    //         dropoff_location : to,
    //         amount : Math.random()*1000 + 1500,
    //         vehicle : vehicle,
    //         userId : Number(session.user.id),
            
    //      }
    //  })
    // //  console.log(res);
    //  return res;

    // }
    // catch(e){
    //     console.log(e);
    //  return null;
    // }
  export async function CreateBooking(from:any,to:any, vehicle:any, driverId:any){
    const session = await getServerSession(authOptions);
    console.log(session.user.id)
try{
     const res = await db.bookings.create({
         data:{
            post_date: new Date(),
            pickup_location : from,
            dropoff_location : to,
            amount : Math.random()*1000 + 1500,
            vehicle : vehicle,
            userId : Number(session.user.id),
            driverId : driverId,
            booking_status : "Booked",
            accepted_date : new Date(),
            driver_status : "On the way to pick up"

         }
     });

     await db.driver.update({
        where:{
            id : driverId,
        },
        data:{
            Available : false
        }
     })
    //  console.log(res);
     return res;

    }
    catch(e){
        console.log(e);
     return null;
    }
  }
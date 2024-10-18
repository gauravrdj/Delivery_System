'use server'
import db from '@repo/db/client'
import { authOptions } from '../auth';
import { getServerSession } from 'next-auth';


export  async function GetActive(){
    const session = await getServerSession(authOptions);
     try{
    const res = await db.bookings.findFirst({
      where:{
          AND:[
              {
          driverId : Number(session.user.id),
              },
              {
                  booking_status : "Booked",
              }
          ]
      }
    })
    return res;
}
catch(e){
    console.log('error while fetching active booking: ', e);
}
  //    console.log(data.id);
  return null;
   }


   export async function ChangeStatus(status:any){
    const session  = await getServerSession(authOptions);
    if(status==="Goods collected"){
     try{
       const res =  await db.bookings.updateMany({
            where:{
                AND:[
                    {
                driverId : Number(session.user.id),
                    },{
                   booking_status: "Booked"
                    },
                ]
            },
            data:{
                driver_status : status,
                pick_up : new Date()
            }
        })
         return res;
     }
     catch(e){
         console.log(e);
         return null;
     }
    }
    else{
        try{
            const res =  await db.bookings.updateMany({
                 where:{
                     AND:[
                         {
                     driverId : Number(session.user.id),
                         },{
                        booking_status: "Booked"
                         },
                     ]
                 },
                 data:{
                     driver_status : status,
                     drop_off : new Date(),
                     booking_status : "Closed",
                     
                 }
             })
                 

             await db.driver.update({
                where:{
                    id : Number(session.user.id)
                },
                data:{
                    Available : true
                }
             })
             
              return res;
          }
          catch(e){
              console.log(e);
              return null;
          }
    }
   }

   export async function GetClosed(){
    const session = await getServerSession(authOptions);
    try{
    const res = await db.bookings.findMany({
        where:{
            AND:[
                {
                    booking_status : "Closed",
                },
                {
                    driverId : Number(session.user.id)
                }
            ]
        }
    })
    return res;
}
catch(e){
    return null;
}

   }


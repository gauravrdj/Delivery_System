// "use client"
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import BookingCard from '../../../components/activeBookings';
import Swal from 'sweetalert2';
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

// import { useRouter } from 'next/navigation';


async function getActiveBooking(id:any){

    if(!id){
        return null;
    }
    try{
    const res  = await db.bookings.findMany({
        
        where:{
            AND:[
                {
            userId: Number(id),
                },
                {
                driver_status : "delivered"
                },
            ]
        } ,

    
    });
    res.map(t=>({
        id : Number(t.id),
        booking_status : t.booking_status,
        driver_status : t.driver_status,
        post_date : t.post_date,
        pickup_location : t.pickup_location,
        dropoff_location : t.dropoff_location,
        driverId : t.driverId,
        pick_up : t.pick_up,
        drop_off : t.drop_off,
        amount : t.amount,
        vehicle:t.vehicle
    }))
    return res;
}
catch(e){
    // console.log(e);
    return null;
}
}
export  default async function (){
    // const router = useRouter();
   const session = await getServerSession(authOptions);
     const res = await getActiveBooking(session.user.id);
     
    //  if(res===null || !res){
    //       Swal.fire({
    //         title : "Bookings",
    //         text : "Error while fetching bookings",
    //         icon : "info"
    //     });
    //      redirect('/dashboard');
        
    //  }
    //  console.log(res);
    if(res!=null && res.length>0){
    return(
        <div className='justify-between w-full m-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {res.map(ele=> <BookingCard details = {ele} key = {ele.id}></BookingCard>)}
            
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
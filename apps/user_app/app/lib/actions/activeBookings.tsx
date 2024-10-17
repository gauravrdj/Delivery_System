import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';


export default async function getActiveBookings() {
    const session = await getServerSession(authOptions);
    if(!session.user.id){
        return null;
    }
    try{
    const res  = await db.bookings.findMany({
        where:{
            userId: session.user.id,
        } 
    });
    return res;
}
catch(e){
    return null;
}

}
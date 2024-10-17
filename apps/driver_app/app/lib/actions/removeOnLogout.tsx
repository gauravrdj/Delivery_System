'use server'
import db from '@repo/db/client'
import { getServerSession } from 'next-auth'
import {authOptions} from '../auth'


export default async function removeDriver(){
   const session=await getServerSession(authOptions);
   const id = Number(session.user.id);
   try{
     const res = await db.online.deleteMany({
        where:{
            driverId : id,
        },
     })
     return res;
   }
   catch(e){
    return null;
   }
}
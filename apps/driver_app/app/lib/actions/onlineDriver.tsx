'use server'
import db from '@repo/db/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'

export default async function OnlineDriver(id:any){
   const session =await getServerSession(authOptions);
   console.log(session.user.id);
  try{

      await db.online.deleteMany({
         where:{
            driverId : Number(session.user.id)
         }
      })

     const res = await db.online.create({
        data:{
            driverId:Number(session.user.id),
            socketId : id
        }
     })
     return res;
  }
  catch(e){
    console.log('error while inserting in online db: ', e);
      return null;
  }
   
}
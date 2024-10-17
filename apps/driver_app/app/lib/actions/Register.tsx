'use server'
import db from '@repo/db/client';
import bcrypt from 'bcrypt'

export default async function Signup(formData:any){
    const hashedPassword=await bcrypt.hash(formData.password, 10);

    try{
        const res = await db.driver.create({
            data:{
                name : formData.name,
                number: formData.number,
                password : hashedPassword,
                vehicle : formData.vehicle,
            }
           });
           return res;
    }
    catch(e){
        console.log(e);
        return null;
    }
}
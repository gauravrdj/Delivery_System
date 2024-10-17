'use client'
import {io} from 'socket.io-client';

  let socket:any = null;
export default function SocketGenerate(){
    if(!socket){
      socket = io('http://localhost:3003');

    }
    return socket;
}
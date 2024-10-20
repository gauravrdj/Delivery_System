"use client"

import { signIn } from 'next-auth/react';
// import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@repo/ui/button';
import Swal from 'sweetalert2';
import Link from 'next/link';
import {io} from 'socket.io-client'
import OnlineDriver from '../app/lib/actions/onlineDriver';
import SocketGenerate from './SocketCreate';

// export default function () {
//     const router=useRouter()
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async(e: any) => {
//     e.preventDefault();
//     const res=await signIn('credentials', {
//         phone,
//         password,
//         redirect:false
//     })
//     if(!res?.error){
        
//         router.push('/');
//         toast.success("Welcome🎉");
//     }
//     else{
//          router.push('/signin')
//            toast.error("oops something went wrong..!")
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Phone
//             </label>
//             <input
//               id="phone"
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign In
//             </button>
//             <a
//               className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
//               href="#"
//             >
//               Forgot Password?
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // export default Login;


export default function(){
  const [socket, setSocket] = useState<any>(undefined);
    const router=useRouter()
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold">Driver Login</h1>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
              <input  id="email" name="phone" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Phone" onChange={(e)=>{
                setPhone(e.target.value)
              }}/>
              <label  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone</label>
            </div>
            <div className="relative">
              <input  id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={(e)=>{
                setPassword(e.target.value)
              }} />
              <label  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div className="relative">
              <Button  onClick={async()=>{
                    const res=await signIn('credentials', {
                        phone,
                         password,
                        redirect:false
                   })
                if(!res?.error){
        
                    router.push('/');
                     toast.success("Welcome🎉");
                     Swal.fire({
                      title: "Welcome🎉",
                      text : "Sign In Successful",
                      icon : "success"
                     })
                    //  const socket = io("http://localhost:3003");
                    //  setSocket(socket);
                    // const socket = await SocketGenerate();
                    // console.log(socket);
                    //  socket.on("connect", async()=>{
                    //   await OnlineDriver(socket.id);
                    //   console.log(socket.id);
                    //  })
                    }
                 else{
                     router.push('/signin')
                       toast.error("oops something went wrong..!")
                       Swal.fire({
                        title: "Oops...",
                        text : "Something went wrong...!",
                        icon : "error"
                       })
                   }


              }}>Submit</Button>
            </div>
            <div>
              <Link href = {'/signup'}>New Driver?</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"  width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
          <span>Continue with Google</span>
        </button>
      </div>

    </div>
  </div>
</div>
  )
}
// xmlns:xlink="http://www.w3.org/1999/xlink"
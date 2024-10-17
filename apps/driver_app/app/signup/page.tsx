"use client"
import React, { useState } from 'react';
import db from '@repo/db/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import Signup from '../lib/actions/Register';
const DriverSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    password: '',
    vehicle: [] as string[], // For storing multiple vehicle selections
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the selected vehicle to the array
      setFormData({ ...formData, vehicle: [...formData.vehicle, value] });
    } else {
      // Remove the unselected vehicle from the array
      setFormData({
        ...formData,
        vehicle: formData.vehicle.filter((v) => v !== value),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Form Data Submitted:', formData);
    
       const res = await Signup(formData);
      if(res!=null){
       Swal.fire({
        icon : "success",
        title : "Sign up",
        text : "Registered Successfully",
        timer : 2000
       })
       router.push('/signin');
      }
   else{
      console.log(e);
      Swal.fire({
        icon : "error",
        title : "Sign up",
        text : "Something went wrong",
        timer : 2000
       })
      }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Driver Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your name"
          />
        </div>

        {/* Number Field */}
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-700 font-bold mb-2">
            Mobile Number:
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your mobile number"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Vehicle Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Select Vehicles Services:
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="bike"
              value="bike"
              onChange={handleVehicleChange}
              className="mr-2"
            />
            <label htmlFor="bike" className="text-gray-700">
              Bike
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="tempo"
              value="tempo"
              onChange={handleVehicleChange}
              className="mr-2"
            />
            <label htmlFor="tempo" className="text-gray-700">
              Tempo
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="truck"
              value="truck"
              onChange={handleVehicleChange}
              className="mr-2"
            />
            <label htmlFor="truck" className="text-gray-700">
              Truck
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverSignUp;

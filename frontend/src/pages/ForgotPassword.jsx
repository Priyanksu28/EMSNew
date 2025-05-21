import React, { useState } from "react";
import axios from 'axios'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handlesubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        try {
            const response =await axios.post("http://localhost:3000/api/auth/forgot-password", { email })

            if(response.data.success) {
              setMessage(response.data.message)
            }
        } catch (error) {
            if(error.response && error.response.data && !error.response.data.success) {
              setError(error.response.data.error)
            }
            else {
              setError("Server Error")
            }
        }
    }

  return (
    <div className="relative h-screen">
      
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-600"></div>

      
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
        <h2 className="font-sevillana text-3xl text-white">
          Asset Management System
        </h2>
        <div className="border shadow p-6 w-80 bg-white rounded">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handlesubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">Email</label>
              <input 
              className="w-full px-3 py-2 border rounded" 
              type="email" placeholder="Enter email" 
              onChange={(e) => setEmail(e.target.value)}
              required/>
            </div>
            <div className="mb-4">
              <button className="w-full bg-teal-600 text-white py-2 rounded" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

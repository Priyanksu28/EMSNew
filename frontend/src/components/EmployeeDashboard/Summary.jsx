import React from 'react'
import { useAuth } from '../../context/authContext'

const Summary = () => {
    const {user} = useAuth()
  return (
    <div className='p-6'>
    <div className="rounded flex bg-white">
        <div className={`text-3x1 flex justify-center items-center bg-teal-600 text-white px-4`}>

        </div>
      <div className="pl-4 py-1">
        <p className="text-1g font-semibold">Welcome Back</p>
        <p className="text-xl font-bold">{user.name}</p>
      </div>
    </div>
    </div>
  )
}

export default Summary

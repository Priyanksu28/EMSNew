import React from 'react'
import { Link } from 'react-router-dom'

const List = () => {
  return (
    <div className='p-5'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Issues</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input 
                className='px-4 py-0.5 border' 
                type="text" 
                placeholder='Search By' 
            />
            <Link className='px-4 py-1 bg-teal-600 rounded text-white' to="/employee-dashboard/issues/add-issue">Add New Issue</Link>
          </div>
        </div>
  )
}

export default List

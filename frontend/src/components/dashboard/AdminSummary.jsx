import React from 'react'
import SummaryCard from './SummaryCard'

const AdminSummary = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold ml-5 mt-3">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 ml-5 mr-5">
        <SummaryCard text="Total Employees" number={13} color="bg-teal-600"/>
        <SummaryCard text="Total Assets" number={15} color="bg-yellow-600"/>
        <SummaryCard text="Transfer" number={15} color="bg-red-600"/>
      </div>

      <div>
        <h4 className="text-center text-2xl font-bold mt-6">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ml-5 mr-5">

            <SummaryCard text="Applied" number={15} color="bg-teal-600"/>
            <SummaryCard text="Approved" number={15} color="bg-green-600"/>
            <SummaryCard text="Pending" number={15} color="bg-yellow-600"/>
            <SummaryCard text="Rejected" number={15} color="bg-red-600"/>
        </div>
      </div>
    </div>
  )
}

export default AdminSummary

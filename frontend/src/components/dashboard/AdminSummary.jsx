import React, { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import axios from 'axios'

const AdminSummary = () => {

  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummery = async () => {
      try {
        const summary = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(summary.data);
        
        setSummary(summary.data)
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error)
        }
        console.log(error.message);
      }
    }
    fetchSummery()
  }, [])

  if (!summary) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h3 className="text-2xl font-bold ml-5 mt-3">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 ml-5 mr-5">
        <SummaryCard text="Total Employees" number={summary.totalEmployees} color="bg-teal-600"/>
        <SummaryCard text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600"/>
        <SummaryCard text="Total Assets" number={summary.totalAssets} color="bg-red-600"/>
      </div>

      <div>
        <h4 className="text-center text-2xl font-bold mt-6">Issue Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ml-5 mr-5">

            <SummaryCard text="Applied" number={summary.issueSummary.appliedFor} color="bg-teal-600"/>
            <SummaryCard text="Approved" number={summary.issueSummary.approved} color="bg-green-600"/>
            <SummaryCard text="Pending" number={summary.issueSummary.pending} color="bg-yellow-600"/>
            <SummaryCard text="Rejected" number={summary.issueSummary.rejected} color="bg-red-600"/>
        </div>
      </div>
    </div>
  )
}

export default AdminSummary

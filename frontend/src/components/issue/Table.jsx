import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/IssueHelper'
import { IssueButton } from '../../utils/IssueHelper'



const Table = () => {

    const [issues, setIssues] = useState(null)
    const [filteredIssues, setFilteredIssues] = useState(null)

    const fetchIssues = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/issue', {
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            console.log(response.data);
            
            if (response.data.success) {
              let sno = 1
              const data = await response.data.issues.map((isu) => (
                {
                  _id: isu._id,
                  sno: sno++,
                  employeeId: isu.employeeId.employeeId,
                  department_name: isu.employeeId.department.department_name || "N/A",
                  issueType: isu.issueType,
                  name: isu.employeeId.userId.name,
                  appliedDate: new Date(isu.appliedDate).toLocaleDateString(),
                  status: isu.status,
                  action: (<IssueButton Id={isu._id}/>)
                }
              ))
              setIssues(data)
              setFilteredIssues(data)
            }
          }
          catch(error) {
            if(error.response && !error.response.data.success) {
              alert(error.response.data.error)
            }
          }
    }

    useEffect(() => {
      fetchIssues()
    }, [])

    const filterByChange = (e) => {
      const data = issues.filter((issue) => 
        issue.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFilteredIssues(data)
    }


  return (
    <>
    {filteredIssues ? (
    <div className='p-6'>
      <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Issues</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input 
                className='px-4 py-0.5 border' 
                type="text" 
                placeholder='Search By'
                onChange={filterByChange}
            />
            <div>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 mr-3'>Working...</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 mr-3'>Approved</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 mr-3'>Rejected</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 mr-3'>Clear</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 mr-3'>Pending</button>
            </div>
            
          </div>
          <div className='mt-3'>
            <DataTable columns={columns} data={filteredIssues} pagination/>
          </div>
    </div>
    ) : <div>Loading...</div>}
    </>
  )
}

export default Table

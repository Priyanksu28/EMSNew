import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const View = () => {

    const [assigns, setAssigns] = useState(null)
    const [filteredAssigns, setFilteredAssigns] = useState(null)
    const {id} = useParams()
    let sno = 1;

    const fetchAssigns = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/assign/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data.assign);

            if (response.data.success) {
                setAssigns(response.data.assign)
                setFilteredAssigns(response.data.assign)
            }
            
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message)
            }
        }
    };

    useEffect(() => {
        fetchAssigns();
    }, [])

    const filterAssigns = (q) => {
        const filteredRecords = assigns.filter((leave) =>
            leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    )
    setFilteredAssigns(filteredRecords)
    }



  return (
    <>
        {filteredAssigns === null ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Assignment History</h2>
            </div>
            <div className=" flex justify-end my-3">
                <input
                className="border px-2 rounded-md py-0.5 border-gray-300" 
                type="text" 
                placeholder='Search by'
                onChange={filterAssigns}
                />
            </div>
          {filteredAssigns.length > 0 ?(
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3">SNo</th>
                        <th className="px-6 py-3">Employee ID</th>
                        <th className="px-6 py-3">Asset ID</th>
                        <th className="px-6 py-3">Assign Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssigns.map((assign) => (
                        <tr
                            key={assign._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td>{sno++}</td>
                            <td>{assign.employeeId.employeeId}</td>
                            <td>{assign.assetId.assetId}</td>
                            <td>{new Date(assign.assignDate).toLocaleDateString()}</td>
                            <button>View</button>
                        </tr>
                    ))}
                </tbody>
            </table>
          ): <div>No Records</div>}
          </div>
          )}
    </>
  )
}

export default View

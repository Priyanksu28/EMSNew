import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.department_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
    
]


export const DepartmentButton = ({Id, onDepartmentDelete}) => {
    const navigate = useNavigate()
    
    const handledelete = async (id) => {
        const confirm = window.confirm("Do you want to delete ?")
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                  headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                  }
                })
                console.log("Response data from backend:", response.data);
                if (response.data.success) {
                    onDepartmentDelete(id)
                }
              }
              catch(error) {
                if(error.response && !error.response.data.success) {
                  alert(error.response.data.error)
                }
              } 
        }

        
    }


    
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >Edit</button>
            <button className="px-1 py-1 bg-red-600 text-white"
                onClick={() => handledelete(Id)}
            >Delete</button>
        </div>
    )
}
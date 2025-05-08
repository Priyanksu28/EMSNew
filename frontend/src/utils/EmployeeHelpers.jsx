import axios from "axios"
import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "300px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "120px"
    },
    {
        name: "Department Name",
        selector: (row) => row.department_name,
        width: "200px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "300px",
        center: "true"
    }
    
]


export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:3000/api/department', {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            departments = response.data.departments
        }
    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments
}



// employee for assign asset

export const getEmployees = async (id) => {
    let employees
    try {
        const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            employees = response.data.employees
        }
    } catch (error) {
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return employees
}


export const EmployeeButton = ({Id}) => {
    const navigate = useNavigate()

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >View</button>
            <button className="px-1 py-1 bg-yellow-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >Edit</button>
            <button className="px-1 py-1 bg-blue-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/assign/${Id}`)}
            >Assignment</button>
            <button className="px-1 py-1 bg-red-600 text-white"
                
            >Issues</button>
            <button className="px-1 py-1 bg-red-600 text-white"
                
            >Delete</button>
        </div>
    )
}

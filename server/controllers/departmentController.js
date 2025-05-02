import Department from '../models/Department.js'

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch (error) {
        return res.status(500).json({success: false, error: "get departments Server Error"})
    }
}

const addDepartment = async (req, res) => {
    try {
        console.log("Received data:", req.body)
        const {department_name} = req.body
        const newDepartment = new Department ({
            department_name,
        })
        await newDepartment.save()
        return res.status(200).json({success: true, department: newDepartment})
    } catch (error) {
        console.error("Error saving asset:", error);
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const getDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById(id); // Fixing the issue here
        if (!department) {
            return res.status(404).json({success: false, error: "Department not found"});
        }
        return res.status(200).json({success: true, department});
    } catch (error) {
        console.error("Error fetching department:", error);
        return res.status(500).json({success: false, error: "Server Error while fetching department"});
    }
};

const editDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {department_name} = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate({_id: id}, { // Simplified the update query
            department_name
        })

        return res.status(200).json({success: true, updatedDepartment});
    } catch (error) {
        console.error("Error updating department:", error);
        return res.status(500).json({success: false, error: "Server Error while editing department"});
    }
};


const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedDepartment = await Department.findByIdAndDelete({_id: id})

        return res.status(200).json({success: true, deletedDepartment});
    } catch (error) {
        console.error("Error updating department:", error);
        return res.status(500).json({success: false, error: "Server Error while deleting department"});
    }
}

export {getDepartments, addDepartment, getDepartment, editDepartment, deleteDepartment}
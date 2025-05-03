import Assign from "../models/Assign.js"


const addAssign = async (req, res) =>{
    try {
        const {employeeId, assetId, assignDate} = req.body

        const newAssign = new Assign({
            employeeId, 
            assetId, 
            assignDate
        })

        await newAssign.save()

        return res.status(200).json({success: true})

    } catch (error) {
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const getAssign = async (req, res) => {
    try {
        const {id} = req.params
        const assign = await Assign.find({employeeId: id}).populate('employeeId', 'employeeId').populate('assetId', 'assetId');
        return res.status(200).json({success: true, assign})
    } catch (error) {
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

export {addAssign, getAssign}
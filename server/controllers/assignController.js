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

export {addAssign}
import Asset from '../models/Asset.js'
import Department from '../models/Department.js'
import multer from 'multer';
import path from 'path';
import Assign from '../models/Assign.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assetuploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})



const addAsset = async (req, res) => {
    try {
        console.log("Received data:", req.body)
        const {assetId, modelNo, assetType, location, department} = req.body
        const newAsset = new Asset ({
            assetId,
            modelNo,
            assetType,
            location,
            department
        })
        await newAsset.save()
        console.log(newAsset);
        
        return res.status(200).json({success: true, message: "asset created"})
    } catch (error) {
        console.error("Error saving asset:", error);
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const getAssets = async (req, res) => {
    try {
        const assets = await Asset.find().populate('department')
        console.log(assets);
        
        return res.status(200).json({success: true, assets})
    } catch (error) {
        return res.status(500).json({success: false, error: "get assets Server Error"})
    }
}

const getAsset = async (req, res) => {
    try {
        const {id} = req.params;
        const asset = await Asset.findById({_id: id}).populate('department'); 
        if (!asset) {
            return res.status(404).json({success: false, error: "Asset not found"});
        }
        return res.status(200).json({success: true, asset});
    } catch (error) {
        console.error("Error fetching asset:", error);
        return res.status(500).json({success: false, error: "Server Error while fetching asset"});
    }
};

const editAsset = async (req, res) => {
    try {
        const {id} = req.params;
        const {assetId, modelNo, assetType, location, department} = req.body;

        const asset = await Asset.findById({_id: id});
        if (!asset) {
            return res.status(404).json({ success: false, error: "Asset not found" });
        }

        const updatedAsset = await Asset.findByIdAndUpdate({_id: id}, { 
            assetId,
            modelNo,
            assetType,
            location,
            department
        },
        { new: true }
    )

        if (!updatedAsset) {
            return res.status(404).json({success: false, error: "Document not found"});
        }

        return res.status(200).json({success: true, message: "Asset Updated"});
    } catch (error) {
        console.error("Error updating asset:", error);
        return res.status(500).json({success: false, error: "Server Error while editing asset"});
    }
};


const deleteAsset = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedAsset = await Asset.findByIdAndDelete({_id: id})

        return res.status(200).json({success: true, deletedAsset});
    } catch (error) {
        console.error("Error updating asset:", error);
        return res.status(500).json({success: false, error: "Server Error while deleting asset"});
    }
}

const fetchAssetsById = async (req, res) => {
    const {id} = req.params
    console.log('dep id', id);
    
    try {
        const assignedAssets = await Assign.find().distinct('assetId');
        const assets = await Asset.find({
            department: id,
            _id: { $nin: assignedAssets }
        }).populate('department');

        return res.status(200).json({ success: true, assets });
    } catch (error) {
        console.error("Error fetching unassigned assets:", error);
        return res.status(500).json({ success: false, error: "get assetsByDepId Server Error" });
        // return res.status(500).json({success: false, error: "get assetsByDepId Server Error"})
    }
}

export {addAsset, getAssets, upload, getAsset, editAsset, deleteAsset, fetchAssetsById}

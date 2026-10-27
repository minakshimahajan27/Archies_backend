// import Package from '../models/packageModel.js';

// // @desc    Add New Package
// // @route   POST /api/packages/add
// export const addPackage = async (req, res) => {
//     try {
//         const { packageName, category, price, description, packageImage } = req.body;

//         const newPackage = new Package({
//             packageName,
//             category,
//             price,
//             description,
//             packageImage
//         });

//         const savedPackage = await newPackage.save();
//         res.status(201).json({ success: true, message: "Package Added!", data: savedPackage });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// // @desc    Get All Packages
// // @route   GET /api/packages/all
// export const getAllPackages = async (req, res) => {
//     try {
//         const packages = await Package.find().sort({ createdAt: -1 });
//         res.status(200).json({ success: true, count: packages.length, data: packages });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

import Package from '../models/packageModel.js';

// @desc    Add New Package
// @route   POST /api/packages/add
export const addPackage = async (req, res) => {
    try {
        const { packageName, category, price, description } = req.body;
        
        // Agar file upload hui hai toh uska filename lein, warna purana body wala URL lein ya empty rakhein
        let imagePath = "";
        if (req.file) {
            imagePath = req.file.filename; // Sirf filename save hoga: "17138...jpg"
        } else if (req.body.packageImage) {
            imagePath = req.body.packageImage;
        }

        const newPackage = new Package({
            packageName,
            category,
            price,
            description,
            packageImage: imagePath
        });

        const savedPackage = await newPackage.save();
        res.status(201).json({ success: true, message: "Package Added Successfully!", data: savedPackage });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get All Packages
// @route   GET /api/packages/all
export const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: packages.length, data: packages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// controller/packageController.js

// Update Package
export const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (req.file) {
            updateData.packageImage = req.file.filename;
        }
        const updated = await Package.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Package
export const deletePackage = async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Package Deleted" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
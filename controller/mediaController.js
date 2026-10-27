// import Media from '../models/mediaModel.js';

// export const addMedia = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: "File upload nahi hui!" });
//         }

//         // 1. Category ko bhi destructure karein
//         const { title, mediaType, category } = req.body; 

//         // 2. Model mein category pass karein
//         const newMedia = new Media({
//             title,
//             mediaType,
//             category, // Yeh zaroori hai
//             fileUrl: req.file.filename 
//         });

//         await newMedia.save();
//         res.status(201).json({ success: true, message: "Media Uploaded!", data: newMedia });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const getAllMedia = async (req, res) => {
//     try {
//         const media = await Media.find().sort({ createdAt: -1 });
//         res.status(200).json({ success: true, data: media });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// // export const deleteMedia = async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         // 1. Pehle database mein media ko dhundein
// //         const media = await Media.findById(id);

// //         if (!media) {
// //             return res.status(404).json({ success: false, message: "Media nahi mila!" });
// //         }

// //         // 2. Physical file ka path banayein
// //         const filePath = path.join(process.cwd(), 'uploads', media.fileUrl);

// //         // 3. Database se delete karein
// //         await Media.findByIdAndDelete(id);

// //         // 4. Folder se file delete karein (fs.unlink)
// //         fs.unlink(filePath, (err) => {
// //             if (err) {
// //                 console.error("File delete karne mein error:", err);
// //                 // Hum response bhej chuke honge ya error ignore kar sakte hain agar record delete ho gaya hai
// //             }
// //         });

// //         res.status(200).json({ success: true, message: "Media and File Deleted Successfully!" });
// //     } catch (error) {
// //         console.error("Delete Error:", error);
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // };
// export const deleteMedia = async (req, res) => {
//     try {
//         const { id } = req.params; // URL se ID nikalna

//         const media = await Media.findById(id);
//         if (!media) {
//             return res.status(404).json({ success: false, message: "Media nahi mila!" });
//         }

//         // Physical file delete karna (optional but recommended)
//         if (media.fileUrl) {
//             const filePath = path.join(process.cwd(), 'uploads', media.fileUrl);
//             if (fs.existsSync(filePath)) {
//                 fs.unlinkSync(filePath);
//             }
//         }

//         // Database se delete karna
//         await Media.findByIdAndDelete(id);

//         res.status(200).json({ success: true, message: "Media deleted successfully!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export const updateMedia = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, mediaType, category, videoUrl } = req.body;

//         // 1. Pehle database mein media ko dhoondein
//         let media = await Media.findById(id);

//         if (!media) {
//             return res.status(404).json({ success: false, message: "Media nahi mila!" });
//         }

//         // 2. Data taiyar karein jo update karna hai
//         let updateData = {
//             title: title || media.title,
//             mediaType: mediaType || media.mediaType,
//             category: category || media.category,
//             videoUrl: videoUrl || media.videoUrl
//         };

//         // 3. Check karein kya user ne nayi file upload ki hai?
//         if (req.file) {
//             // Purani physical file ko delete karein (agar photo thi)
//             if (media.fileUrl) {
//                 const oldFilePath = path.join(process.cwd(), 'uploads', media.fileUrl);
//                 if (fs.existsSync(oldFilePath)) {
//                     fs.unlinkSync(oldFilePath); // Purani file delete
//                 }
//             }
//             // Nayi file ka naam updateData mein add karein
//             updateData.fileUrl = req.file.filename;
//         }

//         // 4. Database update karein
//         const updatedMedia = await Media.findByIdAndUpdate(
//             id,
//             { $set: updateData },
//             { new: true } // updated data return karega
//         );

//         res.status(200).json({
//             success: true,
//             message: "Media updated successfully!",
//             data: updatedMedia
//         });

//     } catch (error) {
//         console.error("Update Error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

import Media from '../models/mediaModel.js';
import fs from 'fs';
import path from 'path';

// 1. Add Media
export const addMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "File upload nahi hui!" });
        }

        const { title, mediaType, category, videoUrl } = req.body; 

        const newMedia = new Media({
            title,
            mediaType,
            category,
            videoUrl: videoUrl || "",
            file: req.file.filename // 👈 Model ke field 'file' ke sath matched
        });

        await newMedia.save();
        res.status(201).json({ success: true, message: "Media Uploaded!", data: newMedia });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get All Media
export const getAllMedia = async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: media });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Delete Media
export const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ success: false, message: "Media nahi mila!" });
        }

        // Physical file delete karna uploads folder se
        if (media.file) {
            const filePath = path.join(process.cwd(), 'uploads', media.file); // 👈 'file' use kiya
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Database se delete karna
        await Media.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Media deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Update Media
export const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, mediaType, category, videoUrl } = req.body;

        let media = await Media.findById(id);
        if (!media) {
            return res.status(404).json({ success: false, message: "Media nahi mila!" });
        }

        let updateData = {
            title: title || media.title,
            mediaType: mediaType || media.mediaType,
            category: category || media.category,
            videoUrl: videoUrl || media.videoUrl
        };

        // Check karein kya user ne nayi file upload ki hai?
        if (req.file) {
            if (media.file) {
                const oldFilePath = path.join(process.cwd(), 'uploads', media.file); // 👈 'file' use kiya
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }
            updateData.file = req.file.filename; // 👈 Nayi file ka naam 'file' mein save hoga
        }

        const updatedMedia = await Media.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Media updated successfully!",
            data: updatedMedia
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
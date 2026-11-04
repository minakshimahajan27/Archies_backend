import FashionShow from '../models/fashionShowModel.js';
import FashionShowRegistration from '../models/fashionShowRegistrationModel.js';
// 1. Create Event (POST)
export const createFashionShow = async (req, res) => {
    try {
        const { title, description, eventDate, venue, categories } = req.body;
        
        // Multer se aayi hui files ke paths
        const banner = req.files?.banner ? req.files.banner[0].path : '';
        const qrCode = req.files?.qrCode ? req.files.qrCode[0].path : '';

        const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;

        const newShow = new FashionShow({
            title,
            description,
            eventDate,
            venue,
            categories: parsedCategories,
            banner,
            qrCode
        });

        await newShow.save();
        res.status(201).json({ success: true, message: 'Fashion show created successfully', data: newShow });
    } catch (err) {
        console.error("Create Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// 2. Get All Events (GET)
export const getAllFashionShows = async (req, res) => {
    try {
        const shows = await FashionShow.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: shows });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 3. Update Event (PUT) - **यह रही Update की API**
export const updateFashionShow = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, eventDate, venue, categories } = req.body;

        let updateData = {
            title,
            description,
            eventDate,
            venue
        };

        if (categories) {
            updateData.categories = typeof categories === 'string' ? JSON.parse(categories) : categories;
        }

        // Agar nayi banner image upload ki hai toh use update karein
        if (req.files?.banner) {
            updateData.banner = req.files.banner[0].path;
        }

        // Agar naya QR code upload kiya hai toh use update karein
        if (req.files?.qrCode) {
            updateData.qrCode = req.files.qrCode[0].path;
        }

        const updatedShow = await FashionShow.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedShow) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, message: 'Fashion show updated successfully', data: updatedShow });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// 4. Delete Event (DELETE)
export const deleteFashionShow = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedShow = await FashionShow.findByIdAndDelete(id);

        if (!deletedShow) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        res.status(200).json({ success: true, message: 'Fashion show deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 5. User Registration (POST)
export const registerForFashionShow = async (req, res) => {
    try {
        const { eventId, name, email, phone, categoryName, fee, transactionId } = req.body;

        const newRegistration = new FashionShowRegistration({
            eventId,
            name,
            email,
            phone,
            categoryName,
            fee,
            transactionId
        });

        await newRegistration.save();
        res.status(201).json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 6. Get All Registrations for Admin (GET)
export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await FashionShowRegistration.find().populate('eventId').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: registrations });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
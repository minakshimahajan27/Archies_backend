import FashionShow from '../models/fashionShowModel.js';
import FashionShowRegistration from '../models/fashionShowRegistrationModel.js';

// 1. Get Active Fashion Show Info (Frontend Homepage ke liye)
export const getActiveFashionShow = async (req, res) => {
    try {
        const show = await FashionShow.findOne({ isActive: true });
        res.status(200).json({ success: true, data: show });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Admin: Create or Update Event Details & Active Status
export const updateFashionShowDetails = async (req, res) => {
    try {
        const { title, description, eventDate, venue, registrationFee, isActive } = req.body;
        
        let show = await FashionShow.findOne();
        const qrCodeImage = req.file ? req.file.path : (show ? show.qrCodeImage : '');

        if (show) {
            show.title = title;
            show.description = description;
            show.eventDate = eventDate;
            show.venue = venue;
            show.registrationFee = registrationFee;
            show.isActive = isActive === 'true' || isActive === true;
            if (req.file) show.qrCodeImage = qrCodeImage;
            await show.save();
        } else {
            show = new FashionShow({
                title, description, eventDate, venue, registrationFee, qrCodeImage, isActive
            });
            await show.save();
        }

        res.status(200).json({ success: true, message: 'Fashion Show details updated successfully!', data: show });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Student Registration & Entry Pass Generation
export const registerForFashionShow = async (req, res) => {
    try {
        const { studentName, email, phone, transactionId } = req.body;
        const paymentScreenshot = req.file ? req.file.path : '';

        // Random Unique Pass Code Generate Karein
        const passCode = 'FS-' + Math.floor(100000 + Math.random() * 900000);

        const registration = new FashionShowRegistration({
            studentName,
            email,
            phone,
            transactionId,
            paymentScreenshot,
            passCode
        });

        await registration.save();

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            passDetails: {
                studentName,
                email,
                phone,
                passCode,
                createdAt: registration.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Admin: Get All Student Registrations for Fashion Show
export const getAllFashionShowRegistrations = async (req, res) => {
    try {
        const registrations = await FashionShowRegistration.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Admin: Delete Student Registration
export const deleteFashionShowRegistration = async (req, res) => {
    try {
        const deletedRegistration = await FashionShowRegistration.findByIdAndDelete(req.params.id);
        if (!deletedRegistration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Registration deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
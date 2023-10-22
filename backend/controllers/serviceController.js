import asyncHandler from '../middleware/asyncHandler.js';
import Service from '../models/serviceModel.js';
import AppError from '../middleware/appError.js';


// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find({});
    res.status(200).json(services);
})

// // @desc    Delete a service
// // @route   DELETE /api/services/:id
// // @access  Private/Admin
export const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        await Service.deleteOne({ _id: service._id });
        res.status(204).json({
            message: 'Service removed'
        });
    } else {
        return next(new AppError('No service found with that ID', 404))
    }
});

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (service) {
        res.status(200).json(
            service
        );
    } else {
        return next(new AppError('No service found with that ID', 404))
    }
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res) => {
    const service = new Service({
        name: `Sample name ${[...Array(4)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`,
        // user: req.user._id,
        regularPrice: 10,
        discount: 0,
        image: '/services/sample.jpg',
        description:
            "The \"Windsurfing\" service at the hotel is a water sports activity held at sea, combining windsurfing and windsurfing. Visitors can experience the harmony between wind and ocean waves in a safe and professional environment. This service includes the loan of windsurfing equipment and instruction for beginners. Windsurfing is a fun activity to relax and enjoy the sea on a beautiful sunny day.",
        checked: false
    });

    const createdService = await service.save();

    res.status(201).json(
        createdService
    )
});



// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res) => {
    const { name, regularPrice, discount, image, description } =
        req.body;

    const service = await Service.findById(req.params.id);

    if (service) {
        // Chỉ cập nhật các trường khác khi cần
        if (name) {
            service.name = name;
        }
        if (regularPrice) {
            service.regularPrice = regularPrice;
        }
        if (discount) {
            service.discount = discount;
        }
        if (description) {
            service.description = description;
        }

        // Nếu có image mới được cung cấp, thì cập nhật image
        if (image) {
            service.image = `${image.replace(/\\/g, '/')}`;
        }

        const updatedService = await service.save();
        res.status(200).json(updatedService);
    } else {
        return next(new AppError('No service found with that ID', 404))
    }
});


import asyncHandler from '../middleware/asyncHandler.js';
import Cabin from '../models/cabinModel.js';

// @desc    Fetch all cabins
// @route   GET /api/cabins
// @access  Public
export const getCabins = asyncHandler(async (req, res) => {
    const cabins = await Cabin.find({});
    res.json(cabins);
})

// // @desc    Delete a cabin
// // @route   DELETE /api/cabins/:id
// // @access  Private/Admin
export const deleteCabin = asyncHandler(async (req, res) => {
    const cabin = await Cabin.findById(req.params.id);

    if (cabin) {
        await Cabin.deleteOne({ _id: cabin._id });
        res.json({ message: 'Cabin removed' });
    } else {
        res.status(404);
        throw new Error('Cabin not found');
    }
});

// @desc    Fetch single cabin
// @route   GET /api/cabins/:id
// @access  Public
export const getCabinById = asyncHandler(async (req, res) => {
    const cabin = await Cabin.findById(req.params.id);
    if (cabin) {
        return res.json(cabin);
    }
    res.status(404);
    throw new Error('Cabin not found');
});

// // @desc    Create a cabin
// // @route   POST /api/cabins
// // @access  Private/Admin
export const createCabin = asyncHandler(async (req, res) => {
    const createdCabin = await Cabin.create(req.body);
    res.status(201).json(createdCabin);
});

// // @desc    Update a product
// // @route   PUT /api/products/:id
// // @access  Private/Admin
// const updateProduct = asyncHandler(async (req, res) => {
//     const { name, price, description, image, brand, category, countInStock } =
//         req.body;

//     const product = await Product.findById(req.params.id);

//     if (product) {
//         product.name = name;
//         product.price = price;
//         product.description = description;
//         product.image = image;
//         product.brand = brand;
//         product.category = category;
//         product.countInStock = countInStock;

//         const updatedProduct = await product.save();
//         res.json(updatedProduct);
//     } else {
//         res.status(404);
//         throw new Error('Product not found');
//     }
// });


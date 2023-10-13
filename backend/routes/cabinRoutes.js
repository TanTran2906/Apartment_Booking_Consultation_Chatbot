import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import Cabin from '../models/cabinModel.js';

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const cabins = await Cabin.find({});
        res.json(cabins);
    })
);

router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const cabin = await Cabin.findById(req.params.id);
        if (cabin) {
            return res.json(cabin);
        }
        res.status(404).json({ message: 'Cabin not found' });
    })
);

export default router;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import cabins from './data/cabins.js';
import bookings from './data/bookings.js';
import users from './data/users.js';
import services from './data/services.js';
import invoices from './data/invoices.js';

import User from './models/userModel.js';
import Service from './models/serviceModel.js';
import Invoice from './models/invoiceModel.js';
import Cabin from './models/cabinModel.js';
import Booking from './models/bookingModel.js';

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Cabin.deleteMany();
        await Service.deleteMany();
        await Booking.deleteMany();
        await Invoice.deleteMany();

        // ==== Thêm data cabin kèm theo id admin
        // const createdUsers = await User.insertMany(users);

        // const adminUser = createdUsers[0]._id;

        // const sampleCabins = cabins.map((cabin) => {
        //     return { ...cabin, user: adminUser };
        // });

        await Cabin.insertMany(cabins);
        await User.insertMany(users);
        await Service.insertMany(services);
        await Booking.insertMany(bookings);
        await Invoice.insertMany(invoices);

        console.log('Data Imported!'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Cabin.deleteMany();
        await Service.deleteMany();
        await Booking.deleteMany();
        await Invoice.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

console.log(process.argv)

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
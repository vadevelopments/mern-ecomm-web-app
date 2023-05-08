const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB Atlas cluster: ${mongoose.connection.host}, database: ${mongoose.connection.db.databaseName}`);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose connection error: ${err}`);
    });
};

module.exports = connectDB;
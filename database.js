const mongoose = require('mongoose');

async function connectToDatabase() {
    await mongoose.connect(process.env.MONGO_URI + process.env.MONGO_DATABASE);
};

exports.connectToDatabase = connectToDatabase;
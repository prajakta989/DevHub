const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    // await mongoose.connect("mongodb+srv://prajaktanaik98:a36lMBl80yRmWq2L@namastenodejs.ta97o.mongodb.net/DevHub")
}

module.exports = connectDB;
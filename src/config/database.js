const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://prajaktanaik98:a36lMBl80yRmWq2L@namastenodejs.ta97o.mongodb.net/DevHub")
}


module.exports = connectDB;
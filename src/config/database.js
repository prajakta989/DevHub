const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://prajaktanaik98:aimJPRNFliNZlvIY@namastenodejs.ta97o.mongodb.net/")
}


module.exports = connectDB;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        const count = await mongoose.models.User.countDocuments({
          emailId: value,
        });
        return count === 0;
      },
      message: (props) => `${props.value} already exists!`,
    },
    index: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 50,
  },
  gender: {
    type: String,
    validate: {
      validator: async function (value) {
        if (!["Male", "Female", "Others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
  },
  about: {
    type: String,
    default: "This is default about information about the user",
  },
  skills: {
    type: [String],
  },
},{
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;

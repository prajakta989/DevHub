const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator")

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      match: /^[A-Za-z\s'-]+$/,
      minLength: 3,
      maxLength: 255,
    },
    lastName: {
      type: String,
      match: /^[A-Za-z\s'-]+$/,
      minLength: 3,
      maxLength: 255,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: async function (value) {
            const count = await mongoose.models.User.countDocuments({
              emailId: value,
            });
            return count === 0;
          },
          message: (props) => `${props.value} already exists!`,
        },
        {
          validator: validator.isEmail,
          message: 'Invalid email format',
        },
      ],
      index: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // validate: {
      //   validator: function(value){
      //     return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      //   },
      //   message: "Password must be at least 8 characters long and include uppercase, number, and special character."
      // }
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
      default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
      validate:{
          validator: validator.isURL,
          message: 'Invalid URL format',
      }
    },
    about: {
      type: String,
      default: "This is default about information about the user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v); // Indian 10-digit numbers starting from 6-9
        },
        message: (props) =>
          `${props.value} is not a valid Indian mobile number!`,
      },
    },
    registerceritificatenumber: {
      type: String,
      required: true,
    },
    financial: {
      type: String,
      required: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: {
      type: String,
      required: true,
    },
    gstnumber: {
      type: String,
      required: true,
      uppercase: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid GST number!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", postSchema);
export default Lead;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Indian mobile number!`,
      },
    },
    Is_super_Admin: {
      type: Boolean,
      required: true,
    },
    Is_login: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fcmtoken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// 🔐 Method to compare passwords (optional)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

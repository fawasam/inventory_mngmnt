const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
      // maxlength: [23, "Password must not be more than 23 characters"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    photo: {
      type: String,
      required: [true, "Please add a photo "],
      default:
        "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
    },
    phone: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio must not be more than 250 characters"],
      default: "add some bio",
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//  Encrypt password before saving to db
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);

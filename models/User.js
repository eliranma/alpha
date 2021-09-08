const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  // The hashed_password and salt fields represent the encrypted user password
  // The actual password is not stored in the database for security
  // purposes and is handled separately

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  favoriteOrders: {
    type: Array,
  },
  historyOrders: {
    type: Array,
  },
});

userSchema
  .virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });
//The password string that's provided by the user is not stored directly in the user document.
// Instead, it is handled as a virtual field.

userSchema.methods.authenticate= (plainText) => {
  return this.encryptPassword(plainText) === this.hashed_password; 
}
  // authenticate : This method is called to verify sign-in attempts by matching the
  // user-provided password text with the hashed_password stored
  // in the database for a specific user.

  

  // encryptPassword : This method is used to generate an encrypted hash from the
  // plain-text password and a unique salt value using the crypto module from Node.
  userSchema.methods.encryptPassword= (password) => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
  // makeSalt : This method generates a unique and random salt value using
  // the current timestamp at execution and Math.random() .
  userSchema.methods.makeSalt= () => {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }


// These UserSchema methods are used to encrypt the user-provided password string
// into a hashed_password with a randomly generated salt value. The hashed_password
// and the salt are stored in the user document when the user details are saved to the
// database on a create or update. Both the hashed_password and salt values are required
// in order to match and authenticate a password string provided during user sign-in
// using the authenticate method. We should also ensure the user selects a strong password
// string to begin with, which can done by adding custom validation to the passport field.

userSchema.path("hashed_password").validate((v) => {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

module.exports = mongoose.model("Users", userSchema);
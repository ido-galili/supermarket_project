const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    idNumber: {
      // User ID
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      // Email
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        return validator.isEmail(value);
      }
    },
    password: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: false
    },
    street: {
      type: String,
      required: false
    },
    // 1 - Admin, Customer - 2 
    role: { 
      type: Number,
      default: 2
    }
  },
  {
    timestamps: true
  }
);

const saltRounds = 10;

UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds,
            function(err, hashedPassword) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);

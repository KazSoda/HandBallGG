const mongoose = require('mongoose');
const validate = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'Vous devez spécifiez un prénom'],
        length: 64,
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'Vous devez spécifiez un nom'],
        length: 64,
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Vous devez spécifiez une adresse mail'],
        length: 64,
        validate: validate.isEmail,
    },

    role: {
        type: String,
        enum: {
            values: ["Admin", "User"],
            message: "le role doit être soit User soit Admin"
        },
        trim: true,
        required: [true, 'Vous devez spécifiez un role'],
        length: 64,
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Vous devez spécifiez un mot de passe'],
    },

    passwordConfirm: {
        type: String,
        trim: true,
        validate: {
            validator: function (passwordConfirmed) {
                return passwordConfirmed === this.password;
            },
            message: "Les mots de passe ne correspondent pas"
        },
        required: [true, 'Vous devez spécifiez de nouveau le mot de passe'],
    },

})

// When saving the password, encrypt it
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 14);
    this.passwordConfirm = undefined;

    next();
})

// Compare the password against the encrypted one
userSchema.methods.correctPassword = function (candidatePassword, correctPassword) {
    return bcrypt.compare(candidatePassword, correctPassword);
}

// Check if the password has been changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimestamp;
    }

    // False = Not changed
    return false;
}




const User = mongoose.model('User', userSchema);
module.exports = User;
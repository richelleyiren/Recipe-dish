const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [5, "Please the password length should at least be five"]
    },
})
// before we save to the
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})
// UserSchema.post('save', function() {
//     console.log(this)
// })
const User = mongoose.model("User", UserSchema);
module.exports = User;








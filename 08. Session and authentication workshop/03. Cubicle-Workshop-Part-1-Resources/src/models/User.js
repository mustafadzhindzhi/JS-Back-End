const mongoose  = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   username: String,
   password: String 
});

//C->S->[virtual properties] -> DB

//if the user already exists, throw Eror
userSchema.virtual('repeatPassword').set(function (value) {
    if(value !== this.password) {
        throw new mongoose.MongooseError("Password missmatch!");
    }
});

userSchema.pre('save', async function() {
    //this.passwordword, salt rounds
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
}) 

const User = mongoose.model('User', userSchema);

module.exports = User;
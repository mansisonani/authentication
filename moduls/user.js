const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fdata = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
});

const final = mongoose.model('drum', fdata);
module.exports=  final;
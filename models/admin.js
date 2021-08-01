const mongoose = require('mongoose')

// ADmin model
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Admin model
module.exports = mongoose.model('Admin', adminSchema)
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Number },
    updateDate: { type: Number },
    mail: { type: String,  required: true },
    status: { type: String },
    sellingState: { type: String },
    location: { type: String },
    shipping: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    userId: { type: String, required: false, ref: 'User'},
},
    { versionKey: false }
);

module.exports = mongoose.model('Post', postSchema);

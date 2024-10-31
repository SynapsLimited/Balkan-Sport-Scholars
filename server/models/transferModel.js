const { Schema, model } = require('mongoose');

const transferSchema = new Schema({
    fullName: { type: String, required: true },
    previousClub: { type: String, required: true },
    currentClub: { type: String, required: true },
    description: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Transfer', transferSchema);

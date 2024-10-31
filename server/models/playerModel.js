const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    name: { type: String, required: true },
    clubname: { type: String, required: true },
    image: { type: String, required: true },
    dob: { type: Date, required: true },
    sex: { type: String, enum: ['Male', 'Female', 'Non-binary'], required: true },
    sport: { type: String, required: true },
    position: { type: String, required: true },
    nationality: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    preferredFootHand: { type: String, required: true },
    description: { type: String, required: true },
    videoLink: { type: String, required: false },
    documents: [{ type: String, required: false }]  // Array of document paths
}, { timestamps: true });

module.exports = model('Player', playerSchema);

// models/playerModel.js

const { Schema, model } = require('mongoose');

const playerSchema = new Schema(
  {
    name: { type: String, required: true },
    clubname: { type: String },
    dob: { type: Date },
    sex: { type: String, enum: ['Male', 'Female', 'Non-binary'] },
    sport: { type: String },
    sport_en: { type: String },
    position: { type: String },
    position_en: { type: String },
    nationality: { type: String },
    nationality_en: { type: String },
    height: { type: Number },
    weight: { type: Number },
    preferredFootHand: { type: String },
    preferredFootHand_en: { type: String },
    description: { type: String },
    description_en: { type: String },
    videoLink: { type: String },
    image: { type: String },
    documents: [{ type: String }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = model('Player', playerSchema);

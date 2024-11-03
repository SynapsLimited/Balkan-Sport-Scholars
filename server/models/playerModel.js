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

    // Separate arrays for documents
    documentNames: {
      type: [String],
      default: [],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10 documents'],
    },
    documentNames_en: {
      type: [String],
      default: [],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10 documents'],
    },
    documentUrls: {
      type: [String],
      default: [],
      validate: [arrayLimit, '{PATH} exceeds the limit of 10 documents'],
    },

    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { 
    timestamps: true,
    strict: true // Ensure strict mode is enabled
  }
);

// Custom validator to limit the number of documents to 10
function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = model('Player', playerSchema);

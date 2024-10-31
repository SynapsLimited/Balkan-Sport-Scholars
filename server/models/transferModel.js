// models/transferModel.js

const { Schema, model } = require('mongoose');

const transferSchema = new Schema(
  {
    fullName: { type: String, required: true },
    previousClub: { type: String },
    currentClub: { type: String },
    description: { type: String },
    description_en: { type: String },
    youtubeLink: { type: String },
    image: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = model('Transfer', transferSchema);

const { Schema, model } = require('mongoose');

const transferSchema = new Schema(
  {
    fullName: { type: String, required: true },
    previousClub: { type: String, required: true },
    currentClub: { type: String, required: true },
    description: { type: String, required: true },
    description_en: { type: String },
    youtubeLink: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Transfer', transferSchema);

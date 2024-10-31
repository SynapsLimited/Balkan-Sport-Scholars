// models/postModel.js

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    title_en: { type: String },
    category: {
      type: String,
      enum: [
        'Uncategorized',
        'Football',
        'Basketball',
        'Volleyball',
        'Rugby',
        'Tennis',
        'E-Sports',
        'Other',
      ],
      message: '{VALUE} is not supported',
    },
    description: { type: String, required: true },
    description_en: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Post', postSchema);

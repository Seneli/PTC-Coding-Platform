const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Submissions = new Schema(
  {
    userId: { type: mongoose.ObjectId, ref: 'user' },
    question: String,
    //uploadDate: String,
    fileKey: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('submissions', Submissions);


import User from '../user/user.model';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Page = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    slug: {
      type: String,
      required: true,
    },
    user: {
      type: String
    },
    content: Object,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Pages', Page);

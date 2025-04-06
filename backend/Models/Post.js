import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    related_area: { type: [String], default: []  },
    content: { type: String, required: true },
    author_name: { type: String, required: true },
    reference_links: { type: [String], default: [] },
    replies: { type: [String], default: [] },
    username: { type: String, required: true },
  });
  

const post= mongoose.model('post', postSchema);
export default post;
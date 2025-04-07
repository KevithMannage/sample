import mongoose from 'mongoose';

// Define the schema for individual discussion subscriptions
const DiscussionSubscriptionSchema = new mongoose.Schema({
  discussion_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discussion', required: true },
  last_viewed: { type: Date, default: Date.now },
});

// Define the schema for subscribed discussions
const SubscribedDiscussionsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  discussion_ids: { type: [DiscussionSubscriptionSchema], default: [] },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

const SubscribedDiscussions = mongoose.model('SubscribedDiscussions', SubscribedDiscussionsSchema);

export default SubscribedDiscussions;
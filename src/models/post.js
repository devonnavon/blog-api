import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	timestamp: { type: Date, default: new Date() },
	published: { type: Boolean },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);

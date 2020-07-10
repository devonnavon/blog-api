import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	text: { type: String, required: true },
	timestamp: { type: Date, default: new Date() },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Comment', CommentSchema);

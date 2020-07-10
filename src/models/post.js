import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    published: { type: Boolean },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

PostSchema.pre('remove', function (next) {
  this.model('Comment').deleteMany({ post: this._id }, next);
});

module.exports = mongoose.model('Post', PostSchema);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });
  return user;
};

UserSchema.pre('remove', function (next) {
  this.model('Post').deleteMany({ user: this._id }, next);
});

module.exports = mongoose.model('User', UserSchema);

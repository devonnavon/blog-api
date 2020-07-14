import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

UserSchema.pre(
  'save',
  function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    });
  },
  function (err) {
    next(err);
  },
);

// UserSchema.methods.comparePassword = function (
//   candidatePassword,
//   next,
// ) {
//   bcrypt.compare(candidatePassword, this.password, function (
//     err,
//     isMatch,
//   ) {
//     if (err) return next(err);
//     next(null, isMatch);
//   });
// };

UserSchema.methods.comparePassword = async function (
  candidatePassword,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

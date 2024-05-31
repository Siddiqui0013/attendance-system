import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  attendance: [
    {
      date: { type: Date, default: Date.now },
      status: { type: String, default: 'present' },
    }
  // ],
  // leaves: [
  //   {
  //     date: { type: Date, default: Date.now },
  //     status: { type: String, default: 'pending' },
  //   }
  ],
});

const User = mongoose.model('User', UserSchema);
export default User;

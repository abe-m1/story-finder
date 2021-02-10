import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  username: {
    /* The name of this pet */

    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  password: {
    /* The owner of this pet */

    type: String,
    required: [true, "Please provide the pet owner's name"],
    // maxlength: [20, "Owner's Name cannot be more than 60 characters"],
  },
  salt: {
    type: String,
  },
  onboardingComplete: {
    type: Boolean,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

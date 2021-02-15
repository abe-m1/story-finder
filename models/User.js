import mongoose from 'mongoose';

/* PetSchema will correspond to a collection in your MongoDB database. */
const markerSchema = new mongoose.Schema({
  position: { type: Object },
  userId: { type: String },
  userImage: { type: String },
  userName: { type: String },
  type: { type: String },
});

const challengesSchema = new mongoose.Schema({
  challengeNumber: { type: String },
  type: { type: String },
  position: { type: Object },
  challengeImage: { type: String },
  challengeType: { type: String },
  challengeType: { type: String },
  challengeId: { type: String },
  challengeName: { type: String },
  challengeDescription: { type: String },
  responseDescription: { type: String },
  connectionId: { type: String },
  challengeResponse: { type: String },
});

const connectionSchema = new mongoose.Schema({
  name: { type: String },
  connectionType: { type: String },
  connectionImage: { type: String },
  position: { type: Object },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  salt: {
    type: String,
  },
  onboardingComplete: {
    type: Boolean,
  },

  onboardingStep: {
    type: Number,
    default: 1,
  },
  age: {
    type: Number,
  },
  image_url: {
    type: String,
  },

  name: {
    type: String,
  },

  position: {
    type: Object,
  },
  nextChallengeIndex: {
    type: Number,
    default: 0,
  },
  tree: { type: String },
  connections: [connectionSchema],
  markers: [markerSchema],
  challenges: [challengesSchema],
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

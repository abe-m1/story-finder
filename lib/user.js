import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '../utils/dbConnect';
import User from '../models/User';

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

// const users = [];

export async function createUser({ username, password }) {
  await dbConnect();
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  // const user = {
  //   id: uuidv4(),
  //   createdAt: Date.now(),
  //   username,
  //   hash,
  //   salt,
  // };

  const user = new User({
    username,
    password: hash,
    salt,
  });

  // This is an in memory store for users, there is no data persistence without a proper DB
  // users.push(user);
  await user.save();
  console.log('this is user', user);

  return { username, createdAt: Date.now() };
}

// Here you should lookup for the user in your DB
export async function findUser({ username }) {
  console.log('this is username', username);
  await dbConnect();
  // This is an in memory store for users, there is no data persistence without a proper DB
  return User.findOne({ username });
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  console.log('us', user, inputPassword);
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const passwordsMatch = user.password === inputHash;
  return passwordsMatch;
}

import Local from 'passport-local';
import { findUser, validatePassword } from './user';

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done
) {
  console.log('in here', username);
  findUser({ username })
    .then((user) => {
      console.log('this is user', user);
      if (user && validatePassword(user, password)) {
        done(null, user);
      } else {
        done(new Error('Invalid username and password combination'));
      }
    })
    .catch((error) => {
      console.log('FOUND');
      done(error);
    });
});

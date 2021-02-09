import { getLoginSession } from '../../lib/auth';
import { findUser } from '../../lib/user';

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req);
    console.log('this is session', session);
    const user = (session && (await findUser(session._doc))) ?? null;
    console.log('this is session user', user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('ERRoR', error);
    res.status(500).end('Authentication token is invalid, please log in');
  }
}

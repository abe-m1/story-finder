import { useUser } from '../../lib/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import challenges from '../../public/data.json';
import ChallengeDialog from '../../components/ChallengeDialog';
import Layout from '../../components/layout';

const Post = () => {
  const user = useUser();
  const router = useRouter();

  const [currentChallenge, setCurrentChallenge] = useState({});
  const [addConnection, setAddConnection] = useState(false);

  useEffect(() => {
    let challenge = challenges.find(
      (item) => item.id === parseInt(router.query.id)
    );
    console.log(challenge);
    setCurrentChallenge(challenge);
  });
  const { id } = router.query;

  const onSuccessSubmit = () => {
    setAddConnection(false);
  };

  const onClose = useCallback(() => {
    setAddConnection(false);
  }, []);

  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <p>Post: {id}</p>
      <p>{currentChallenge.challengeName}</p>
      <button onClick={() => setAddConnection(true)}>Complete Challenge</button>
      <ChallengeDialog
        challenge={currentChallenge}
        user={user}
        userId={user._id}
        onSuccessSubmit={onSuccessSubmit}
        addConnection={addConnection}
        onClose={onClose}
      />
    </Layout>
  );
};

export default Post;

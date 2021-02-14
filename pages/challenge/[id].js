import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import challenges from '../../public/data.json';
import Layout from '../../components/layout';

const Post = () => {
  const router = useRouter();
  const [currentChallenge, setCurrentChallenge] = useState({});
  useEffect(() => {
    console.log(router.query);
    let challenge = challenges.find(
      (item) => item.id === parseInt(router.query.id)
    );
    console.log(challenge);
    setCurrentChallenge(challenge);
  });
  const { id } = router.query;

  return (
    <Layout>
      <p>Post: {id}</p>
      <p>{currentChallenge.challengeName}</p>
      <button>Complete Challenge</button>
    </Layout>
  );
};

export default Post;

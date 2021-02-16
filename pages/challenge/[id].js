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
      <div className="body">
        {/* <p>Post: {id}</p>
        <p>{currentChallenge.challengeName}</p>
        <button onClick={() => setAddConnection(true)}>
          Complete Challenge
        </button>
        <ChallengeDialog
          challenge={currentChallenge}
          user={user}
          userId={user._id}
          onSuccessSubmit={onSuccessSubmit}
          addConnection={addConnection}
          onClose={onClose}
        /> */}
        <div className="container">
          <div className="container__img-container"></div>
          <div className="container__text-container">
            <h2>{currentChallenge.challengeName}</h2>
            <p>{currentChallenge.challengeDescription}</p>
            <div className="info-box">
              <button onClick={() => setAddConnection(true)}>
                Complete Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
      <ChallengeDialog
        challenge={currentChallenge}
        user={user}
        userId={user._id}
        onSuccessSubmit={onSuccessSubmit}
        addConnection={addConnection}
        onClose={onClose}
      />
      <style jsx>
        {`
          .body {
            height: 100%;
            // font-size: 50%;
            // font-family: "Barlow Semi Condensed", sans-serif;
            // font-size: 1.3rem;
            // background-color: #ecf2f8;
            background: url('/bg-pattern4a.jpg');
            display: flex;
            align-items: center;
            justify-content: center;

            margin: 0;
          }

          .container {
            width: 75%;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 375px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: 0 3px 17px #48556a 0;
          }
          .container__img-container {
            flex: 40%;
            height: 100%;
            background-image: url('/challenge-square.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
          }
          .container__text-container {
            flex: 60%;
            padding: 35px 45px;
            margin: 15px;
          }
          .container__text-container h2 {
            font-size: 18px;
            line-height: 1.8;
            color: #48556a;
          }
          .container__text-container p {
            font-size: 12px;
          }

          .info-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
          }

          @media only screen and (max-width: 768px) {
            .container {
              flex-direction: column;
              height: 550px;
              overflow: hidden;
            }
            .container__img-container {
              flex: none;
              width: 100%;
              height: 46%;
              border-bottom-left-radius: 0px;
            }
            .container__text-container {
              flex: none;
              padding: 30px 5px;
            }
            .container__text-container h2 {
              font-size: 14px;
            }
            .container__text-container p {
              font-size: 12px;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default Post;

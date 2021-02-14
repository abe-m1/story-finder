import { useUser } from '../lib/hooks';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import ConnectionDialog from '../components/connectionDialog';

const Home = () => {
  const user = useUser();
  const [addConnection, setAddConnection] = useState(false);

  const onSuccessSubmit = () => {
    console.log('on success fired');
    setAddConnection(false);
  };

  const onClose = useCallback(() => {
    setAddConnection(false);
  }, []);

  return (
    <Layout>
      <div className="container">
        {!user && (
          <div className="back">
            <div className="hero">
              <img className="main-image" src="./main-name.png"></img>
              <p className="slogan">
                Discover stories and experiences and be inspired by them
              </p>
              <Link href="/about">
                <button className="learn-more">Learn More</button>
              </Link>
              <Link href="/login">
                <button className="login">Login</button>
              </Link>
            </div>
          </div>
        )}

        {user && (
          <div>
            Add Connections
            <button onClick={() => setAddConnection(true)}>Add</button>
            <Link href="/challenges">
              <button>View Challenges</button>
            </Link>
            <ConnectionDialog
              userId={user._id}
              onSuccessSubmit={onSuccessSubmit}
              addConnection={addConnection}
              onClose={onClose}
            />
          </div>
        )}

        <style jsx>{`
          .container {
            height: 100%;
          }
          .back {
            padding: 3rem;
            background: url('./bg-pattern1a.jpg');
            background-size: cover;
            height: 100%;
          }
          .hero {
            margin-top: 4rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .main-image {
            width: 300px;
          }
          .slogan {
            color: #979797;
            font-size: 1.8rem;
            width: 35%;
          }
          .learn-more {
            padding: 0.5rem 1rem;
            border: 2px solid #fff;
            border-radius: 20px;
            background-color: transparent;
            color: #fff;
            margin-right: 1rem;
          }

          .login {
            padding: 0.5rem 2rem;
            border-radius: 20px;
            background-color: #e34d9e;
            color: #fff;
            margin-right: 1rem;
            border: none;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Home;

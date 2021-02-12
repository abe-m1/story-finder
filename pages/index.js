import { useUser } from '../lib/hooks';
import Link from 'next/link';
import Layout from '../components/layout';

const Home = () => {
  const user = useUser();

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
          <>
            <p>Currently logged in as:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </>
        )}

        <style jsx>{`
          .container {
            height: 100%;
          }
          .back {
            padding: 3rem;
            background: url('./bg-pattern1.jpg');
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

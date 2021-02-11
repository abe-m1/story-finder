import { useUser } from '../lib/hooks';
import Layout from '../components/layout';

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <div className="back">
        <div>
          <img src="./main-name.png"></img>
        </div>

        <p>Steps to test the example:</p>

        <p>Discover stories and experiences and be inspired by them</p>
        <button>Learn More</button>
        <button>Login</button>

        {user && (
          <>
            <p>Currently logged in as:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </>
        )}

        <style jsx>{`
          .back {
            padding: 3rem;
            background-image: url('./back.jpg');
            height: 100%;
          }
          li {
            margin-bottom: 0.5rem;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Home;

import { useUser } from '../lib/hooks';
import Layout from '../components/layout';

const Home = () => {
  const user = useUser();

  return (
    <Layout>
      <div className="back">
        <h1>Home</h1>

        <p>Steps to test the example:</p>

        <ol>
          <li>Click Login and enter a username and password.</li>
          <li>
            You'll be redirected to Home. Click on Profile, notice how your
            session is being used through a token stored in a cookie.
          </li>
          <li>
            Click Logout and try to go to Profile again. You'll get redirected
            to Login.
          </li>
        </ol>

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

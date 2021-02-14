import { useUser } from '../lib/hooks';
import Layout from '../components/layout';

const Collection = () => {
  const user = useUser({ redirectTo: '/login' });
  return (
    <Layout>
      <h1>Collection</h1>
      {user && (
        <>
          <p>Your session:</p>
        </>
      )}

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default Collection;

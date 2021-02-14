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

// export async function getServerSideProps(props) {
//   console.log('props', props);
//   // await dbConnect();

//   /* find all the data in our database */
//   const result = await User.find({});
//   const pets = result.map((doc) => {
//     const pet = doc.toObject();
//     pet._id = pet._id.toString();
//     return pet;
//   });

//   return { props: { pets: pets } };
// }

export default Collection;

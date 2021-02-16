import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Card from '../components/Card';

const Collection = () => {
  const user = useUser({ redirectTo: '/login' });
  return (
    <Layout>
      <div className="container">
        <h1>Collection</h1>
        {user && (
          <>
            <div className="cards">
              <Card
                img="https://res.cloudinary.com/dsduoklii/image/upload/w_400,h_300/v1613438765/people/story-i39nj4ga.jpg"
                title="Lorem ipsum dolor sit amet"
                connection="My Connection"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore."
              />
              <Card
                img="https://res.cloudinary.com/dsduoklii/image/upload/w_400,h_300/v1613438765/people/story-i39nj4ga.jpg"
                title="Lorem ipsum dolor sit amet"
                connection="My Connection"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore."
              />
              <Card
                img="https://res.cloudinary.com/dsduoklii/image/upload/w_400,h_300/v1613438765/people/story-i39nj4ga.jpg"
                title="Lorem ipsum dolor sit amet"
                connection="My Connection"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore."
              />
              <Card
                img="https://res.cloudinary.com/dsduoklii/image/upload/w_400,h_300/v1613438765/people/story-i39nj4ga.jpg"
                title="Lorem ipsum dolor sit amet"
                connection="My Connection"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore."
              />
              <Card
                img="https://res.cloudinary.com/dsduoklii/image/upload/w_400,h_300/v1613438765/people/story-i39nj4ga.jpg"
                title="Lorem ipsum dolor sit amet"
                connection="My Connection"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore."
              />
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .container {
          padding: 2rem;
        }
        .cards {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-wrap: wrap;
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

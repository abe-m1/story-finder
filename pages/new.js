import Form from '../components/NewForm';
import Layout from '../components/layout';

const NewPet = () => {
  const petForm = {
    name: '',
    owner_name: '',
    species: '',
    age: 0,
    poddy_trained: false,
    diet: [],
    image_url: '',
    likes: [],
    dislikes: [],
  };

  return (
    <Layout>
      <Form formId="add-pet-form" petForm={petForm} />
    </Layout>
  );
};

export default NewPet;

import Form from '../components/ProfileForm';
import Layout from '../components/layout';
import { useUser } from '../lib/hooks';
import { useEffect } from 'react';

const Onboard = () => {
  // Fetch the user client-side
  const user = useUser({ redirectTo: '/login' });
  console.log('USER', user);
  const petForm = {
    name: '',
    age: 0,
    diet: [],
    image_url: '',
  };

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <Form formId="add-user-form" userForm={petForm} />
    </Layout>
  );
};

export default Onboard;

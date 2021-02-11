import Form from '../components/ProfileForm';
import NewConnectionForm from '../components/NewConnectionForm';
import Layout from '../components/layout';
import { useUser } from '../lib/hooks';
import { useEffect, useRef } from 'react';

const Onboard = () => {
  // Fetch the user client-side
  const user = useUser({ redirectTo: '/login' });
  const petForm = {
    name: '',
    age: 0,
    image_url: '',
    position: {},
  };

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <NewConnectionForm
        formId="add-user-form"
        userId={user._id}
        userForm={petForm}
      />
    </Layout>
  );
};

export default Onboard;

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
    image_url: '',
  };

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  if (user.onboardingStep === 2) {
    return (
      <Layout>
        <h1>step 2</h1>
        {/* <Form formId="add-user-form" userId={user._id} userForm={petForm} /> */}
      </Layout>
    );
  }

  return (
    <Layout>
      <Form formId="add-user-form" userId={user._id} userForm={petForm} />
    </Layout>
  );
};

export default Onboard;

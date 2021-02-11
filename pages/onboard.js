import Form from '../components/ProfileForm';
import ImageForm from '../components/ImageForm';
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

  if (user.onboardingStep === 2) {
    return (
      <Layout>
        <h1>step 2</h1>
        <ImageForm
          formId="add-user-form"
          userId={user._id}
          onboardStep={3}
          position={user.position}
          userForm={{ imagePreviewUrl: '' }}
        />
      </Layout>
    );
  }
  if (user.onboardingStep === 3) {
    return (
      <Layout>
        <NewConnectionForm
          formId="new-connection-form"
          userId={user._id}
          onboardStep={4}
          userForm={{ imagePreviewUrl: '' }}
        />
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

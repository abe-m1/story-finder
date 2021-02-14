import Form from '../components/OnboardForm';
import Layout from '../components/layout';
import { useUser } from '../lib/hooks';
import { useEffect, useRef, useState } from 'react';

const Onboard = () => {
  // Fetch the user client-side
  const user = useUser({ redirectTo: '/login' });
  const [step, setStep] = useState(1);
  const petForm = {
    name: '',
    age: 0,
    image_url: '',
    position: {},
  };

  useEffect(() => {
    if (user) {
      setStep(user.onboardingStep);
    }
  }, [step]);

  const advanceScreen = () => {
    setStep(user.onboardingStep);
  };

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="page">
        <Form
          formId="add-user-form"
          userId={user._id}
          userForm={petForm}
          advanceScreen={advanceScreen}
        />
        {/* <NewConnectionForm
          formId="new-connection-form"
          userId={user._id}
          onboardStep={4}
          userForm={{ imagePreviewUrl: '' }}
        /> */}
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          margin-top: 7rem;
        }
        .page {
          padding: 3rem;
          background-image: url('./bg-pattern2.png');
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default Onboard;

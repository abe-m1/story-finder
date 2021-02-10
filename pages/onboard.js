import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';

const Onboard = () => {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <Layout>
      <h1>Onboarding</h1>
    </Layout>
  );
};

export default Onboard;

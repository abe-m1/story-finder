import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';

const Signup = () => {
  useUser({ redirectTo: '/', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/login');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="page">
        <div className="login">
          <h2>Signup</h2>
          <Form
            isLogin={false}
            errorMessage={errorMsg}
            onSubmit={handleSubmit}
          />
        </div>
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
          background-image: url('./bg-pattern4.jpg');
          height: 100%;
        }
      `}</style>
    </Layout>
  );
};

export default Signup;

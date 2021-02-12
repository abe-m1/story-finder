import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';

const Login = () => {
  let user = useUser({ redirectTo: '/onboard', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/profile');
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
          <h2>Sign in</h2>
          <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
        </div>
        <a href="https://www.freepik.com/vectors/background">
          Background vector created by rawpixel.com - www.freepik.com
        </a>
        <style jsx>{`
          .login {
            max-width: 21rem;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #fff;
            margin-top: 7rem;
          }
          .page {
            padding: 3rem;
            background-image: url('./bg-pattern3.jpg');
            background-size: cover;
            height: 100%;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Login;

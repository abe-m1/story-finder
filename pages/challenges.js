import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import React from 'react';
import challenges from '../public/data.json';

const Challenges = () => {
  const user = useUser({ redirectTo: '/login' });
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }
  return (
    <Layout>
      <div>
        {challenges.map((challenge, i) => {
          if (i <= user.nextChallengeIndex) {
            return <p>{challenge.challengeName}</p>;
          }
          return <p>{challenge.challengeName}*</p>;
        })}
      </div>
      <style jsx>{`

        }
      `}</style>
    </Layout>
  );
};

export default Challenges;

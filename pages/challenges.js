import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import React from 'react';
import challenges from '../public/data.json';
import ChallengeItem from '../components/challengeItem';

const Challenges = () => {
  const user = useUser({ redirectTo: '/login' });
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }
  return (
    <Layout>
      {user.nextChallengeIndex}
      <div className="container">
        {challenges.map((challenge, i) => {
          if (challenge.id <= user.nextChallengeIndex) {
            // return <p>{challenge.challengeName}</p>;
            return (
              <ChallengeItem
                challenge={challenge}
                completed={true}
                currentChallenge={user.nextChallengeIndex}
              />
            );
          } else {
            return <ChallengeItem challenge={challenge} completed={false} />;
          }

          // return <p>{challenge.challengeName}*</p>;
        })}
      </div>
      <style jsx>{`
          .container {
            padding-top: 3rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Challenges;

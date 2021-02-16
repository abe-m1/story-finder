import { useUser } from '../lib/hooks';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import ConnectionDialog from '../components/connectionDialog';
import Form from '../components/OnboardForm';
import challenges from '../public/data.json';

const Home = () => {
  const user = useUser();
  const [addConnection, setAddConnection] = useState(false);

  const onSuccessSubmit = () => {
    setAddConnection(false);
  };

  const onClose = useCallback(() => {
    setAddConnection(false);
  }, []);

  return (
    <Layout>
      <div className="container">
        {!user && (
          <div className="back">
            {/* <div className="hero">
              <img className="main-image" src="./main-name.png"></img>
              <p className="slogan">
                Discover stories and experiences and be inspired by them
              </p>
              <Link href="/about">
                <button className="learn-more">Learn More</button>
              </Link>
              <Link href="/login">
                <button className="login">Login</button>
              </Link>
            </div> */}
            <section className="container__main-content">
              <div className="mockups">
                <img src="/illustration-mockups.svg" alt="" />
              </div>
              <div className="description">
                <h2 className="description__main-heading">
                  Get inspired by your
                </h2>
                <h2 className="description__main-heading">family stories</h2>
                <p className="description__main-text">
                  Discover stories and experiences of those closest to you and
                  be inspired by them to be a force of good in the world.
                </p>
                <div className="description__button-container">
                  {/* <button className="button">Register</button> */}
                  <Link href="/signup">
                    <button
                      className="button"
                      type="button"
                      style={{ margin: 0, marginRight: '1rem' }}
                    >
                      Signup
                    </button>
                  </Link>
                  <Link href="/about">
                    <button
                      className="more-button"
                      type="button"
                      style={{ margin: 0 }}
                    >
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

        {user && user.onboardingComplete && (
          <div className="main-body">
            <div className="grid">
              <div className="testimonial-container container--one">
                <div className="user">
                  <img className="user__badge" src="/badge.png" alt="" />
                  <div>
                    <p className="user__name">Badge 1</p>
                    <p className="user__type">Badge 1 is for ...</p>
                  </div>
                  <button style={{ marginLeft: 'auto' }}>
                    Start Challenge
                  </button>
                </div>
                <h2 className="light-headline">
                  Your next challenge:{' '}
                  {challenges[user.nextChallengeIndex].challengeName}
                </h2>
                <p className="testimonial">
                  {challenges[user.nextChallengeIndex].challengeDescription}
                </p>
              </div>

              <div className="testimonial-container container--two">
                <h3 className="light-headline latest">Latest Connections</h3>
                {user.connections.length === 0 && <p>add connections</p>}
                {user.connections.length > 0 &&
                  user.connections
                    .reverse()
                    .slice(0, 3)
                    .map((connection) => (
                      <li key={connection._id} className="user">
                        <img
                          className="user__circle"
                          src={connection.connectionImage}
                          alt=""
                        />
                        <div>
                          <p className="user__name">{connection.name}</p>
                          <p className="user__type">
                            {connection.connectionType}
                          </p>
                        </div>
                      </li>
                    ))}
              </div>

              <div className="testimonial-container container--three">
                <h2 className="dark-headline">Add Connection</h2>
                {/* <p className="testimonial-dark">
                  “ Thank you for the wonderful experience! I now have a job I
                  really enjoy,
                </p> */}
                <a onClick={() => setAddConnection(true)}>Add a connection</a>
                <ConnectionDialog
                  userId={user._id}
                  onSuccessSubmit={onSuccessSubmit}
                  addConnection={addConnection}
                  onClose={onClose}
                />
              </div>

              <div className="testimonial-container container--dark">
                <div className="user">
                  <img className="user__badge" src="/badge.png" alt="" />
                  <div>
                    <p className="user__name">Badge 1</p>
                    <p className="user__type">Badge 1 is for ...</p>
                  </div>
                  <button style={{ marginLeft: 'auto' }}>
                    Start Challenge
                  </button>
                </div>
                <h2 className="light-headline">
                  Your latest finished challenge:{' '}
                  {challenges[user.nextChallengeIndex - 1].challengeName}
                </h2>
                <p className="testimonial">
                  {challenges[user.nextChallengeIndex - 1].challengeDescription}
                </p>
              </div>

              <div className="testimonial-container container--five">
                <h2 className="dark-headline">Quote of the day</h2>
                <p className="testimonial-dark">
                  “ Birds that are born in a cage think that freedom is a crime"
                </p>
              </div>
            </div>
          </div>
        )}
        {user && !user.onboardingComplete && (
          <div className="back">
            <Form
              formId="add-user-form"
              userId={user._id}
              user={user}
              userForm={{}}
            />
          </div>
        )}

        <style jsx>{`
          .container {
            height: 100%;
          }
          .back {
            padding: 3rem;
            // background: url('./bg-pattern4a.jpg');
            background: linear-gradient(
                to right,
                rgba(207, 248, 234, 0.7),
                rgba(123, 132, 193, 1)
              ),
              url('/bg-pattern4.jpg');
            // rgba(154, 162, 214, 1)
            // background-size: cover;
            // background-repeat: no-repeat;
            height: 100%;
          }
          .hero {
            margin-top: 4rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .main-image {
            width: 300px;
          }
          .slogan {
            color: #979797;
            font-size: 1.8rem;
            width: 35%;
          }
          .learn-more {
            padding: 0.5rem 1rem;
            border: 2px solid #fff;
            border-radius: 20px;
            background-color: transparent;
            color: #fff;
            margin-right: 1rem;
          }

          .login {
            padding: 0.5rem 2rem;
            border-radius: 20px;
            background-color: #e34d9e;
            color: #fff;
            margin-right: 1rem;
            border: none;
          }

          .testimonial-container {
            width: 90%;
            margin: auto;
            margin-bottom: 2rem;
            border-radius: 8px;
            padding: 2rem 2rem;
            color: #cfcfcf;
          }
          @media (min-width: 1200px) {
            .testimonial-container {
              margin: 0;
              padding: 1.3rem;
              width: 100%;
            }
          }
          .testimonial-container h2 {
            margin-bottom: 2rem;
          }
          @media (min-width: 900px) {
            .testimonial-container h2 {
              font-size: 1.6rem;
              line-height: 1.2;
            }
          }

          .grid {
            margin-top: 4rem;
            margin-bottom: 2rem;
          }
          @media (min-width: 1200px) {
            .grid {
              max-width: 1100px;
              display: grid;
              grid-template-rows: repeat(2, 300px);
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 2rem;
            }
          }

          .container--one {
            background: url(/images/bg-pattern-quotation.svg) no-repeat;
            background-position: 80% 0;
            background-color: #a27fda;
          }
          @media (min-width: 900px) {
            .container--one {
              grid-column: 1/3;
              grid-row: 1;
            }
          }

          .container--two {
            background-color: #48556a;
          }
          @media (min-width: 900px) {
            .container--two {
              grid-column: 3/4;
              grid-row: 1/2;
            }
          }

          .container--three {
            background-color: white;
          }
          @media (min-width: 900px) {
            .container--three {
              grid-column: 1;
              grid-row: 2;
            }
          }

          .container--five {
            background-color: white;
          }
          @media (min-width: 900px) {
            .container--five {
              grid-column: 4/-1;
              grid-row: 1/3;
            }
          }

          .container--dark {
            background-color: #19212e;
          }
          @media (min-width: 900px) {
            .container--dark {
              grid-column: 2/4;
              grid-row: 2;
            }
          }

          .user {
            display: flex;
            margin-bottom: 1rem;
          }

          .user__badge {
            width: 65px;
            border-radius: 50%;
            margin-right: 2rem;
          }
          .user__name {
            font-weight: 700;
            color: #ecf2f8;
          }
          .user__name-dark {
            font-weight: 700;
            color: #48556a;
          }
          .user__type {
            color: #ecf2f8;
            opacity: 50%;
          }
          .user__type-dark {
            color: #48556a;
            opacity: 50%;
          }
          .user__circle {
            width: 47px;
            border: 2px solid #9681b6;
            border-radius: 50%;
            margin-right: 1.5rem;
          }

          .testimonial {
            color: #ecf2f8;
            opacity: 70%;
          }
          @media (min-width: 900px) {
            .testimonial {
              font-size: 1.2rem;
            }
          }

          .testimonial-dark {
            color: #48556a;
            opacity: 70%;
          }
          @media (min-width: 900px) {
            .testimonial-dark {
              font-size: 1.2rem;
            }
          }

          .dark-headline {
            color: #19212e;
          }

          .light-headline {
            color: #ecf2f8;
          }

          .main-body {
            font-size: 50%;
            // font-family: "Barlow Semi Condensed", sans-serif;
            // font-size: 1.3rem;
            // background-color: #ecf2f8;
            background: url('./bg-pattern4a.jpg');
          }
          @media (min-width: 900px) {
            .main-body {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          }

          // .button {
          //   padding: 1.5rem 7rem;
          //   border-radius: 50px;
          //   border-style: none;
          //   font-size: 2rem;
          //   color: #674baf;
          //   box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
          // }
          // @media (max-width: 600px) {
          //   .button {
          //     font-size: 1.7rem;
          //     padding: 1.6rem 5.5rem;
          //     margin-bottom: 2rem;
          //   }
          // }

          .button {
            position: relative;
            background: #3f51b5;
            border: 1px solid #3f51b5;
            font-size: 1.1rem;
            color: #fff;
            margin: 3rem 0;
            padding: 0.75rem 3rem;
            cursor: pointer;
            transition: background-color 0.28s ease, color 0.28s ease,
              box-shadow 0.28s ease;
            overflow: hidden;
            box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
          }

          .more-button {
            position: relative;
            background: #f97474;
            border: none;
            font-size: 1.1rem;
            color: #fff;
            margin: 3rem 0;
            padding: 0.75rem 3rem;
            cursor: pointer;
            overflow: hidden;
            box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
          }

          .mockups {
            flex: 40%;
          }

          .description {
            flex: 60%;
            padding: 5rem 4rem;
          }
          @media (max-width: 600px) {
            .description {
              padding: 2rem;
              font-size: 2rem;
              flex: none;
            }
          }
          .description__main-heading {
            font-family: 'Popins', sans-serif;
            font-size: 3.2rem;
            color: #fff;
            font-weight: 700;
            margin-bottom: 1rem;
          }
          .description__main-heading:last-of-type {
            margin-top: 1rem;
            margin-bottom: 3rem;
          }
          @media (max-width: 600px) {
            .description__main-heading {
              font-size: 2.8rem;
              text-align: center;
            }
          }
          .description__main-text {
            margin-bottom: 2rem;
            font-size: 1.8rem;
          }
          @media (max-width: 600px) {
            .description__main-text {
              font-size: 1.6rem;
              font-weight: 200;
              text-align: center;
            }
          }
          @media (max-width: 600px) {
            .description__button-container {
              text-align: center;
            }
          }

          .container__main-content {
            display: flex;
            align-items: center;
            font-size: 2.1rem;
            color: #fff;
            font-weight: 200;
          }
          @media (max-width: 600px) {
            .container__main-content {
              display: block;
            }
          }
          .mockups img {
            width: 100%;
          }
          .latest {
            margin-bottom: 2rem;
            font-size: 14px;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Home;

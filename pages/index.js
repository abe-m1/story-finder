import { useUser } from '../lib/hooks';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import ConnectionDialog from '../components/connectionDialog';
import Form from '../components/OnboardForm';

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
            <div className="hero">
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
            </div>
          </div>
        )}

        {user && user.onboardingComplete && (
          <div className="main-body">
            {/* Add Connections
            <button onClick={() => setAddConnection(true)}>Add</button>
            <Link href="/challenges">
              <button>s</button>
            </Link>
            <ConnectionDialog
              userId={user._id}
              onSuccessSubmit={onSuccessSubmit}
              addConnection={addConnection}
              onClose={onClose}
            /> */}
            <div className="grid">
              <div className="testimonial-container container--one">
                <div className="user">
                  <img
                    className="user__circle"
                    src="images/image-daniel.jpg"
                    alt=""
                  />
                  <div>
                    <p className="user__name">Daniel Clifford</p>
                    <p className="user__type">Verified Graduate</p>
                  </div>
                </div>
                <h2 className="light-headline">Your next challenge</h2>
                <p className="testimonial">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="testimonial-container container--two">
                <div className="user">
                  <img src="images/image-jonathan.jpg" alt="" />
                  <div>
                    <p className="user__name">Jonathan Walters</p>
                    <p className="user__type">Verified Graduate</p>
                  </div>
                </div>
                <h2 className="light-headline">Latest Connection</h2>
                <p className="testimonial">
                  “ I started as a total newbie with virtually no coding skills.
                </p>
              </div>

              <div className="testimonial-container container--three">
                <div className="user">
                  <img src="images/image-jeanette.jpg" alt="" />
                  <div>
                    <p className="user__name-dark">Jeanette Harmon</p>
                    <p className="user__type-dark">Verified Graduate</p>
                  </div>
                </div>
                <h2 className="dark-headline">Add Connection</h2>
                <p className="testimonial-dark">
                  “ Thank you for the wonderful experience! I now have a job I
                  really enjoy,
                </p>
              </div>

              <div className="testimonial-container container--dark">
                <div className="user">
                  <img
                    className="circle"
                    src="images/image-patrick.jpg"
                    alt=""
                  />
                  <div>
                    <p className="user__name">Patrick Abrams</p>
                    <p className="user__type">Verified Graduate</p>
                  </div>
                </div>
                <h2 className="light-headline">This was your last challenge</h2>
                <p className="testimonial">
                  “ The staff seem genuinely concerned about my progress which I
                  find really refreshing. The program gave me the confidence
                  necessary to be able to go out in the world and present myself
                </p>
              </div>

              <div className="testimonial-container container--five">
                <div className="user">
                  <img src="images/image-kira.jpg" alt="" />
                  <div>
                    <p className="user__name-dark">Kira Whittle</p>
                    <p className="user__type-dark">Verified Graduate</p>
                  </div>
                </div>
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
            background: url('./bg-pattern1b.jpg');
            background-size: cover;
            background-repeat: no-repeat;
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
            background-color: #7541c8;
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
            margin-bottom: 2rem;
          }
          .user img {
            width: 40px;
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
            border: 2px solid #9681b6;
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
        `}</style>
      </div>
    </Layout>
  );
};

export default Home;

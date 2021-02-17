import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import React from 'react';
import Link from 'next/link';

const About = () => {
  const [tab, setTab] = useState(2);
  const [isOpen, setIsOpen] = useState({});
  const handleAccordionOpen = (i) => {
    console.log('fired', i);
    setIsOpen({
      ...isOpen,
      [i]: !isOpen[i],
    });

    console.log(isOpen[1]);
  };

  return (
    <Layout>
      <div className="container">
        <section className="hero">
          <div className="hero__right">
            <div className="hero__content">
              <h1 className="hero__headline">
                A Way to discover meaningful stories
              </h1>
              <p className="hero__headline-text">
                Undertake a set of challenge that will make you ask impactful
                questions of your relatives and discover and be inspired by
                their experiences.
              </p>
              <Link href="/signup">
                <button
                  className="button"
                  type="button"
                  style={{ margin: 0, marginRight: '1rem' }}
                >
                  Signup
                </button>
              </Link>
            </div>
          </div>
          <div className="hero__left">
            <img className="hero__image" src="./illustration-hero.svg" alt="" />
          </div>
        </section>

        <section className="inter">
          <h2 className="inter__headline">How it works</h2>
          <p className="inter__text">
            Move through a set of fun and challenging questions that will take
            you both back and forward in order to inspire you in the present.
          </p>
        </section>
        <section className="tabs">
          <div className="container">
            <div
              onClick={() => setTab(1)}
              id="tab-1"
              className={`tab-item ${tab === 1 ? 'tab-border' : ''}`}
            >
              <p className="high-sm">Photo Challenge</p>
            </div>
            <div
              onClick={() => setTab(2)}
              id="tab-2"
              className={`tab-item ${tab === 2 ? 'tab-border' : ''}`}
            >
              <p className="high-sm">Written Challenge</p>
            </div>
            <div
              onClick={() => setTab(3)}
              id="tab-3"
              className={`tab-item ${tab === 3 ? 'tab-border' : ''}`}
            >
              <p className="high-sm">Video Challenge</p>
            </div>
          </div>
        </section>

        <section className="tab-content">
          <div className="container">
            {tab === 1 && (
              <div
                id="tab-1-content"
                className={`tab-content-item ${tab === 1 ? 'show' : ''}`}
              >
                <div className="tab-content-inner">
                  <div className="tab-left">
                    <img className="tab-image" src="/camera.png" alt="" />
                  </div>
                  <div className="tab-right">
                    <div className="tab-right-content">
                      <h2>Photo Challenge</h2>
                      <p>
                        Complete the challenges by uploading your connections
                        images of meaningful objects and inspired travel photos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === 2 && (
              <div
                id="tab-2-content"
                className={`tab-content-item ${tab === 2 ? 'show' : ''}`}
              >
                <div className="tab-content-inner">
                  <div className="tab-left">
                    <img
                      className="tab-image-small"
                      src="./typewritter.png"
                      alt=""
                    />
                  </div>
                  <div className="tab-right">
                    <div className="tab-right-content">
                      <h2>Written Challenge</h2>
                      <p>
                        Complete the challenges by uploading your connections
                        thoughts and advice of the lessons they have learned in
                        their lives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === 3 && (
              <div
                id="tab-3-content"
                className={`tab-content-item ${tab === 3 ? 'show' : ''}`}
              >
                <div className="tab-content-inner-small">
                  <div className="tab-left">
                    <img className="tab-image-small" src="./film.png" alt="" />
                  </div>
                  <div className="tab-right">
                    <div className="tab-right-content">
                      <h2>Video Challenge</h2>
                      <p>
                        Complete the challenges by uploading your short video
                        clips of their best life advice they can impart to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="inter extra-margin-6">
          <h2 className="inter__headline">New Features Added</h2>
          <p className="inter__text">
            You won't just accumulate information, but will be given challenges
            that will make you sort and ponder it in new ways, which will
            hopefully inspire you in your own lives.
          </p>
        </section>
        <section className="row">
          <div className="box">
            <img className="box__logo" src="/map.png" alt="" />
            <h2 className="box__headline">Map View</h2>
            <p className="box__text">See your connections on the map</p>
          </div>
          <div className="box">
            <img className="box__logo" src="/badge.png" alt="" />
            <h2 className="box__headline">Earn Badges</h2>
            <p className="box__text">
              Earn a badge after completing challenges
            </p>
          </div>
          <div className="box">
            <img className="box__logo" src="/friend.png" alt="" />
            <h2 className="box__headline">Invite Friends</h2>
            <p className="box__text">
              Share your achievements with your network
            </p>
          </div>
        </section>
        {/* <a href="https://www.vecteezy.com/free-vector/hand">Hand Vectors by Vecteezy</a> */}
        {/* <a href="https://www.vecteezy.com/free-vector/typewriter">Typewriter Vectors by Vecteezy</a> */}
        {/* <a href="https://www.vecteezy.com/free-vector/media">Media Vectors by Vecteezy</a> */}
        {/* <a href="https://www.vecteezy.com/free-vector/camera">Camera Vectors by Vecteezy</a> */}
        {/* <a href="https://www.vecteezy.com/free-vector/vintage-book">Vintage Book Vectors by Vecteezy</a> */}
        {/* <a href="https://www.vecteezy.com/free-vector/web">Web Vectors by Vecteezy</a> */}
        <section className="inter">
          <h2 className="inter__headline font-split">
            Frequently Asked Questions
          </h2>
          <p className="inter__text">
            Here are some of our FAQs. If you have any other questions you’d
            like answered please feel free to email us.
          </p>
        </section>

        <section className="accordion-container">
          <button className="accordion" onClick={() => handleAccordionOpen(1)}>
            What is StoryTime?
            <div className="arrow-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                <path
                  className="svg-icon"
                  id="svg-icon-0"
                  fill="none"
                  stroke-width="3"
                  d="M1 1l8 8 8-8"
                />
              </svg>
            </div>
          </button>
          {isOpen[1] && (
            <div className="panel">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                tincidunt justo eget ultricies fringilla. Phasellus blandit
                ipsum quis quam ornare mattis.
              </p>
            </div>
          )}

          <button className="accordion" onClick={() => handleAccordionOpen(2)}>
            Who is it for?
            <div className="arrow-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                <path
                  className="svg-icon"
                  id="svg-icon-1"
                  fill="none"
                  stroke-width="3"
                  d="M1 1l8 8 8-8"
                />
              </svg>
            </div>
          </button>
          {isOpen[2] && (
            <div className="panel">
              <p>
                Vivamus luctus eros aliquet convallis ultricies. Mauris augue
                massa, ultricies non ligula. Suspendisse imperdiet. Vivamus
                luctus eros aliquet convallis ultricies. Mauris augue massa,
                ultricies non ligula. Suspendisse imperdie tVivamus luctus eros
                aliquet convallis ultricies. Mauris augue massa, ultricies non
                ligula. Suspendisse imperdiet.
              </p>
            </div>
          )}

          <button className="accordion" onClick={() => handleAccordionOpen(3)}>
            Is there a mobile app?
            <div className="arrow-container arrow-container-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                <path
                  className="svg-icon"
                  id="svg-icon-2"
                  fill="none"
                  stroke-width="3"
                  d="M1 1l8 8 8-8"
                />
              </svg>
            </div>
          </button>
          {isOpen[3] && (
            <div className="panel">
              <p>
                Sed consectetur quam id neque fermentum accumsan. Praesent
                luctus vestibulum dolor, ut condimentum urna vulputate eget.
                Cras in ligula quis est pharetra mattis sit amet pharetra purus.
                Sed sollicitudin ex et ultricies bibendum.
              </p>
            </div>
          )}

          <button className="accordion" onClick={() => handleAccordionOpen(4)}>
            What is the story behind it?
            <div className="arrow-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                <path
                  className="svg-icon"
                  id="svg-icon-3"
                  fill="none"
                  stroke-width="3"
                  d="M1 1l8 8 8-8"
                />
              </svg>
            </div>
          </button>
          {isOpen[4] && (
            <div className="panel">
              <p>
                Integer condimentum ipsum id imperdiet finibus. Vivamus in
                placerat mi, at euismod dui. Aliquam vitae neque eget nisl
                gravida pellentesque non ut velit.
              </p>
            </div>
          )}
          <div className="more-info">
            <button className="button button--blue">Signup</button>
          </div>
        </section>
        <section className="action">
          <div className="action__box">
            <p className="action__text">Take the challenge today</p>
            <h2 className="action__headline">Register and be inspired</h2>
            <form id="form">
              <div className="input-container">
                <input
                  id="input"
                  type="email"
                  placeholder="enter your email address"
                />
                <img
                  className="error-circle"
                  src="./images/badge-1_03.png"
                  alt=""
                />
                <div className="error-message">
                  Whoops, make sure it's an email
                </div>
              </div>

              <button id="button-submit" className="button button--red">
                Contact Us
              </button>
            </form>
          </div>
        </section>

        <div className="footer-container">
          <footer className="footer">
            <img className="footer-logo" src="./logo.png" alt="" />
            <ul className="footer-items">
              <li>Contact Us</li>
              <li>Features</li>
              <li>Contact</li>
            </ul>
          </footer>
        </div>
      </div>
      <style jsx>{`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          outline: 0;
          box-sizing: border-box;
        }

        img {
          width: 100%;
        }

        ul {
          list-style-type: none;
        }

        a {
          text-decoration: none;
        }

        html {
          font-size: 62.5%;
        }
        @media (max-width: 600px) {
          html {
            font-size: 50%;
          }
        }
        @media (max-width: 1200px) {
          html {
            font-size: 50%;
          }
        }
        @media (max-width: 900px) {
          html {
            font-size: 56.25%;
          }
        }
        @media (min-width: 1800px) {
          html {
            font-size: 75%;
          }
        }

        body {
          font-family: 'Rubik', sans-serif;
          font-size: 1.8rem;
          overflow-x: hidden;
        }

        .header {
          width: 80%;
          margin: auto;
          height: 14rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4rem;
        }
        .header__logo {
          width: 15rem;
        }
        .header__menu {
          font-size: 1.4rem;
          display: flex;
          align-items: center;
        }
        .header__menu__menu-item {
          list-style: none;
          text-transform: uppercase;
        }
        .header__menu__menu-item:not(:last-child) {
          margin-right: 4rem;
        }
        .header__menu__menu-item:not(:last-child):hover {
          color: #3f51b5;
        }
        .header__menu__menu-item:last-child {
          background-color: #3f51b5;
          padding: 1.1rem 3.8rem;
          border-radius: 5px;
          color: #fff;
          border: 1px solid transparent;
        }
        .header__menu__menu-item:last-child:hover {
          background-color: #fff;
          border: 1px solid #3f51b5;
          color: #3f51b5;
        }
        @media (max-width: 600px) {
          .header__menu__menu-item {
            font-size: 1.9rem;
            display: none;
          }
          .header__menu__menu-item:not(:last-child) {
            margin-right: 6rem;
          }
        }

        #nav-button {
          display: none;
        }
        @media (max-width: 600px) {
          #nav-button {
            display: block;
          }
        }

        .hero {
          display: flex;
          width: 76%;
          margin: auto;
          margin-bottom: 6rem;
          position: relative;
          margin-top: 2rem;
        }
        @media (max-width: 600px) {
          .hero {
            flex-direction: column-reverse;
            width: 90%;
          }
        }
        .hero__right {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        @media (max-width: 600px) {
          .hero__right {
            margin-bottom: 5rem;
          }
        }
        @media (max-width: 600px) {
          .hero__content {
            width: 90%;
          }
        }
        .hero__headline {
          font-size: 3.5rem;
          margin-bottom: 2rem;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .hero__headline {
            font-size: 3.5rem;
            text-align: center;
            font-weight: 400;
          }
        }
        .hero__headline-text {
          font-size: 2rem;
          margin-bottom: 4rem;
          color: #9194a1;
        }
        @media (max-width: 600px) {
          .hero__headline-text {
            text-align: center;
          }
        }
        .hero__left {
          flex: 1;
        }
        @media (max-width: 600px) {
          .hero__left {
            margin-bottom: 6rem;
          }
        }
        .hero__image {
          width: 124%;
        }
        @media (max-width: 600px) {
          .hero__image {
            width: 100%;
          }
        }

        .inter {
          width: 35%;
          margin: auto;
          text-align: center;
        }
        @media (max-width: 600px) {
          .inter {
            width: 90%;
          }
        }
        .inter__headline {
          font-size: 3rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .inter__headline {
            font-weight: 400;
            font-size: 2.7rem;
          }
        }
        .inter__text {
          color: #9194a1;
          line-height: 1.6;
        }

        @media (max-width: 600px) {
          .font-split {
            width: 80%;
            margin: auto;
          }
        }

        /* Tabs */
        .tabs {
          width: 60%;
          margin: auto;
          padding-top: 1rem;
          border-bottom: 1px solid #9194a1;
          border-right: none;
          // margin-bottom: 3rem;
        }
        @media (max-width: 600px) {
          .tabs {
            border-bottom: none;
            width: 80%;
          }
        }

        .tabs .container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1rem;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        @media (max-width: 600px) {
          .tabs .container {
            display: block;
          }
        }

        .tab-item {
          padding: 2rem;
        }
        .tab-item:hover {
          color: #3f51b5;
        }
        @media (max-width: 600px) {
          .tab-item {
            border-bottom: 1px solid #9194a1;
          }
          .tab-item:first-child {
            border-top: 1px solid #9194a1;
          }
        }

        .tab-border {
          border-bottom: #3f51b5 3px solid;
          position: relative;
        }
        @media (max-width: 600px) {
          .tab-border {
            width: 70%;
            margin: auto;
          }
        }

        .tab-border::before {
          width: 144%;
          content: ' ';
          position: absolute;
          z-index: -1;
          right: -49px;
          bottom: -4px;
          bottom: -4px;
          border-bottom: 1px solid #9194a1;
        }
        @media (max-width: 600px) {
          .tab-border::before {
            width: 140%;
          }
        }

        #tab-1-content,
        #tab-2-content,
        #tab-3-content {
          display: none;
          opacity: 0;
        }

        .show {
          display: block !important;
          opacity: 1 !important;
          transition: all 1000 ease-in;
        }

        .tab-content-inner {
          display: flex;
          width: 80%;
          margin: auto;
          margin-bottom: 8rem;
        }
        @media (max-width: 600px) {
          .tab-content-inner {
            display: block;
            margin-bottom: 14rem;
          }
        }

        .tab-content-inner-small {
          display: flex;
          width: 70%;
          margin: auto;
          margin-bottom: 11rem;
        }
        @media (max-width: 600px) {
          .tab-content-inner-small {
            display: block;
            margin-bottom: 8rem;
          }
        }

        .tab-left {
          flex: 1;
          padding-top: 4rem;
          position: relative;
        }
        @media (max-width: 600px) {
          .tab-left {
            margin-bottom: 8rem;
            padding-left: 0;
          }
        }

        .tab-right {
          flex: 1;
          padding-left: 7rem;
          display: flex;
          align-content: center;
          justify-content: center;
        }
        @media (max-width: 600px) {
          .tab-right {
            padding-left: 0;
          }
        }

        .tab-right-content {
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        @media (max-width: 600px) {
          .tab-right-content {
            margin-left: 0;
            width: 100%;
          }
        }

        .tab-right h2 {
          margin-bottom: 2rem;
          font-size: 3.3rem;
          font-weight: 400;
        }
        @media (max-width: 600px) {
          .tab-right h2 {
            font-size: 2.6rem;
          }
        }

        .tab-right p {
          color: #9194a1;
          margin-bottom: 3rem;
          font-size: 1.8rem;
          line-height: 1.8;
        }
        @media (max-width: 600px) {
          .tab-right p {
            text-align: center;
            margin-bottom: 2rem;
            line-height: 1.3;
          }
        }

        .tab-image {
          width: 100%;
        }

        .tab-image-small {
          width: 100%;
        }

        .row {
          display: flex;
          justify-content: center;
          margin-bottom: 17rem;
        }
        @media (max-width: 600px) {
          .row {
            display: block;
            margin-bottom: 21rem;
          }
        }

        .box {
          box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 2.4rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: url(/images/bg-dots.svg) no-repeat 10% 66%;
          width: 27%;
        }
        .box__logo {
          width: 16rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .box__logo {
            width: 20rem;
            margin-bottom: 2rem;
          }
        }
        .box__headline {
          margin-bottom: 1.5rem;
          font-size: 2rem;
        }
        .box__text {
          color: #9194a1;
          margin-bottom: 1rem;
        }
        @media (max-width: 600px) {
          .box__text {
            margin-bottom: 1.5rem;
          }
        }
        .box:not(:last-of-type) {
          margin-right: 4rem;
        }
        .box:nth-child(2) {
          top: 4rem;
          position: relative;
        }
        .box:nth-child(3) {
          top: 6rem;
          position: relative;
        }
        @media (max-width: 600px) {
          .box {
            width: 80%;
            margin: auto;
            padding: 6rem 4rem 4.3rem 4rem;
          }
        }

        .accordion-container {
          width: 50%;
          margin: auto;
          margin-bottom: 4rem;
        }
        @media (max-width: 600px) {
          .accordion-container {
            width: 80%;
          }
        }

        .accordion {
          background-color: #fff;
          color: #444;
          cursor: pointer;
          padding: 24px;
          width: 100%;
          border: none;
          border-bottom: 1px solid #9194a1;
          text-align: left;
          outline: none;
          font-size: 15px;
          transition: 0.4s;
          display: flex;
          justify-content: space-between;
        }
        .accordion:first-child {
          border-top: 1px solid #9194a1;
        }

        .more-info {
          margin-top: 3rem;
          text-align: center;
          margin-bottom: 7rem;
        }
        @media (max-width: 600px) {
          .more-info {
            margin-top: 4rem;
          }
        }

        .svg-icon {
          stroke: #5368df;
        }

        .active,
        .accordion:hover {
          color: #3f51b5;
        }

        .accordian-active {
          transform: rotate(-180deg);
        }

        .panel {
          padding: 0 18px;
          // display: none;
          background-color: white;
          overflow: hidden;
        }

        .panel p {
          padding-top: 1.5rem;
        }

        .action {
          background-color: #5368df;
          padding: 6rem 4rem 3.2rem 4rem;
          color: #fff;
          text-align: center;
        }
        @media (max-width: 600px) {
          .action {
            padding: 8rem 0 3rem 0;
          }
        }
        .action__box {
          width: 65%;
          margin: auto;
        }
        @media (max-width: 600px) {
          .action__box {
            width: 80%;
          }
        }
        .action__text {
          text-transform: uppercase;
          margin-bottom: 3rem;
          letter-spacing: 0.4rem;
          font-size: 1.4rem;
        }
        @media (max-width: 600px) {
          .action__text {
            margin-bottom: 1.5rem;
          }
        }
        .action__headline {
          font-size: 3.9rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 600px) {
          .action__headline {
            font-size: 2.8rem;
          }
        }

        #form {
          width: 100%;
          display: flex;
          padding-left: 20px;
          position: relative;
        }
        @media (max-width: 600px) {
          #form {
            width: 100%;
            margin-bottom: 4rem;
            display: block;
            padding-left: 0;
          }
        }

        #input {
          border: none;
          width: 100%;
          padding: 2rem;
          border-radius: 10px;
          // margin-bottom: 4rem;
        }
        @media (max-width: 600px) {
          #input {
            margin-bottom: 2rem;
          }
        }

        #button-submit {
          flex: 1;
          height: 6rem;
        }
        @media (max-width: 600px) {
          #button-submit {
            width: 100%;
          }
        }

        .input-container {
          flex: 3;
          margin: auto;
          margin-right: 2rem;
        }
        @media (max-width: 600px) {
          .input-container {
            margin-right: 0;
          }
        }

        .error-circle {
          position: absolute;
          width: 3rem;
          top: 26%;
          transform: translateY(-50%);
          right: 21rem;
          display: none;
        }
        @media (max-width: 600px) {
          .error-circle {
            right: 2rem;
            top: 18%;
          }
        }

        .arrow {
          width: 1.2rem;
        }

        .error-message {
          color: white;
          font-weight: 400;
          margin-left: -10rem;
          margin-top: -4rem;
          font-size: 1.2rem;
          display: none;
          padding-top: 1rem;
        }
        @media (max-width: 600px) {
          .error-message {
            margin-top: -2rem;
          }
        }

        .form-error {
          border: 2px solid #3f51b5 !important;
        }

        .box-error {
          padding-bottom: 1rem;
          background-color: #3f51b5;
          border-radius: 10px;
        }
        @media (max-width: 600px) {
          .box-error {
            margin-bottom: 1rem;
          }
        }

        .footer-container {
          background-color: #252b46;
          padding: 2.5rem 0;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          color: #fff;
          width: 80%;
          margin: auto;
          align-items: center;
        }
        @media (max-width: 600px) {
          .footer {
            flex-direction: column;
          }
        }

        .footer-items {
          display: flex;
          margin-right: auto;
        }
        @media (max-width: 600px) {
          .footer-items {
            display: block;
            text-align: center;
            margin-right: 0;
          }
        }

        .footer-items li {
          margin-left: 2rem;
        }
        .footer-items li:hover {
          color: #3f51b5;
        }
        @media (max-width: 600px) {
          .footer-items li {
            margin-bottom: 2.3rem;
            font-size: 2rem;
          }
        }

        .footer-logo {
          width: 17rem;
          margin-right: 3rem;
        }
        @media (max-width: 600px) {
          .footer-logo {
            margin-bottom: 3rem;
            width: 20rem;
          }
        }

        .footer p:not(:last-child) {
          margin-right: 3rem;
        }
        @media (max-width: 600px) {
          .footer p:not(:last-child) {
            margin-bottom: 3rem;
          }
        }

        ion-icon {
          font-size: 25px;
          color: #fff;
          margin-left: 1.5rem;
        }
        ion-icon:not(:last-of-type) {
          margin-left: 1.5rem;
        }
        ion-icon:hover {
          color: #3f51b5;
        }
        @media (max-width: 600px) {
          ion-icon {
            font-size: 30px;
          }
        }

        .nav-container {
          color: #fff;
          display: none;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100vh;
          text-align: center;
          box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
          padding: 2.7rem 3rem 2.7rem 2rem;
          background-color: rgba(37, 43, 70, 0.9);
          opacity: 60%;
        }

        .ham-list {
          margin-bottom: 12rem;
        }

        .top-row-modal {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .show {
          display: block !important;
        }

        .hide {
          display: none !important;
        }

        .ham-item {
          text-transform: uppercase;
          list-style: none;
          padding: 4rem;
          border-bottom: 1px solid #9194a1;
        }
        .ham-item:first-child {
          border-top: 1px solid #9194a1;
        }
        .ham-item:nth-child(3) {
          margin-bottom: 4rem;
        }
        .ham-item:last-child {
          border: 2px solid #fff;
          padding: 2rem;
          border-radius: 4px;
        }

        .extra-margin-6 {
          margin-bottom: 6rem;
        }

        @media (max-width: 600px) {
          .mobile-hide {
            display: none;
          }
        }

        .attribution {
          font-size: 11px;
          text-align: center;
        }

        .attribution a {
          color: #3e52a3;
        }

        .container {
          padding-top: 3rem;
        }

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
      `}</style>
    </Layout>
  );
};

export default About;

import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root');

const About = () => {
  return (
    <Layout>
      <div className="back">
        <div className="box-container">
          <form>
            <h1>Material Design form</h1>
            <div className="form-group">
              <select>
                <option>Value 1</option>
                <option>Value 2</option>
                <option>Value 3</option>
                <option>Value 4</option>
              </select>
              <label className="control-label" for="select">
                Choose from list
              </label>
              <i className="bar"></i>
            </div>
            <div className="form-group">
              <input
                type="text"
                required="required"
                placeholder="Add some text here pls"
              />
              <label className="control-label" for="input">
                Name
              </label>
              <i className="bar"></i>
              <i className="input-error">error here</i>
            </div>
            <div className="form-group">
              <input
                type="text"
                required="required"
                placeholder="stuf stuf stuuuffff"
              />
              <label className="control-label" for="input">
                Surname
              </label>
              <i className="bar"></i>
              <i className="input-error">error here</i>
            </div>
            <div className="form-group">
              <textarea required="required"></textarea>
              <label className="control-label" for="textarea">
                Textarea
              </label>
              <i className="bar"></i>
            </div>
            {/* <div className="checkbox">
              <label>
                <input type="checkbox" checked="checked" />
                <i className="helper"></i>I'm the label from a checkbox
              </label>
            </div> */}
            {/* <div className="checkbox">
              <label>
                <input type="checkbox" />
                <i className="helper"></i>I'm thae label from a checkbox
              </label>
            </div> */}
            {/* <div className="form-radio">
              <div className="radio">
                <label>
                  <input type="radio" name="radio" checked="checked" />
                  <i className="helper"></i>I'm the label from a radio button
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="radio" />
                  <i className="helper"></i>I'm the label from a radio button
                </label>
              </div>
            </div> */}
            {/* <div className="checkbox">
              <label>
                <input type="checkbox" />
                <i className="helper"></i>I'm the label from a checkbox
              </label>
            </div> */}
          </form>
          <div className="button-container">
            <button className="button" type="button">
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @charset "UTF-8";
        @import url(https://fonts.googleapis.com/css?family=Roboto);
        body,
        input,
        select,
        textarea,
        body * {
          font-family: 'Roboto', sans-serif;
          box-sizing: border-box;
        }
        body::after,
        body::before,
        input::after,
        input::before,
        select::after,
        select::before,
        textarea::after,
        textarea::before,
        body *::after,
        body *::before {
          box-sizing: border-box;
        }

        body {
          background-image: linear-gradient(top, #f2f2f2, #e6e6e6);
        }

        h1 {
          font-size: 2rem;
          text-align: center;
          margin: 0 0 2em;
        }

        .box-container {
          position: relative;
          max-width: 30rem;
          margin: 5rem auto;
          background: #fff;
          width: 100%;
          padding: 3rem 5rem 0;
          border-radius: 1px;
        }
        .box-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12),
            0 5px 5px -3px rgba(0, 0, 0, 0.2);
          transform: scale(0.98);
          transition: transform 0.28s ease-in-out;
          z-index: -1;
        }
        .box-container:hover::before {
          transform: scale(1);
        }

        .button-container {
          text-align: center;
        }

        fieldset {
          margin: 0 0 3rem;
          padding: 0;
          border: none;
        }

        .form-radio,
        .form-group {
          position: relative;
          margin-top: 2.25rem;
          margin-bottom: 2.25rem;
        }

        .form-inline > .form-group,
        .form-inline > .btn {
          display: inline-block;
          margin-bottom: 0;
        }

        .form-help {
          margin-top: 0.125rem;
          margin-left: 0.125rem;
          color: #b3b3b3;
          font-size: 0.8rem;
        }
        .checkbox .form-help,
        .form-radio .form-help,
        .form-group .form-help {
          position: absolute;
          width: 100%;
        }
        .checkbox .form-help {
          position: relative;
          margin-bottom: 1rem;
        }
        .form-radio .form-help {
          padding-top: 0.25rem;
          margin-top: -1rem;
        }

        .form-group input {
          height: 1.9rem;
        }
        .form-group textarea {
          resize: none;
        }
        .form-group select {
          width: 100%;
          font-size: 1rem;
          height: 1.6rem;
          padding: 0.125rem 0.125rem 0.0625rem;
          background: none;
          border: none;
          line-height: 1.6;
          box-shadow: none;
        }
        .form-group .control-label {
          position: absolute;
          top: 0.25rem;
          pointer-events: none;
          padding-left: 0.125rem;
          z-index: 1;
          color: #b3b3b3;
          font-size: 1rem;
          font-weight: normal;
          transition: all 0.28s ease;
        }
        .form-group .input-error {
          font-size: 0.8rem;
          color: #d9534f;
          top: -1rem;
          left: 0;
          display: none;
        }
        .form-group .input-error:before {
          content: '✘';
          font-weight: bold;
        }
        .form-group .bar {
          position: relative;
          border-bottom: 0.0625rem solid #999;
          display: block;
        }
        .form-group .bar::before {
          content: '';
          height: 0.125rem;
          width: 0;
          left: 50%;
          bottom: -0.0625rem;
          position: absolute;
          background: #ef286b;
          transition: left 0.28s ease, width 0.28s ease;
          z-index: 2;
        }
        .form-group input,
        .form-group textarea {
          display: block;
          background: none;
          padding: 0.125rem 0.125rem 0.0625rem;
          font-size: 1rem;
          border-width: 0;
          border-color: transparent;
          line-height: 1.9;
          width: 100%;
          color: transparent;
          transition: all 0.28s ease;
          box-shadow: none;
        }
        .form-group input::-webkit-input-placeholder,
        .form-group textarea::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          visibility: hidden;
        }
        .form-group input::-moz-placeholder,
        .form-group textarea::-moz-placeholder {
          /* Firefox 19+ */
          visibility: hidden;
        }
        .form-group input:-ms-input-placeholder,
        .form-group textarea:-ms-input-placeholder {
          /* IE 10+ */
          visibility: hidden;
        }
        .form-group input:-moz-placeholder,
        .form-group textarea:-moz-placeholder {
          /* Firefox 18- */
          visibility: hidden;
        }
        .form-group input:focus::-webkit-input-placeholder,
        .form-group textarea:focus::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          visibility: visible;
        }
        .form-group input:focus::-moz-placeholder,
        .form-group textarea:focus::-moz-placeholder {
          /* Firefox 19+ */
          visibility: visible;
        }
        .form-group input:focus:-ms-input-placeholder,
        .form-group textarea:focus:-ms-input-placeholder {
          /* IE 10+ */
          visibility: visible;
        }
        .form-group input:focus:-moz-placeholder,
        .form-group textarea:focus:-moz-placeholder {
          /* Firefox 18- */
          visibility: visible;
        }
        .form-group input[type='file'] {
          line-height: 1;
        }
        .form-group input[type='file'] ~ .bar {
          display: none;
        }
        .form-group input:invalid ~ .input-error {
          display: block;
        }
        .form-group select,
        .form-group input:focus,
        .form-group input:valid,
        .form-group input.form-file,
        .form-group input.has-value,
        .form-group textarea:focus,
        .form-group textarea:valid,
        .form-group textarea.form-file,
        .form-group textarea.has-value {
          color: #333;
        }
        .form-group select ~ .control-label,
        .form-group input:focus ~ .control-label,
        .form-group input:valid ~ .control-label,
        .form-group input.form-file ~ .control-label,
        .form-group input.has-value ~ .control-label,
        .form-group textarea:focus ~ .control-label,
        .form-group textarea:valid ~ .control-label,
        .form-group textarea.form-file ~ .control-label,
        .form-group textarea.has-value ~ .control-label {
          font-size: 0.8rem;
          color: gray;
          top: -1rem;
          left: 0;
        }
        .form-group select:focus,
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
        }
        .form-group select:focus ~ .control-label,
        .form-group input:focus ~ .control-label,
        .form-group textarea:focus ~ .control-label {
          color: #ef286b;
        }
        .form-group select:focus ~ .bar::before,
        .form-group input:focus ~ .bar::before,
        .form-group textarea:focus ~ .bar::before {
          width: 100%;
          left: 0;
        }

        .checkbox label,
        .form-radio label {
          position: relative;
          cursor: pointer;
          padding-left: 2rem;
          text-align: left;
          color: #333;
          display: block;
        }
        .checkbox input,
        .form-radio input {
          width: auto;
          opacity: 1e-8;
          position: absolute;
          left: 0;
        }

        .radio {
          margin-bottom: 1rem;
        }
        .radio .helper {
          position: absolute;
          top: -0.25rem;
          left: -0.25rem;
          cursor: pointer;
          display: block;
          font-size: 1rem;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: #999;
        }
        .radio .helper::before,
        .radio .helper::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          margin: 0.25rem;
          width: 1rem;
          height: 1rem;
          transition: transform 0.28s ease;
          border-radius: 50%;
          border: 0.125rem solid currentColor;
        }
        .radio .helper::after {
          transform: scale(0);
          background-color: #ef286b;
          border-color: #ef286b;
        }
        .radio label:hover .helper {
          color: #ef286b;
        }
        .radio input:checked ~ .helper::after {
          transform: scale(0.5);
        }
        .radio input:checked ~ .helper::before {
          color: #ef286b;
        }

        .checkbox {
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .checkbox .helper {
          color: #999;
          position: absolute;
          top: 0;
          left: 0;
          width: 1rem;
          height: 1rem;
          z-index: 0;
          border: 0.125rem solid currentColor;
          border-radius: 0.0625rem;
          transition: border-color 0.28s ease;
        }
        .checkbox .helper::before,
        .checkbox .helper::after {
          position: absolute;
          height: 0;
          width: 0.2rem;
          background-color: #ef286b;
          display: block;
          transform-origin: left top;
          border-radius: 0.25rem;
          content: '';
          transition: opacity 0.28s ease, height 0s linear 0.28s;
          opacity: 0;
        }
        .checkbox .helper::before {
          top: 0.65rem;
          left: 0.38rem;
          transform: rotate(-135deg);
          box-shadow: 0 0 0 0.0625rem #fff;
        }
        .checkbox .helper::after {
          top: 0.3rem;
          left: 0;
          transform: rotate(-45deg);
        }
        .checkbox label:hover .helper {
          color: #ef286b;
        }
        .checkbox input:checked ~ .helper {
          color: #ef286b;
        }
        .checkbox input:checked ~ .helper::after,
        .checkbox input:checked ~ .helper::before {
          opacity: 1;
          transition: height 0.28s ease;
        }
        .checkbox input:checked ~ .helper::after {
          height: 0.5rem;
        }
        .checkbox input:checked ~ .helper::before {
          height: 1.2rem;
          transition-delay: 0.28s;
        }

        .radio + .radio,
        .checkbox + .checkbox {
          margin-top: 1rem;
        }

        .has-error .legend.legend,
        .has-error.form-group .control-label.control-label {
          color: #d9534f;
        }
        .has-error.form-group .form-help,
        .has-error.form-group .helper,
        .has-error.checkbox .form-help,
        .has-error.checkbox .helper,
        .has-error.radio .form-help,
        .has-error.radio .helper,
        .has-error.form-radio .form-help,
        .has-error.form-radio .helper {
          color: #d9534f;
        }
        .has-error .bar::before {
          background: #d9534f;
          left: 0;
          width: 100%;
        }

        .button {
          position: relative;
          background: currentColor;
          border: 1px solid currentColor;
          font-size: 1.1rem;
          color: #f3578c;
          margin: 3rem 0;
          padding: 0.75rem 3rem;
          cursor: pointer;
          transition: background-color 0.28s ease, color 0.28s ease,
            box-shadow 0.28s ease;
          overflow: hidden;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        }
        .button span {
          color: #fff;
          position: relative;
          z-index: 1;
        }
        .button::before {
          content: '';
          position: absolute;
          background: #46051b;
          border: 50vh solid #a50c40;
          width: 30vh;
          height: 30vh;
          border-radius: 50%;
          display: block;
          top: 50%;
          left: 50%;
          z-index: 0;
          opacity: 1;
          transform: translate(-50%, -50%) scale(0);
        }
        .button:hover {
          color: #ef286b;
          box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
            0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
        }
        .button:active::before,
        .button:focus::before {
          transition: transform 1.12s ease, opacity 0.28s ease 0.364s;
          transform: translate(-50%, -50%) scale(1);
          opacity: 0;
        }
        .button:focus {
          outline: none;
        }

        .back {
          padding: 3rem;
          // background-image: url('./bg-pattern31.jpg');
          background-size: cover;
          height: auto;
        }
      `}</style>
    </Layout>
  );
};

export default About;

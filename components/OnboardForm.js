import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getOrientation } from 'get-orientation/browser';
import ConnectionDialog from '../components/ConnectionDialog';
import { getCroppedImg, getRotatedImage } from '../components/canvasUtils';
import { styles } from '../components/styles';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const Demo = ({
  classes,
  formId,
  userForm,
  userId,
  forNewUser = false,
  user,
}) => {
  const contentType = 'application/json';
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({});

  const [form, setForm] = useState({
    name: userForm.name,
    location: userForm.location,
    onboardingStep: 2,
  });

  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImage1, setCroppedImage1] = useState(null);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [screen, setScreen] = useState(1);
  const [addConnection, setAddConnection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState([]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
      setCroppedImage1(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setAddConnection(false);
  }, []);

  const onSuccessSubmit = (data) => {
    console.log('on su submit', data);
    //TODO get data more directly instead of passing up props
    setConnections(data.connections);
    setAddConnection(false);
  };

  const onSelect = async () => {
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          ...form,
          imagePreviewUrl: croppedImage1,
          userId,
        }),
      });
      Router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }
      setScreen(3);
      setImageSrc(imageDataUrl);
    }
  };

  //new
  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      const geoResult = await opencage.geocode({
        q: form.location,
        key: process.env.NEXT_PUBLIC_GEOCODE_KEY,
        no_annotations: 1,
        limit: 1,
      });

      let results = {};
      if (geoResult) {
        results = geoResult.results[0].geometry;
      }

      const res = await fetch(`/api/profile/${userId}`, {
        method: 'PATCH',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          ...form,
          imagePreviewUrl: croppedImage,
          position: results,
          userId,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/uer/${userId}`, data, false); // Update the local data without a revalidation
      setScreen(screen + 1);
      // router.push('/');
    } catch (error) {
      console.log(error);
      setMessage('Failed to update user');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    setForm({
      ...form,
      [name]: target.value,
    });
  };

  const processForm = () => {
    setLoading(true);

    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  // const getLocation = () => {
  //   const geolocation = navigator.geolocation;

  //   if (!geolocation) {
  //     throw new Error('Not Supported');
  //   }
  //   geolocation.getCurrentPosition(
  //     (position) => {
  //       setPosition({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });
  //       return position;
  //     },
  //     () => {
  //       console.log('permission denied');
  //     }
  //   );
  // };

  const finishOnboard = async () => {
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify({
          onboardingComplete: true,
        }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/user/${userId}`, data, false); // Update the local data without a revalidation

      router.push('/challenges');
    } catch (error) {
      console.log(error);
      setMessage('Failed to update user');
    }
  };

  const formValidate = () => {
    let err = {};
    // if (!form.name) err.name = 'Name is required';
    // if (!form.image_url) err.image_url = 'Image URL is required';
    return err;
  };

  return (
    <>
      <div className="box-container">
        <div className="stepper stepper--horizontal">
          <div className={`col ${screen === 1 ? 'current' : ''}`}>
            <span className="step-number">1</span>
            <div className="step-title">
              {/* <span>This is the first step</span> */}
            </div>
          </div>
          <div className={`col ${screen === 2 ? 'current' : ''}`}>
            <span className="step-number">2</span>
            <div className="step-title">
              {/* <span>The Second One</span> */}
            </div>
          </div>
          <div className={`col ${screen === 3 ? 'current' : ''}`}>
            <span className="step-number">3</span>
            <div className="step-title">
              {/* <span>And the very last one!</span>  */}
            </div>
          </div>
          <div className={`col ${screen === 4 ? 'current' : ''}`}>
            <span className="step-number">4</span>
            {/* <div className="step-title">
                    <span>And the very last one!</span> 
                  </div> */}
          </div>
        </div>
        {screen === 3 && (
          <React.Fragment>
            <div className={classes.cropContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className={classes.controls}>
              <div className={classes.sliderContainer}>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  classes={{ container: classes.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <div className={classes.sliderContainer}>
                <Typography
                  variant="overline"
                  classes={{ root: classes.sliderLabel }}
                >
                  Rotation
                </Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  classes={{ container: classes.slider }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>

              {/* <Button
                onClick={() => processForm()}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              > */}
              <button
                onClick={() => processForm()}
                className="button"
                type="button"
                style={{ margin: 0 }}
              >
                {!loading && 'Confirm Image'}
                {loading && <div className="loader"></div>}
              </button>

              {/* <CircularProgress color="secondary" /> */}
              {/* <div className="loader"></div> */}

              {/* </Button> */}
            </div>
          </React.Fragment>
        )}
        {screen === 1 && (
          <div style={{ padding: '2rem' }}>
            <h2>Welcome to Story time</h2>
            <p style={{ marginBottom: '3rem' }}>
              To get started please fill in some information about yourself
            </p>
            {/* <Button
              onClick={() => setScreen(2)}
              variant="contained"
              color="primary"
              classes={{ root: classes.cropButton }}
            >
              Let's get started
            </Button> */}
            <div className="button-container">
              <button
                onClick={() => setScreen(2)}
                className="button"
                type="button"
              >
                <span>Lets get started</span>
              </button>
            </div>
          </div>
        )}
        {screen === 4 && (
          <div>
            <h1>Add Connections</h1>
            <p>
              Start populating your family tree by adding your closest
              connections
            </p>
            <button
              onClick={() => setAddConnection(true)}
              className="button"
              type="button"
              style={{ marginRight: '1rem' }}
            >
              Add Connections
            </button>
            <button className="button" type="button" onClick={finishOnboard}>
              Finish Setup
            </button>
            <ul>
              {connections.length > 0 &&
                connections.map((connection) => (
                  <li key={connection._id} className="user">
                    <img
                      className="user__circle"
                      src={connection.connectionImage}
                      alt=""
                    />
                    <div>
                      <p className="user__name">{connection.name}</p>
                      <p className="user__type">Relative</p>
                    </div>
                  </li>
                ))}
            </ul>
            <ConnectionDialog
              userId={userId}
              onSuccessSubmit={onSuccessSubmit}
              addConnection={addConnection}
              onClose={onClose}
            />
          </div>
        )}
        {screen === 2 && (
          <div style={{ padding: '2rem' }}>
            <form>
              <h1>Tell us about yourself</h1>
              <div className="form-group">
                <input
                  type="text"
                  maxLength="20"
                  name="name"
                  onChange={handleChange}
                  required
                  value={form.name}
                  placeholder="Add your name"
                />
                <label className="control-label" for="input">
                  Your Name
                </label>
                <i className="bar"></i>
                {/* <i className="input-error">error here</i> */}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="location"
                  onChange={handleChange}
                  required
                  value={form.location}
                  placeholder="Add your city, country"
                />
                <label className="control-label" for="input">
                  What city do you live in?
                </label>
                <i className="bar"></i>
                {/* <i className="input-error">error here</i> */}
              </div>
            </form>

            <h3>Upload your profile picture</h3>
            <div style={{ marginTop: '2rem' }}>
              <label className="button">
                <input type="file" onChange={onFileChange} accept="image/*" />
                Select Image
              </label>
            </div>
          </div>
        )}
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
          max-width: 50rem;
          margin: 5rem auto;
          background: #fff;
          width: 100%;
          padding: 3rem 5rem 0;
          border-radius: 1px;
          height: 575px;
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
          background: #448aff;
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
          visibility: hidden;
        }
        .form-group input::-moz-placeholder,
        .form-group textarea::-moz-placeholder {
          visibility: hidden;
        }
        .form-group input:-ms-input-placeholder,
        .form-group textarea:-ms-input-placeholder {
          visibility: hidden;
        }
        .form-group input:-moz-placeholder,
        .form-group textarea:-moz-placeholder {
          visibility: hidden;
        }
        .form-group input:focus::-webkit-input-placeholder,
        .form-group textarea:focus::-webkit-input-placeholder {
          visibility: visible;
        }
        .form-group input:focus::-moz-placeholder,
        .form-group textarea:focus::-moz-placeholder {
          visibility: visible;
        }
        .form-group input:focus:-ms-input-placeholder,
        .form-group textarea:focus:-ms-input-placeholder {
          visibility: visible;
        }
        .form-group input:focus:-moz-placeholder,
        .form-group textarea:focus:-moz-placeholder {
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
          color: #448aff;
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
          background-color: #448aff;
          border-color: #448aff;
        }
        .radio label:hover .helper {
          color: #448aff;
        }
        .radio input:checked ~ .helper::after {
          transform: scale(0.5);
        }
        .radio input:checked ~ .helper::before {
          color: #448aff;
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
          background-color: #448aff;
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
          color: #448aff;
        }
        .checkbox input:checked ~ .helper {
          color: #448aff;
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
          color: #448aff;
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

        .box-container {
          width: 60%;
          background-color: #fff;
          margin: auto;
          padding: 2rem;
        }

        .back {
          padding: 3rem;
          background-image: url('./bg-pattern31.jpg');
          background-size: cover;
          height: 100%;
        }

        .stepper {
          font-family: 'Roboto', sans-serif;
          display: flex;
          width: 90%;
          margin: auto;
        }
        .stepper .col {
          order: 0;
        }

        .stepper.stepper--horizontal {
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: space-around;
          align-content: center;
          align-items: flex-start;
        }
        .stepper.stepper--horizontal .col {
          flex: 0 1 33.3%;
          align-self: auto;
          padding: 20px 0;
        }
        .stepper.stepper--horizontal .col span.step-number {
          float: left;
          display: inline-block;
          background-color: #b1b1b1;
          color: #fff;
          padding: 10px 15px;
          border-radius: 500px;
        }
        .stepper.stepper--horizontal .col .step-title {
          color: #6d6d6d;
          adding: 30px 5px 5px 12px;
          display: inline-block;
          width: 71%;
        }
        .stepper.stepper--horizontal .col .step-title:after {
          content: '';
          border-bottom: dotted 1px #ccc;
          display: inline-block;
          width: 100%;
          float: right;
          position: relative;
          top: 4px;
        }
        .stepper.stepper--horizontal .col .step-title span {
          background-color: #fff;
          display: inline-block;
          position: relative;
          z-index: 9;
          padding-right: 4px;
        }
        .stepper.stepper--horizontal .col.current span.step-number {
          background-color: #448aff;
        }
        .stepper.stepper--horizontal .col.current .step-title {
          color: #000;
        }

        .user {
          display: flex;
          margin-bottom: 1rem;
        }
        .user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 2rem;
        }
        .user__name {
          font-weight: 700;
          // color: #ecf2f8;
        }
        .user__name-dark {
          font-weight: 700;
          // color: #48556a;
        }
        .user__type {
          // color: #ecf2f8;
          opacity: 50%;
          margin-top: 8px;
          margin-bottom: 5px;
        }
        .user__type-dark {
          // color: #48556a;
          opacity: 50%;
        }
        .user__circle {
          border: 2px solid #9681b6;
        }

        input[type='file'] {
          display: none;
        }

        .custom-file-upload {
          border: 1px solid #ccc;
          display: inline-block;
          padding: 6px 12px;
          cursor: pointer;
          background-color: #448aff;
          color: #fff;
        }

        .loader {
          margin: 0 2rem;
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const StyledDemo = withStyles(styles)(Demo);
export default StyledDemo;
// export default Demo;

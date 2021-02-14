import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getOrientation } from 'get-orientation/browser';
import ImgDialog from '../components/ImgDialog';
import { getCroppedImg, getRotatedImage } from '../components/canvasUtils';
import { styles } from '../components/styles';
import Layout from '../components/layout';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useUser } from '../lib/hooks';
import Link from 'next/link';

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
  onSuccessSubmit,
}) => {
  const contentType = 'application/json';
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({});
  //   const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const [form, setForm] = useState({
    name: userForm.name,
    location: userForm.location,
    connection: userForm.connection,
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
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage);
      setCroppedImage1(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setAddConnection(false);
  }, []);

  const onSelect = async () => {
    console.log(croppedImage1);

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
          // onboardStep,
          // position,
          // userName,
        }),
      });
      console.log(res);
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
      setImageSrc(imageDataUrl);
      setScreen(3);
    }
  };

  //new
  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    console.log('userId', userId);
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      const geoResult = await opencage.geocode({
        q: form.location,
        key: process.env.GEOCODE_KEY,
        no_annotations: 1,
        limit: 1,
      });

      let results = {};
      if (geoResult) {
        console.log('goe', geoResult);
        results = geoResult.results[0].geometry;
      }
      console.log('goe1', results);

      const res = await fetch(`/api/geo/${userId}`, {
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
        console.log(res);
        throw new Error(res.status);
      }

      const { data } = await res.json();
      console.log('new data', data);
      onSuccessSubmit();

      mutate(`/api/uer/${userId}`, data, false); // Update the local data without a revalidation
      setScreen(screen + 1);
      // router.push('/');
    } catch (error) {
      console.log(error);
      setMessage('Failed to update pet');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(target);
    setForm({
      ...form,
      [name]: target.value,
    });
  };

  // const handleDrop = (e) => {
  //   const target = e.target;

  //   setForm({
  //     ...form,
  //     connection: target.value,
  //   });
  // };

  const processForm = () => {
    setLoading(true);

    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const getLocation = () => {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      throw new Error('Not Supported');
    }
    geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log(position);
        return position;
      },
      () => {
        console.log('permission denied');
      }
    );
  };

  //   /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = 'Name is required';
    // if (!form.owner_name) err.owner_name = 'Owner is required';
    // if (!form.species) err.species = 'Species is required';
    // if (!form.image_url) err.image_url = 'Image URL is required';
    return err;
  };

  // const processForm = () => {
  //   console.log(form);
  //   setLoading(true);
  //   //
  // };

  return (
    <>
      <div className="box-container">
        {/* {imageSrc && ( */}
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
              >
                {!loading && 'Next'}
                {loading && <CircularProgress color="secondary" />}
              </Button> */}
            </div>
            <div>
              <Button
                onClick={() => processForm()}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                Add Connection
              </Button>
            </div>
          </React.Fragment>
        )}

        {/* {screen === 4 && (
          <div>
            Add Connections
            <button onClick={() => setAddConnection(true)}>Add</button>
            <Link href="/">
              <button>Add Later</button>
            </Link>
            <ImgDialog
              img={croppedImage}
              userId={userId}
              onSuccessSubmit={onSuccessSubmit}
              addConnection={addConnection}
              onClose={onClose}
              onSelect={onSelect}
            />
          </div>
        )} */}
        {screen === 1 && (
          <div>
            <form>
              <h1>Add a new connection</h1>
              <div className="form-group">
                {/* <input
             type="text"
             maxLength="20"
             name="name"
             value={form.name}
             onChange={handleChange}
             required
           /> */}
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
                  What is your connection's name?
                </label>
                <i className="bar"></i>
                <i className="input-error">error here</i>
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
                  What city do they live in?
                </label>
                <i className="bar"></i>
                <i className="input-error">error here</i>
              </div>
              <div className="form-group">
                <select
                  value={form.connection}
                  name="connection"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">please select...</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Grandmother">Grandmother</option>
                  <option value="Grandfather">Grandfather</option>
                  <option value="Uncle">Uncle</option>
                  <option value="Aunt">Aunt</option>
                  <option value="Cousin">Cousin</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>
                <label className="control-label" for="select">
                  How are they connected to you
                </label>
                <i className="bar"></i>
              </div>

              {/* <div className="form-group">
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
                </div> */}
              {/* <div className="form-group">
                  <textarea required="required"></textarea>
                  <label className="control-label" for="textarea">
                    Textarea
                  </label>
                  <i className="bar"></i>
                </div> */}
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

            <h3>Upload your profile picture</h3>
            <input type="file" onChange={onFileChange} accept="image/*" />
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

        .box-container {
          width: 100%;
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
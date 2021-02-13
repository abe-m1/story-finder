import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getOrientation } from 'get-orientation/browser';
import ImgDialog from '../components/ImgDialog';
import { getCroppedImg, getRotatedImage } from '../components/canvasUtils';
import { styles } from '../components/styles';
import Layout from '../components/layout';

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const Demo = ({ classes }) => {
  const contentType = 'application/json';
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImage1, setCroppedImage1] = useState(null);

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
    setCroppedImage(null);
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
          imagePreviewUrl: croppedImage1,
          // userId,
          // onboardStep,
          // position,
          // userName,
        }),
      });
      console.log(res);
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
    }
  };

  return (
    <Layout>
      <div className="container">
        {imageSrc ? (
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
              <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
                classes={{ root: classes.cropButton }}
              >
                Show Result
              </Button>
            </div>
            <ImgDialog
              img={croppedImage}
              onClose={onClose}
              onSelect={onSelect}
            />
          </React.Fragment>
        ) : (
          <input type="file" onChange={onFileChange} accept="image/*" />
        )}
      </div>
      <style jsx>{`
        .container {
          width: 60%;
        }
      `}</style>
    </Layout>
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

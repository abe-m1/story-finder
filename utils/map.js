import React, { useState, useEffect, useRef } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [isOpen, setIsOpen] = useState({});
    const handleToggleOpen = (i) => {
      setIsOpen({
        ...isOpen,
        [i]: true,
      });
    };

    const handleToggleClose = (i) => {
      setIsOpen({
        ...isOpen,
        [i]: false,
      });
      setIsOpen(false);
    };
    return (
      <GoogleMap defaultZoom={2} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {props.isMarkerShown &&
          props.userMarkers.map((marker, i) => {
            console.log(marker.position);
            return (
              <Marker
                key={i}
                position={{
                  lat: marker.position.lat,
                  lng: marker.position.lng,
                }}
                onClick={() => handleToggleOpen(i)}
              >
                {isOpen[i] && (
                  <InfoWindow onCloseClick={() => handleToggleClose(i)}>
                    <>
                      <img style={{ width: '40px' }} src={marker.userImage} />
                      <p>{marker.userName}</p>
                    </>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}

        {/* {props.isMarkerShown && (
        <Marker position={{ lat: -30.397, lng: 110.644 }} />
      )} */}
      </GoogleMap>
    );
  })
);

export default Map;

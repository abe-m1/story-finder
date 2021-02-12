import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={2} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown &&
        props.userMarkers.map((marker) => {
          console.log(marker.position);
          return (
            <Marker
              position={{ lat: marker.position.lat, lng: marker.position.long }}
            />
          );
        })}

      {/* {props.isMarkerShown && (
        <Marker position={{ lat: -30.397, lng: 110.644 }} />
      )} */}
    </GoogleMap>
  ))
);

export default Map;

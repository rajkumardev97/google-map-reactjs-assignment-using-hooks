import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "./mapStyles";

function Map(props) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  //console.log(props.LocationData);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedLocation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {props.LocationData.map((location, index) => (
        <Marker
          key={index}
          position={{
            lat: location.lat,
            lng: location.lng
          }}
          onClick={() => {
            setSelectedLocation(location);
          }}
          icon={{
            url: `/mymarker.png`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
          position={{
            lat: selectedLocation.lat,
            lng: selectedLocation.lng
          }}
        >
          <div>
            <h4>Lat : {selectedLocation.lat}</h4>
            <p>Lng : {selectedLocation.lng}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function UserMap(props) {
  const [GoogleKey] = useState("AIzaSyDPzWTDug4ni_ekeBnEnGfXJCI1A6sxAHA");
  return (
    <div style={{ width: "33vw", height: "50vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GoogleKey}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        LocationData={props.LocationData}
      />
    </div>
  );
}

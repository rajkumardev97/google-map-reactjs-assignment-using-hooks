import React, { useState } from "react";
import UserMap from "./Map/UserMap";
import AddLocationForm from "./forms/AddLocationForm";
import LocationTable from "./tables/LocationTable";

const App = () => {
  // Initial Data
  const LocationinData = [
    {
      lng: -75.3372987731628,
      lat: 45.383321536272049,
      isValid: true,
      error: ""
    },
    {
      lng: -75.546518086577947,
      lat: 45.467134581917357,
      isValid: true,
      error: ""
    }
  ];

  // Setting state
  const [LocationData, setLocationData] = useState(LocationinData);

  // Add New Locations operations
  const addNewLocation = newlocs => {
    setLocationData([...LocationData, ...newlocs]);
    // console.log(LocationData);
  };

  return (
    <div className="container" style={{ paddingTop: 50 }}>
      <div className="row">
        <div className="col">
          <UserMap LocationData={LocationData} />
        </div>
        <div className="col">
          <h3>Add lat/lng</h3>
          <AddLocationForm addNewLocation={addNewLocation} />
        </div>
        <div className="col">
          <h3>View Lat/Lng</h3>
          <LocationTable LocationData={LocationData} />
        </div>
      </div>
    </div>
  );
};

export default App;

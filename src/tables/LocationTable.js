import React from "react";

const LocationTable = props => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Lat</th>
        <th>Lng</th>
      </tr>
    </thead>
    <tbody>
      {props.LocationData.length > 0 ? (
        props.LocationData.map((location, index) => (
          <tr key={index} style={{ border: "1px solid black" }}>
            <td>{location.lat}</td>
            <td>{location.lng}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No locations</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default LocationTable;

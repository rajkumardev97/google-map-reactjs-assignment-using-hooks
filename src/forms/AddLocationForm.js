import React, { useState } from "react";
import MoreLocInputs from "./MoreLocInputs";

const AddLocationForm = props => {
  const blankLocation = { lng: "", lat: "", isValid: false, error: "" };
  const [locState, setLocState] = useState([{ ...blankLocation }]);

  const addLoc = () => {
    setLocState([...locState, { ...blankLocation }]);
  };
  const isValidData = locState => {
    var decemCheckRegex = /^[-+]?[0-9]+\.[0-9]+$/;

    if (!locState.lng || !locState.lat) {
      //console.log("lat or lng cannot not be empty !!");
      locState.isValid = false;
      locState.error = "lat or lng cannot not be empty !!";
      return locState;
    } else if (
      !locState.lat.toString().match(decemCheckRegex) ||
      !locState.lng.toString().match(decemCheckRegex)
    ) {
      //check lat and lng decimal
      //console.log("lat or lng should be decimal !!");
      locState.isValid = false;
      locState.error = "lat or lng should be decimal !!";
      return locState;
    } else {
      locState.isValid = true;
      locState.error = "";
      return locState;
    }
  };

  const handleLocChange = e => {
    const updatedLocs = [...locState];
    // console.log("idx is : "+e.target.dataset.idx);
    // console.log("className is : "+e.target.idx);
    // console.log("value is : "+e.target.value);

    updatedLocs[e.target.dataset.idx][e.target.className] = e.target.value;
    setLocState(updatedLocs);
  };

  const _handlefieldsValid = async locState => {
    //console.log(locState);

    const updatedLocs = [...locState];
    let allValid = false;

    for (var i = 0; i < locState.length; i++) {
      let resultData = await isValidData(locState[i]);

      if (!resultData.isValid) {
        //if current location obj lat or lng isValid = false
        //console.log("isValid is false for current location obj");
        updatedLocs[i].error = resultData.error;
        allValid = true;
      } else {
        //if isValid we parse into Float from string
        //console.log("isValid is true");
        updatedLocs[i].lat = parseFloat(resultData.lat);
        updatedLocs[i].lng = parseFloat(resultData.lng);
      }
    }

    if (allValid) {
      //console.log("all location is invalid !!");
      setLocState(updatedLocs);
    } else {
      //console.log("all location is correct !!");

      props.addNewLocation(updatedLocs);
      setLocState([]); //here we reset our array
    }
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        _handlefieldsValid(locState);
      }}
    >
      <input
        className="btn btn-success"
        type="button"
        value="+ Add More"
        onClick={addLoc}
      />
      <input type="submit" value="Submit" style={{ marginLeft: 20 }} />

      {locState.map((val, idx) => (
        <MoreLocInputs
          key={`loc-${idx}`}
          idx={idx}
          locState={locState}
          handleLocChange={handleLocChange}
        />
      ))}
    </form>
  );
};

export default AddLocationForm;

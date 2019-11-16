import React from "react";
import PropTypes from "prop-types";

const MoreLocInputs = ({ idx, locState, handleLocChange }) => {
  const latId = `lat-${idx}`;
  const lngId = `lng-${idx}`;
  return (
    <div
      key={`lat-${idx}`}
      style={{ padding: 20, background: "#E6E6E6", border: "1px solid black" }}
    >
      <label htmlFor={latId}>{`Lat #${idx + 1}`}</label>
      <input
        type="number"
        step="any"
        name={latId}
        data-idx={idx}
        id={latId}
        className="lat"
        value={locState[idx].lat}
        onChange={handleLocChange}
      />
      <br />
      <label htmlFor={lngId}>{`Lng #${idx + 1}`}</label>
      <input
        type="number"
        step="any"
        name={lngId}
        data-idx={idx}
        id={lngId}
        className="lng"
        value={locState[idx].lng}
        onChange={handleLocChange}
      />
      <br />
      {locState[idx].error && (
        <div
          htmlFor={lngId}
          class="alert alert-danger"
          role="alert"
          style={{ fontSize: 12 }}
        >
          <strong>Error !</strong> {locState[idx].error}.
        </div>
      )}

      <br />
    </div>
  );
};

MoreLocInputs.propTypes = {
  idx: PropTypes.number,
  locState: PropTypes.array,
  handleLocChange: PropTypes.func
};

export default MoreLocInputs;

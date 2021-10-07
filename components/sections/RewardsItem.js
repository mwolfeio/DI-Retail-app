import { useState, useEffect } from "react";

const Section = ({ shop }) => {
  return (
    <div className="card">
      <div className="flex-center-btw" style={{ marginBottom: "8px" }}>
        <p>
          <span className="subtitle" style={{ marginRight: "8px" }}>
            Namespace:{" "}
          </span>{" "}
          TEST
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            key:{" "}
          </span>
          TEST
        </p>
        <div className="flex-center-center">
          <p className="subtitle">TEST</p>
          <MoreButton>
            <span onClick={() => console.log("DELETE")}>Delete</span>
          </MoreButton>
        </div>
      </div>
      <input type="text" />
    </div>
  );
};
export default Section;

import { useState, useEffect } from "react";
import MoreButton from "../MoreButton.js";

const Section = ({ add, remove, reward }) => {
  return (
    <div className="card flex-center-btw" style={{ marginBottom: "8px" }}>
      <div className="flex-center-left">
        <p style={{ whiteSpace: "nowrap", width: "100%" }}>
          <span className="subtitle" style={{ marginRight: "8px" }}>
            Name:{" "}
          </span>{" "}
          {reward.name}
        </p>
        <p style={{ whiteSpace: "nowrap" }}>
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            Cost:{" "}
          </span>
          {reward.points}
          <span className="subtitle" style={{ margin: " 0 8px 0 4px" }}>
            Points
          </span>
        </p>
        <p style={{ whiteSpace: "nowrap" }}>
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            Value: $
          </span>
          {reward.value}
        </p>
      </div>
      <div className="flex-center-right" style={{ width: "100%" }}>
        <MoreButton>
          <span onClick={() => console.log("DELETE")}>Delete</span>
        </MoreButton>
      </div>
    </div>
  );
};
export default Section;

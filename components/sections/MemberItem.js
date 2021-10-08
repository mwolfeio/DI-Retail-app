import { useState, useEffect } from "react";
import MoreButton from "../MoreButton.js";

const Section = ({ member }) => {
  return (
    <div className="card flex-center-btw ">
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
          <span className="subtitle" style={{ margin: " 0 2px 0 16px" }}>
            Value: $
          </span>
          {reward.value}
        </p>
      </div>
      <div className="flex-center-right" style={{ width: "100%" }}>
        <MoreButton>
          <span onClick={() => remove(reward.id)}>Delete</span>
        </MoreButton>
      </div>
    </div>
  );
};
export default Section;

import { useState, useEffect } from "react";

const Section = ({ add, remove, reward }) => {
  return (
    <div className="card">
      <div className="flex-center-btw" style={{ marginBottom: "8px" }}>
        <p>
          <span className="subtitle" style={{ marginRight: "8px" }}>
            Name:{" "}
          </span>{" "}
          {reward.name}
        </p>
        <p>
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            Cost:{" "}
          </span>
          {reward.points}
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            {" "}
            (Points)
          </span>
        </p>
        <p>
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            Value:{" "}
          </span>
          {reward.value}
          <span className="subtitle" style={{ margin: " 0 8px 0 16px" }}>
            {" "}
            ($)
          </span>
        </p>
        <div className="flex-center-right" style={{ width: "100%" }}>
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

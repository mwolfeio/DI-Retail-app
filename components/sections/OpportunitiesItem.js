import { useState, useEffect } from "react";

import MetafieldInput from "./MetafieldInput.js";

const Section = ({ opp }) => {
  const [name, setname] = useState(opp.name);
  const [description, setdescription] = useState(opp.description);
  const [value, setvalue] = useState(opp.value);
  const [value_type, setvalue_type] = useState(opp.value_type);
  const [limit, setlimit] = useState(opp.limit);
  const [active, setActive] = useState(opp.active);

  const handleSubmit = (e) => {
    //prevent dfault
    // if active add
    // if false remove
  };

  useEffect(() => {
    setname(opp.name);
    setdescription(opp.description);
    setvalue(opp.value);
    setvalue_type(opp.value_type);
    setlimit(opp.limit);
  }, [opp]);

  return (
    <div
      className={`card opportunity-card ${!active && "not-active-opp-card"}`}
    >
      <div className="flex-center-left">
        <div className="toggle">
          <input
            type="checkbox"
            onChange={(e) => setActive(e.target.value)}
            className="check"
          />
          <b className="b switch"></b>
          <b className="b track"></b>
        </div>
      </div>
      <div className="flex-center-left">
        <div className="opp-icon-wrapper flex-center-center">
          <img src={`data:image/svg+xml;utf8,${opp.icon}`} />
        </div>
        <div>
          <h2>{opp.name}</h2>
          <p className="subtitle">{opp.description}</p>
        </div>
      </div>

      <div>
        <p>
          {opp.value} {opp.value_type}
        </p>
        <p className="subtitle" style={{ fontSize: "14px" }}>
          Reward
        </p>
      </div>

      <div>
        <p>{opp.limit}</p>
        <p className="subtitle" style={{ fontSize: "14px" }}>
          Usage limit
        </p>
      </div>
    </div>
  );
};
export default Section;

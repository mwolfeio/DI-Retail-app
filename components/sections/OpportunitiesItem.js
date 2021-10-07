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
        <div className="opp-icon-wrapper flex-center-center">
          <img src={`data:image/svg+xml;utf8,${opp.icon}`} />
        </div>
        <div>
          <h2>{opp.name}</h2>
          <p className="subtitle" style={{ margin: "8px 0 0" }}>
            {opp.description}
          </p>
        </div>
      </div>

      <div>
        <p>{opp.value}</p>
        <p>{opp.value_type}</p>
      </div>

      <div>
        <p>{opp.limit}</p>
      </div>
    </div>
  );
};
export default Section;

import { useState, useEffect } from "react";

import MetafieldInput from "./MetafieldInput.js";

const Section = ({ opp, add, remove }) => {
  const [name, setname] = useState(opp.name);
  const [description, setdescription] = useState(opp.description);
  const [value, setvalue] = useState(opp.value);
  const [value_type, setvalue_type] = useState(opp.value_type);
  const [limit, setlimit] = useState(opp.limit);
  const [active, setActive] = useState(opp.active);

  const toggleActive = () => {};
  const handleSubmit = (e) => {
    console.log("submitting");
    let id = opp.id;
    console.log("id: ", id);
    if (!active) return remove(id);
    let payload = {
      name: name,
      description: description,
      value: value,
      value_type: value_type,
      limit: limit,
      active: active,
    };

    console.log("payload: ", payload);

    add(id, payload);
  };
  const resetValues = () => {
    console.log("resetting values");
    setname(opp.name);
    setdescription(opp.description);
    setvalue(opp.value);
    setvalue_type(opp.value_type);
    setlimit(opp.limit);
    setActive(opp.active);
  };

  useEffect(() => {
    resetValues();
  }, [opp]);

  //variables
  let needsSaving =
    name !== opp.name ||
    description !== opp.description ||
    value !== opp.value ||
    value_type !== opp.value_type ||
    limit !== opp.limit ||
    active !== opp.active;

  return (
    <div
      className={`card opportunity-card ${active ? "" : "not-active-opp-card"}`}
    >
      <div className="flex-center-left">
        <div className="toggle">
          <input
            type="checkbox"
            checked={active}
            onChange={() => setActive(!active)}
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

      <div className="flex-center-column">
        <p>
          {opp.value} {opp.value_type}
        </p>
        <p className="subtitle" style={{ fontSize: "14px" }}>
          Reward
        </p>
      </div>

      <div className="flex-center-column">
        <p>{opp.limit}</p>
        <p className="subtitle" style={{ fontSize: "14px" }}>
          Usage limit
        </p>
      </div>
      <div
        className={`opp-button-wrapper ${
          needsSaving ? "opp-needs-saving" : ""
        }`}
      >
        <button style={{ marginBottom: "8px" }} onClick={() => resetValues()}>
          Clear
        </button>
        <button className="submit-button" onClick={() => handleSubmit()}>
          Save
        </button>
      </div>
    </div>
  );
};
export default Section;

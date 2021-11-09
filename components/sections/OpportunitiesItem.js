import { useState, useEffect } from "react";

import MetafieldInput from "./MetafieldInput.js";

const Section = ({ opp, add, remove }) => {
  const [name, setname] = useState(opp.name);
  const [description, setdescription] = useState(opp.description);
  const [value, setvalue] = useState(opp.value);
  const [value_type, setvalue_type] = useState(opp.value_type);
  const [limit, setlimit] = useState(opp.limit);
  const [active, setActive] = useState(opp.active);
  const [sending, setSending] = useState(false);

  const toggleActive = () => {};
  const handleSubmit = (e) => {
    setSending(true);
    let id = opp.id;
    if (!active) return remove(id);
    let payload = {
      name: name,
      description: description,
      value: Number(value),
      value_type: value_type,
      limit: Number(limit),
      active: active,
    };

    add(id, payload);

    setSending(false);
  };
  const resetValues = () => {
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
      {opp.in_development ? (
        <div className="rfd-tag">Requires Development</div>
      ) : (
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
      )}
      <div className="flex-center-left">
        <div className="opp-icon-wrapper flex-center-center">
          <img src={`data:image/svg+xml;utf8,${opp.icon}`} />
        </div>
        <div>
          <input
            className={`opp-input lrg-opp-txt ${
              name !== opp.name ? "opp-input-chnged" : ""
            }`}
            style={{ color: "#4e5d78" }}
            placeholder="Title..."
            type="text"
            disabled={active ? "" : "disabled"}
            value={active ? name : opp.name}
            onChange={(e) => setname(e.target.value)}
          />
          <textarea
            className={`opp-input lrg-opp-txt ${
              description !== opp.description ? "opp-input-chnged" : ""
            }`}
            placeholder="Description..."
            type="text"
            disabled={active ? "" : "disabled"}
            value={active ? description : opp.description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-center-column">
        <div className="flex-center-center">
          <input
            className={`opp-input lrg-opp-txt ${
              value !== opp.value ? "opp-input-chnged" : ""
            }`}
            style={{ color: "#4e5d78", textAlign: "center" }}
            placeholder="Value..."
            type="number"
            disabled={active ? "" : "disabled"}
            value={active ? value : opp.value}
            onChange={(e) => setvalue(e.target.value)}
          />
        </div>
        <p
          className="subtitle"
          style={{ fontSize: "14px", textTransfrom: "capitalize" }}
        >
          {opp.value_type}
        </p>
      </div>
      <div className="flex-center-column">
        <input
          className={`opp-input lrg-opp-txt ${
            limit !== opp.limit ? "opp-input-chnged" : ""
          }`}
          style={{ color: "#4e5d78", textAlign: "center" }}
          placeholder="Limit..."
          type="number"
          disabled={active ? "" : "disabled"}
          value={active ? limit : opp.limit}
          onChange={(e) => setlimit(e.target.value)}
        />
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
          {sending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};
export default Section;

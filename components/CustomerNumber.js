import { useState, useEffect } from "react";
import { firestore } from "../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "./Loader.js";

const Section = ({ data }) => {
  const { pointsInt, email, shop } = data;
  console.log("pointsInt: ", pointsInt);
  //State
  const [points, setPoints] = useState(pointsInt);
  const [loading, setLoading] = useState(false);
  const [oldPoints, setOldPoints] = useState(pointsInt);

  //Handle input
  const changeHandler = (e) => {
    setPoints(e.target.value);
  };
  const erase = (e) => {
    e.preventDefault();
    setPoints(oldPoints);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting: ", points);
    setLoading(true);

    await firestore
      .doc(`stores/${shop}/users/${email}`)
      .update({ points: Number(points) });

    setOldPoints(points);
    setLoading(false);
  };

  useEffect(() => {
    console.log("running useEffect for: ", pointsInt);
    setPoints(pointsInt);
  }, [pointsInt]);

  //return component
  let needsSaving = points !== oldPoints;
  return (
    <div className="flex-center-center">
      <div
        style={{
          position: "relative",
          height: "43px",
          width: "16vw",
          maxWidth: "248px",
        }}
      >
        <form
          className={`customer-number-wrapper  ${
            needsSaving ? "points-form-open" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <input
            onChange={changeHandler}
            className="customer-number-input"
            type="number"
            placeholder="0"
            value={points}
          />
          {needsSaving && (
            <div className="flex-center-center">
              <button onClick={erase} style={{ height: "36px", width: "100%" }}>
                Cancel
              </button>
              <button
                className="submit-button"
                style={{ height: "36px", marginLeft: "8px", width: "100%" }}
                type="submit"
              >
                {loading ? <Loader size={24} /> : `Save`}
              </button>
            </div>
          )}
        </form>
      </div>
      <h1 style={{ marginBottom: "0" }}>Points</h1>
    </div>
  );
};
export default Section;

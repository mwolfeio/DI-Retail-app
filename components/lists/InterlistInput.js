import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";

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
      .update({ points: points });

    setOldPoints(points);
    setLoading(false);
  };
  const preventClickthrough = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    console.log("running useEffect for: ", pointsInt);
    setPoints(pointsInt);
  }, [pointsInt]);

  //return component
  let needsSaving = points !== oldPoints;
  return (
    <div
      class="list-input-wrapper "
      style={{ position: "relative", height: "36px", width: "100%" }}
      onClick={preventClickthrough}
    >
      <form
        className={`customer-number-wrapper ${
          needsSaving
            ? "customerNumber-form-open customerNumber-form-list-input"
            : ""
        }`}
        onSubmit={handleSubmit}
      >
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Empty"
          value={points}
          style={{ padding: 0 }}
        />
        {needsSaving ? (
          <div className="flex-center-center">
            <button onClick={erase}>X</button>
            <button
              className="submit-button"
              style={{
                marginLeft: "4px",
              }}
              type="submit"
            >
              {loading ? <Loader size={24} /> : "✔"}
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
export default Section;

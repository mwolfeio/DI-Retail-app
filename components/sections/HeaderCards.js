import React from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";

const StatCards = ({ shop }) => {
  // const [data, loading, error] = useDocumentOnce(
  //   firestore.doc(`stores/${shop}/users/-STATS-`)
  // );

  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}/users/-STATS-`)
  );

  console.log("in StatCards");

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  console.log("laoded");

  let stats = data.data();
  console.log("stats:", stats);

  return (
    <div className="order-page-header">
      <div className="clickable-card">
        <h2>Program Members</h2>
        <p>
          {stats.member_count} <span style={{ color: "#b0b7c3" }}>members</span>
        </p>
      </div>

      <div className="clickable-card">
        <h2>Outstanding Points </h2>
        <p>{stats.outstanding_points} Points</p>
      </div>
      <div className="clickable-card">
        <h2>Outstanding Cupons</h2>
        <p>$ </p>
      </div>
    </div>
  );
};
export default StatCards;

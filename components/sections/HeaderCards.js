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
  const [codeData, codeLoading, codeError] = useDocumentOnce(
    firestore.doc(`stores/${shop}/codes/-STATS-`)
  );

  console.log("in StatCards");
  console.log("codeData", codeData);

  if (loading || codeLoading) return <Loader />;
  if (error || codeError)
    return <div>{error ? error.message : codeError.message}</div>;

  console.log("laoded");

  let stats = data.data();
  console.log("stats:", stats);

  return (
    <div className="order-page-header">
      <div className="heder-card-stat">
        <h2>Program Members</h2>
        <p>{stats.member_count} members</p>
      </div>

      <div className="heder-card-stat">
        <h2>Outstanding Points </h2>
        <p>{stats.outstanding_points} Points</p>
      </div>
      <div className="heder-card-stat">
        <h2>Outstanding Cupons</h2>
        <p>
          {codeData.cuponsOutstanding} Cupons (${codeData.valueOutstanding})
        </p>
      </div>
    </div>
  );
};
export default StatCards;

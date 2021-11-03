import React from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";

const StatCards = ({ shop }) => {
  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}/alerts/-STATS-`)
  );

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let alertsStats = data.data();
  console.log("alertsStats: ", alertsStats);
  let productCount = Object.keys(alertsStats).length;
  console.log("productCount: ", productCount);
  let aertCount = data.exists
    ? Object.values(alertsStats).reduce((a, b) => a + b)
    : 0;
  console.log("aertCount: ", aertCount);

  return (
    <div style={{ textAlign: "right" }} className="flex-right-column ">
      <h1 style={{ fontSize: "20px" }}>
        {aertCount} alert{aertCount === 1 ? "" : "s"}
      </h1>
      <h2 className="subtitle" style={{ fontSize: "16px" }}>
        <i>
          for {productCount} product{productCount === 1 ? "" : "s"}
        </i>
      </h2>
    </div>
  );
};
export default StatCards;

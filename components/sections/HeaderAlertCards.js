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
  let productCount = Object.keys(alertsStats).length;
  let aertCount = Object.values(alertsStats).reduce((a, b) => a + b);

  return (
    <div style={{ textAlign: "right" }} className="flex-right-column ">
      <h1 style={{ fontSize: "20px" }}>{aertCount} alerts</h1>
      <h2 className="subtitle" style={{ fontSize: "16px" }}>
        <i>{productCount} different products</i>
      </h2>
    </div>
  );
};
export default StatCards;

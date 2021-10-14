import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import ProductAlertItem from "./ProductAlertItem";
import Loader from "../Loader.js";

const WishlistWrapper = ({ shop }) => {
  const [open, setOpen] = useState(true);

  //Query
  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}/alerts/-STATS-`)
  );

  //functions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let alertsStats = data.data();
  let productArr = Object.keys(alertsStats);
  let productCount = productArr.length;
  let aertCount = Object.values(alertsStats).reduce((a, b) => a + b);

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Product (${productCount.length})`}
        dropDown={[{ name: "clear List", func: clearAll }]}
      />
      {open &&
        (productCount < 1 ? (
          <div className="card-container">
            <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
              <b>No prdocuts with alerts</b>
            </div>
          </div>
        ) : (
          <div className="card-container ">
            {productArr.map((productId, i) => (
              <ProductAlertItem
                key={`${productId}-item`}
                prodcutId={productId}
                index={i}
                shop={shop}
                count={alertsStats[productId]}
              />
            ))}
          </div>
        ))}
    </section>
  );
};

export default WishlistWrapper;

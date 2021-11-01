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
  let arr = [];
  productArr.forEach((key, i) => {
    arr.push({ id: key, value: alertsStats[key] });
  });

  let sortedArr = arr.sort((a, b) => b.value - a.value);

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Product (${productCount})`}
      />
      {open &&
        (productCount < 1 ? (
          <div>
            <p
              className="subtitle"
              style={{
                lineHeight: "22px",
                fontSize: "14px",
                width: "700px",
                margin: "-8px 0px 20px",
                maxWidth: "Calc(100% - 120px)",
              }}
            >
              Products that are currently out of stock that customers have
              requested a back-in-stock email alert for.
            </p>
            <div className="card-container">
              <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
                <b>No prdocuts with alerts</b>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p
              className="subtitle"
              style={{
                lineHeight: "22px",
                fontSize: "14px",
                width: "700px",
                margin: "-8px 0 0",
                maxWidth: "Calc(100% - 120px)",
              }}
            >
              Products that are currently out of stock that customers have
              requested a back-in-stock email alert for.
            </p>
            <div className="card-container ">
              {sortedArr.map((product, i) => (
                <ProductAlertItem
                  key={`${product.id}-item`}
                  prodcutId={product.id}
                  index={i}
                  shop={shop}
                  count={product.value}
                />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default WishlistWrapper;

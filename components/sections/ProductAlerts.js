import { useState, useEffect } from "react";

import SectionHeader from "./SectionHeader.js";
import ProductAlertItem from "./ProductAlertItem";
import Loader from "../Loader.js";

const WishlistWrapper = ({ alertsObj, shop }) => {
  const [alerts, setAlerts] = useState(alertsObj);
  const [open, setOpen] = useState(true);
  //functions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };

  //useEffect
  useEffect(() => {
    setAlerts(alertsObj);
  }, [alertsObj]);

  let productArr = Object.keys(alerts);
  let productCount = productArr.length;

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
                count={alerts[productId]}
              />
            ))}
          </div>
        ))}
    </section>
  );
};

export default WishlistWrapper;

import React, { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Loader from "../Loader.js";

const CustomerPage = ({
  discountCode,
  cartDiscountAmount,
  orderSubtotal,
  email,
  shop,
}) => {
  console.log(`stores/${shop}/users/${email}`);
  const [Userdata, Userloading, Usererror] = useDocumentOnce(
    firestore.doc(`stores/${shop}/users/${email}`)
  );
  const [Pointsdata, Pintsloading, Pointserror] = useDocumentOnce(
    firestore.doc(`stores/${shop}/opportunities/purchase_points`)
  );

  if (Userloading || Pintsloading) return <Loader />;
  if (Usererror || Pointserror) return <div>There was an error</div>;

  console.log("Pointsdata: ", Pointsdata.data());
  console.log("Userdata: ", Userdata.data());

  let pointsEarned = 0;

  let pointsDoc = Pointsdata.data();
  if (Pointsdata.exists) {
    let pointsPercentage = pointsDoc.value / 100;
    pointsEarned = parseInt(
      Math.round((pointsPercentage * orderSubtotal * 100) / 100).toFixed(0),
      10
    );
  }

  return (
    <div>
      <div className="flex-center-btw">
        <h2>Membership</h2>

        {Userdata.exists ? (
          <div className="membership-tag flex-center-center">Member</div>
        ) : (
          <div></div>
        )}
      </div>

      <p className="subtitle">Discounts:</p>
      {cartDiscountAmount > 0 ? (
        <div className="orders-page-address-card-address-wrapper">
          <p>Code: {discountCode}</p>
          <p>Amount: ${cartDiscountAmount}</p>
        </div>
      ) : (
        <div className="orders-page-address-card-address-wrapper">
          <p className="subtitle">No discount used</p>
        </div>
      )}
      <p className="subtitle" style={{ margin: "8px 0px -6px" }}>
        Points Earned:
      </p>
      {Pointsdata.exists && Userdata.exists ? (
        <div className="orders-page-address-card-address-wrapper">
          <p>Percent: {pointsDoc.value}%</p>
          <p>Amount: {pointsEarned}</p>
        </div>
      ) : (
        <div className="orders-page-address-card-address-wrapper">
          <p className="subtitle">Not a member</p>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

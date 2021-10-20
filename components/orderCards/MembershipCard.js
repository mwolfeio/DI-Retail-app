import React, { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import Loader from "../Loader.js";

const CustomerPage = ({
  discountCode,
  cartDiscountAmount,
  orderSubtotal,
  email,
}) => {
  const [Userdata, Userloading, Usererror] = useDocumentOnce(
    firestore.doc(`stores/${shop}/users/${email}`)
  );
  const [Pointsdata, Pintsloading, Pointserror] = useDocumentOnce(
    firestore.doc(`stores/${shop}/opportunities/purchase_points`)
  );

  if (Userloading || Pintsloading) return <Loader />;
  if (Usererror || Pointserror) return <div>There was an error</div>;

  let pointsPercentage = parseInt(
    (Pointsdata.data().value / 100).toFixed(0),
    10
  );
  let pointsEarned = parseInt(
    Math.round((pointsPercentage * orderSubtotal * 100) / 100).toFixed(0),
    10
  );

  return (
    <div>
      <div className="flex-center-btw">
        <h2>Mambership</h2>

        {Userdata.exists ? (
          <div className="membership-tag flex-center-center">Member</div>
        ) : (
          <div></div>
        )}
      </div>

      <p className="subtitle">Discounts:</p>
      <div className="orders-page-address-card-address-wrapper">
        <p>Code: {discountCode}</p>
        <p>Amount: ${cartDiscountAmount}</p>
      </div>
      <p className="subtitle">Points Earned:</p>
      {Pointsdata.exists && Userdata.exists ? (
        <div className="orders-page-address-card-address-wrapper">
          <p>Percent: {Pointsdata.data().value}%</p>
          <p>Amount: ${pointsEarned}</p>
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

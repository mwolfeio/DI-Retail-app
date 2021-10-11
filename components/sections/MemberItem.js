import { useState, useEffect } from "react";
import MoreButton from "../MoreButton.js";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

//components
import Loader from "../Loader.js";

const Section = ({ member, shop }) => {
  const [codeData, codeLoading, codeError] = useDocumentOnce(
    firestore
      .collection(`stores/${shop}/codes`)
      .where("user", "==", member.email)
  );

  if (codeLoading) return <Loader />;
  if (codeError) return <div>{codeError.message}</div>;

  let count = 0;
  let totalValue = 0;
  codeData.forEach((codeDoc, i) => {
    let code = codeDoc.data();
    count += 1;
    totalValue += code.value;
  });

  return (
    <div className="card flex-center-btw ">
      <div className="flex-center-left">
        <div>
          <p style={{ whiteSpace: "nowrap", width: "100%" }}>
            {member.firstName} {member.lastName}
          </p>
          <p
            className="subtitle"
            style={{ whiteSpace: "nowrap", width: "100%" }}
          >
            {member.email}
          </p>
        </div>

        <p style={{ whiteSpace: "nowrap" }}>
          {member.points}
          <span className="subtitle" style={{ margin: " 0 8px 0 4px" }}>
            Points
          </span>
        </p>
        <p style={{ whiteSpace: "nowrap" }}>
          <span className="subtitle" style={{ margin: " 0 2px 0 16px" }}>
            name:
          </span>
          {count} Codes (${totalValue})
        </p>
      </div>
    </div>
  );
};
export default Section;

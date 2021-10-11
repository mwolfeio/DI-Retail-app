import { useState, useEffect } from "react";
import Link from "next/link";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

//components
import Loader from "../Loader.js";
import MoreButton from "../MoreButton.js";

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

  console.log(member.firstName, "'s id is ", member.id);
  console.log(`href = /customers/${member.id}`);

  return (
    <Link href={`/customers/${member.id}`}>
      <div className="card member-card">
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
          {count}{" "}
          <span className="subtitle" style={{ margin: " 0 4px" }}>
            Codes (${totalValue})
          </span>
        </p>
        <div className="flex-center-right">
          <div className="member-icon-wrap flex-center-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#B0B7C3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M7 14.5l5-5 5 5"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Section;

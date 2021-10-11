import Link from "next/link";
import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";

const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);

//Clear all interests  // TODO:
// remove interest  // TODO:

const Section = ({ interests, email }) => {
  const [open, setOpen] = useState(true);
  const [interestsObj, setInterestsObj] = useState(interests);

  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };

  useEffect(() => {
    setInterestsObj(interests);
  }, [interests]);

  //convert interests object into sorted array
  let unsortedInterestsArr =
    Object.keys(interestsObj).length === 0
      ? []
      : Object.keys(interestsObj).map((k) => {
          return { value: interestsObj[k], type: k };
        });
  let sortedInterestsArr =
    Object.keys(interestsObj).length === 0
      ? []
      : unsortedInterestsArr.sort(function (a, b) {
          return b.value - a.value;
        });
  let sumOfInterests =
    Object.keys(interestsObj).length === 0 ? 0 : sumValues(interestsObj);

  return (
    <section>
      <SectionHeader
        status={open}
        minimize={toggleOpen}
        title={`Interests (${sortedInterestsArr.length})`}
      />

      {open && (
        <div>
          <p
            className="subtitle"
            style={{
              lineHeight: "22px",
              fontSize: "14px",
              width: "700px",
              margin: "-8px 0 20px",
              maxWidth: "Calc(100% - 120px)",
            }}
          >
            User interests are based off of the products a user views. They are
            based on the product’s “type” as opposed to product material,
            collection, etc.. A product’s “interest level” decays at an
            exponential rate of 4% per new view. This means that more recently
            viewed products are weighted heavier than older ones.
          </p>

          {sortedInterestsArr.length < 1 ? (
            <div className="card-container">
              <div
                className="flex-center-center"
                style={{ background: "none", boxShadow: "none" }}
              >
                <b>No Interests</b>
              </div>
            </div>
          ) : (
            <div className="card-container">
              {sortedInterestsArr.map((interest, i) => (
                <div className="interest-pilon">
                  <div className="flex-center-center">
                    <b>{interest.type}</b>
                  </div>
                  <div
                    className="flex-center-left"
                    style={{
                      width: "100%",
                      background: "#fafbfc",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      className="flex-center-left interest-column"
                      style={{
                        width: `${(interest.value / sumOfInterests) * 100}%`,
                      }}
                    >
                      {interest.value / sumOfInterests <= 0.2 ? (
                        ""
                      ) : (
                        <span>
                          <b>
                            {Math.round(
                              (interest.value / sumOfInterests) * 100
                            )}
                          </b>
                          % Interest level
                        </span>
                      )}
                    </div>
                    {interest.value / sumOfInterests > 0.2 ? (
                      ""
                    ) : (
                      <span style={{ marginLeft: "12px", color: "#b0b7c3" }}>
                        <b>
                          {Math.round((interest.value / sumOfInterests) * 100)}
                        </b>
                        % Interest level
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default Section;

// <a
//   target="blank"
//   href={`${
//     process.env.HOST
//   }/admin/products/${product.node.product.id.replace(
//     "gid://shopify/Product/",
//     ""
//   )}`}
//   style={{ textDecoration: "none" }}
//   className="order-product-wrapper flex-center-column"
// >

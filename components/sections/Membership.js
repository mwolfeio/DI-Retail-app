import { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { firestore } from "../../lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";

import MoreButton from "../MoreButton.js";

//API

//component
const Section = ({ oppArr, email, points, shop }) => {
  const [open, setOpen] = useState(true);
  const [codeArr, setcodeArr] = useState([]);
  // const [fieldId, setFieldId] = useState(id);
  const [input, setInput] = useState("");

  //Query
  const [snapshot, loading, error] = useCollectionOnce(
    firestore.collection(`stores/${shop}/codes`).where("user", "==", email)
  );

  //handlers
  const toggleOpen = () => {
    setOpen(!open);
  };

  const removecode = async (i) => {
    console.log("running removecode");
    let newArr = [...codeArr];
    let codeToRemove = newArr.splice(i, 1);

    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/code/${codeToRemove.docId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newData = await response.json();

    console.log("newData: ", newData);
    setcodeArr(newArr);
  };

  useEffect(() => {
    if (loading || error) return;
    snapshot.forEach((doc) => {
      if (doc.exists) {
        let snapshotObject = doc.data();
        snapshotObject.docId = doc.id;
        setcodeArr((codeArr) => [...codeArr, snapshotObject]);
      }
    });
  }, [snapshot]);

  let count = 0;
  let value = 0;

  codeArr.forEach((c, i) => {
    count += 1;
    value += c.value;
  });

  return (
    <section>
      <SectionHeader
        status={open}
        minimize={toggleOpen}
        title={`Coupon Codes (${codeArr.length})`}
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
            <span style={{ color: "#4e5d78" }}>{count}</span> Codes,{" "}
            <span style={{ color: "#4e5d78" }}>${value}</span> Value
          </p>

          <div
            className="card-container flex-top-left "
            style={{ minHeight: "80px", flexWrap: "wrap" }}
          >
            {codeArr.length ? (
              codeArr.map((code, i) => (
                <div
                  style={{ color: "#4e5d78" }}
                  className="search-term-tag flex-center-center"
                >
                  {code.code} (<b>${code.value}</b>)
                  <div
                    onClick={() => removecode(i)}
                    style={{ color: "#b0b7c3" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      style={{ height: "18px", width: "18px" }}
                    >
                      <path
                        fill="currentColor"
                        d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"
                      ></path>
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="flex-center-center"
                style={{ background: "none", width: "100%", boxShadow: "none" }}
              >
                <p
                  className="subtitle"
                  style={{ fontSize: "14px", color: "#b0b7c3" }}
                >
                  No codes yet
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default Section;

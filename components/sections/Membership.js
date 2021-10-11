import { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { firestore } from "../../lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import MetafieldInput from "./MetafieldInput.js";

import MoreButton from "../MoreButton.js";

//graphql

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
  const deleteMetafield = () => {
    console.log("deleting");
  };
  const submitHandler = () => {
    console.log("submit handler");
  };
  const submit = (arrayToSubmit) => {
    console.log("arrayToSubmit:", arrayToSubmit);
  };
  const removecode = (i) => {
    console.log("running removecode");
    let newArr = [...codeArr];
    newArr.splice(i, 1);
    console.log("newArr= ", newArr);
    submit(newArr);
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
  // useEffect(() => {
  //   setFieldId(id);
  // }, [id]);

  //opportunites
  //codes
  //points

  return (
    <section>
      <SectionHeader status={open} minimize={toggleOpen} title={`Membership`} />
      {open && (
        <div>
          <p>Points</p>
          <p>Opportunites</p>
          <div
            className="card-container flex-top-left "
            style={{ minHeight: "80px", flexWrap: "wrap" }}
          >
            {codeArr.length ? (
              codeArr.map((code, i) => (
                <div
                  style={{ color: "#4e5d78" }}
                  className="search-code-tag flex-center-center"
                >
                  {code}
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
                style={{ background: "none", width: "100%" }}
              >
                <p className="subtitle" style={{ fontSize: "14px" }}>
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

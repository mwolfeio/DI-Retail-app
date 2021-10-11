import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import Loader from "../Loader.js";
import MemberItem from "./MemberItem.js";

const Section = ({ shop }) => {
  const [open, setOpen] = useState(true);
  const [memberArr, setmemberArr] = useState([]);

  //form inputs
  const [newname, setnewname] = useState();
  const [newpoints, setnewpoints] = useState();
  const [newvalue, setnewvalue] = useState();

  //Firebase Queries
  const [snapshot, loading, error] = useDocumentOnce(
    firestore
      .collection(`stores/${shop}/users`)
      .orderBy("points", "desc")
      .limit(50)
  );

  //cloudfunctions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };

  //useEffect
  useEffect(() => {
    console.log("running useEffect");
    if (loading || error) return;
    snapshot.forEach((doc) => {
      if (doc.exists) {
        console.log("adding new data");
        let snapshotObject = doc.data();
        snapshotObject.id = doc.id;
        setmemberArr((memberArr) => [...memberArr, snapshotObject]);
      }
    });
  }, [snapshot]);

  if (loading || error)
    return (
      <section>
        <SectionHeader
          add={{ display: false }}
          status={open}
          minimize={toggleOpen}
          title={`Wishlist()`}
        />
        {loading ? <Loader /> : <div>{error.message}</div>}
      </section>
    );

  //variables

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Members (${memberArr.length})`}
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
            View and edit customers in the membership program.
          </p>

          <div className="card-container reward-card-wrapper">
            {memberArr.length < 1 ? (
              <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
                <b>No Metafields</b>
              </div>
            ) : (
              memberArr.map((member) => {
                if (member.id === "-STATS-") return;
                return <MemberItem member={member} shop={shop} />;
              })
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default Section;

// <form onSubmit={submitHandler} className="card input-card">
//   <div className="flex-center-btw">
//     <div className="flex-center-left">
//       <p>
//         <span className="subtitle" style={{ marginRight: "8px" }}>
//           Namespace:{" "}
//         </span>
//       </p>
//       <input
//         required
//         type="text"
//         placeholder="add a name"
//         value={namespace}
//         onChange={(e) => setNamespace(e.target.value)}
//       />
//       <p style={{ marginLeft: "16px" }}>
//         <span className="subtitle" style={{ marginRight: "8px" }}>
//           Key:{" "}
//         </span>
//       </p>
//       <input
//         required
//         type="text"
//         placeholder="add a key"
//         value={key}
//         onChange={(e) => setKey(e.target.value)}
//       />
//     </div>
//
//     <div className="flex-center-left">
//       <p style={{ marginLeft: "16px" }}>
//         <span className="subtitle" style={{ marginRight: "8px" }}>
//           Type:{" "}
//         </span>
//       </p>
//       <select
//         value={type}
//         required
//         onChange={(e) => setType(e.target.value)}
//       >
//         <option value="" disabled selected>
//           Select type
//         </option>
//         <option value="STRING">String</option>
//         <option value="INTEGER">Integer</option>
//         <option value="JSON_STRING">JSON String</option>
//         <option value="BOOLEAN">Boolean</option>
//       </select>
//     </div>
//   </div>
//   {type === "BOOLEAN" ? (
//     <select
//       value={value}
//       required
//       style={{ margin: "16px 0" }}
//       onChange={(e) => setValue(e.target.value)}
//     >
//       <option value="true">True</option>
//       <option value="false">False</option>
//     </select>
//   ) : (
//     <input
//       required
//       className={
//         type === "JSON_STRING" && value && !validJson
//           ? "input-error"
//           : ""
//       }
//       style={{ margin: "16px 0" }}
//       type={type === "INTEGER" ? "number" : "text"}
//       placeholder="Add a value"
//       value={value}
//       onChange={(e) => {
//         let str = e.target.value;
//         if (type === "JSON_STRING") IsJsonString(str);
//         setValue(str);
//       }}
//     />
//   )}
//   <div className="flex-center-right">
//     <div className="flex-center-center">
//       <button
//         className=""
//         onClick={() => setAddCard(false)}
//         style={{ marginRight: "8px" }}
//       >
//         Cancel
//       </button>
//       <button type="submit" className="submit-button">
//         Submit
//       </button>
//     </div>
//   </div>
// </form>

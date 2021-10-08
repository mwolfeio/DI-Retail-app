import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import Loader from "../Loader.js";
import RewardsItem from "./RewardsItem.js";

const Section = ({ shop }) => {
  const [open, setOpen] = useState(true);
  const [addCard, setAddCard] = useState(false);
  const [rewardArr, setRewardArr] = useState([]);

  //form inputs
  const [newname, setnewname] = useState();
  const [newpoints, setnewpoints] = useState();
  const [newvalue, setnewvalue] = useState();

  //Firebase Queries
  const [snapshot, loading, error] = useDocumentOnce(
    firestore.collection(`stores/${shop}/rewards`)
  );

  //cloudfunctions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };
  const toggleAddCard = () => {
    setAddCard(!addCard);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!newpoints || !newvalue || !newname) {
      console.log("payload cant be blank");
      return;
    }
    let payload = {
      points: newpoints,
      value: newvalue,
      name: newname,
    };
    newReward(payload);
  };
  const newReward = async (payload) => {
    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/rewards/create`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newData = await response.json();
    console.log("newData: ", newData);
    setRewardArr([...rewardArr, newData]);
  };
  const removeReward = async (id) => {
    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/rewards/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const idToRemove = await response.json();
    const newArr = rewardArr.filter((reward) => reward.id === id);

    setRewardArr(newArr);
  };
  const clearAll = async () => {
    console.log("clearing wishlists");
    const batch = rewardArr.batch();

    idArr.forEach((alert) => {
      console.log("clearing: ", alert);
      batch.delete(firestore.doc(`stores/${shop}/rewards/${alert.id}`));
    });

    await batch.commit();
    setIdArr([]);
  };

  //useEffect
  useEffect(() => {
    console.log("running useEffect");
    if (loading || error) return;
    snapshot.forEach((doc) => {
      if (doc.exists) {
        console.log("adding new data");
        let snapshotObject = doc.data();
        setRewardArr((rewardArr) => [...rewardArr, snapshotObject]);
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
  let sortedArr =
    rewardArr.length < 2
      ? rewardArr
      : rewardArr.sort(function (a, b) {
          return b.points - a.points;
        });

  return (
    <section>
      <SectionHeader
        add={{ display: true, func: toggleAddCard }}
        status={open}
        minimize={toggleOpen}
        title={`Rewards (${rewardArr.length})`}
        dropDown={[{ name: "clear Rewards", func: clearAll }]}
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
            Customers can redeem their points for rewards. Once redeemed, a
            customer receives a personalized discount code that can only be used
            by them. Add and edit the rewards available to your customers here.
          </p>

          <div className="card-container">
            {addCard && (
              <form onSubmit={submitHandler} className="card input-card">
                <p>
                  <span
                    className="subtitle"
                    style={{ marginBottom: "8px", fontSize: "16px" }}
                  >
                    New Rewards{" "}
                  </span>
                </p>
                <div
                  className="flex-center-left"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <h2 style={{ marginRight: "8px" }}>Name:</h2>

                  <input
                    required
                    type="text"
                    placeholder="Add a name (ex. Level 1 Reward)"
                    value={newname}
                    style={{ width: "100%" }}
                    onChange={(e) => setnewname(e.target.value)}
                  />
                </div>
                <div
                  className="flex-center-btw"
                  style={{ width: "100%", marginBottom: "8px" }}
                >
                  <div className="flex-center-left">
                    <h2 style={{ marginRight: "8px" }}>Cost:</h2>

                    <input
                      required
                      type="text"
                      placeholder="Add a cost (ex. 100 Points)"
                      value={newpoints}
                      style={{ width: "100%" }}
                      onChange={(e) => setnewpoints(e.target.value)}
                    />
                  </div>

                  <div className="flex-center-left">
                    <h2 style={{ marginRight: "8px" }}>Value:</h2>
                    <input
                      required
                      type="text"
                      placeholder="Add a value (ex. $5)"
                      value={newvalue}
                      style={{ width: "100%" }}
                      onChange={(e) => setnewvalue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-center-right">
                  <div className="flex-center-center">
                    <button
                      className=""
                      onClick={() => setAddCard(false)}
                      style={{ marginRight: "8px" }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            )}
            {rewardArr.length < 1 ? (
              <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
                <b>No Metafields</b>
              </div>
            ) : (
              <div className="reward-card-wrapper">
                {rewardArr.map((reward) => (
                  <RewardsItem
                    add={newReward}
                    remove={removeReward}
                    reward={reward}
                  />
                ))}
              </div>
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

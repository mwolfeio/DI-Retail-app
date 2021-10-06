import { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import WishlistItem from "./WishlistItem";
import Loader from "../Loader.js";

const WishlistWrapper = ({ email, shop }) => {
  const [idArr, setIdArr] = useState([]);
  const [open, setOpen] = useState(true);

  //Firebase Queries
  const [snapshot, loading, error] = useDocumentOnce(
    firestore.collection(`stores/${shop}/alerts`).where("user", "==", email)
  );

  //functions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };
  const clearAll = async () => {
    console.log("clearing alerts");
    const batch = firestore.batch();

    idArr.forEach((alertId) =>
      batch.delete(firestore.doc(`stores/${shop}/alerts/${alertId}`))
    );

    await batch.commit();
    setIdArr([]);
  };
  const deleteAlert = async (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("deleting alert");

    let newArr = idArr;
    let removed = newArr.splice(i, 1);

    console.log("newArr: ", newArr);
    await firestore.doc(`stores/${shop}/alerts/${id}`).delete();
    setIdArr(newArr);
  };

  if (loading || error)
    return (
      <section>
        <SectionHeader
          add={{ display: false }}
          status={open}
          minimize={toggleOpen}
          title={`Back in stock alerts`}
        />
        {loading ? <Loader /> : <div>{error.message}</div>}
      </section>
    );

  snapshot.forEach((doc) => {
    if (doc.exists) setIdArr([...idArr, doc.data().prodcutId]);
  });

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Back in stock alerts`}
        dropDown={[{ name: "clear List", func: clearAll }]}
      />
      {open && snapshot.empty ? (
        <div className="card-container">
          <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
            <b>No Alerts</b>
          </div>
        </div>
      ) : (
        <div className="card-container ">
          {idArr.map((productId, i) => (
            <WishlistItem
              id={productId}
              remove={deleteAlert}
              index={i}
              shop={shop}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistWrapper;

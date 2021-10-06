import { useState, useEffect } from "react";
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

    idArr.forEach((alert) =>
      batch.delete(firestore.doc(`stores/${shop}/alerts/${alert.id}`))
    );

    await batch.commit();
    setIdArr([]);
  };
  const removeAlert = async (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("deleting alert");

    let newArr = idArr;
    let removed = newArr.splice(i, 1);

    console.log("newArr: ", newArr);
    console.log("removed: ", removed);
    await firestore.doc(`stores/${shop}/alerts/${removed.id}`).delete();
    console.log("completed successfully");
    setIdArr(newArr);
  };

  //useEffect
  useEffect(() => {
    if (snapshot.empty) return;
    snapshot.forEach((doc) => {
      console.log("adding object");
      if (doc.exists) setIdArr((idArr) => [...idArr, doc.data()]);
      // if (doc.exists && !idArr.includes(doc.data().prodcutId))
      //   setIdArr((idArr) => [...idArr, doc.data().prodcutId]);
    });
  }, [snapshot]);

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

  console.log("new state idArr: ", idArr);
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
          {idArr.map((alert, i) => (
            <WishlistItem
              productId={alert.productId}
              index={i}
              shop={shop}
              remove={removeAlert}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistWrapper;

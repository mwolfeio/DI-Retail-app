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

    console.log("removing: ", `stores/${shop}/alerts/${removed.id}`);
    await firestore.doc(`stores/${shop}/alerts/${removed.id}`).delete();
    console.log("completed successfully");
    setIdArr(newArr);
  };

  //useEffect
  useEffect(() => {
    if (loading || error) return;
    snapshot.forEach((doc) => {
      console.log("adding object");
      if (doc.exists && !idArr.includes(doc.data()))
        let snapshotObject = doc.data()
        snapshotObject.id = doc.id
        setIdArr((idArr) => [...idArr, snapshotObject]);
      // if (doc.exists && !idArr.includes(doc.data().prodcutId))
      //   setIdArr((idArr) => [...idArr, doc.data().prodcutId]);
    });
  }, [snapshot]);

  if (loading || error || idArr.length < 1)
    return (
      <section>
        <SectionHeader
          add={{ display: false }}
          status={open}
          minimize={toggleOpen}
          title={`Wishlist`}
        />
        {loading || idArr.length < 1 ? <Loader /> : <div>{error.message}</div>}
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
              prodcutId={alert.prodcutId}
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

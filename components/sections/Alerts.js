import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import WishlistItem from "./WishlistItem";
import Loader from "../Loader.js";

const WishlistWrapper = ({ email, shop }) => {
  const [idArr, setIdArr] = useState([]);
  const [open, setOpen] = useState(true);

  //Firebase Queries
  const [snapshot, loading, error] = useCollectionOnce(
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

    idArr.forEach((alert) => {
      console.log("clearing: ", alert);
      batch.delete(firestore.doc(`stores/${shop}/alerts/${alert.id}`));
    });

    await batch.commit();

    setIdArr([]);
  };
  const removeAlert = async (e, i) => {
    e.preventDefault();
    e.stopPropagation();

    let newArr = [...idArr];
    let removed = newArr.splice(i, 1);
    console.log("removing: ", removed[0].id);

    await firestore.doc(`stores/${shop}/alerts/${removed[0].id}`).delete();

    console.log("success, now setting IdArr to: ", newArr);
    setIdArr(newArr);
  };

  //useEffect
  useEffect(() => {
    if (loading || error) return;
    snapshot.forEach((doc) => {
      if (doc.exists) {
        let snapshotObject = doc.data();
        snapshotObject.id = doc.id;
        setIdArr((idArr) => [...idArr, snapshotObject]);
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
          title={`Back-in-stock Alerts (0)`}
        />
        {loading ? <Loader /> : <div>{error.message}</div>}
      </section>
    );

  console.log("alerts array: ", idArr);
  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Back-in-stock Alerts (${idArr.length})`}
        dropDown={[{ name: "clear List", func: clearAll }]}
      />
      {open &&
        (idArr.length < 1 ? (
          <div className="card-container">
            <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
              <b>No Alerts</b>
            </div>
          </div>
        ) : (
          <div className="card-container ">
            {idArr.map((alert, i) => (
              <WishlistItem
                key={`${alert.id}-item`}
                prodcutId={alert.prodcutId}
                index={i}
                shop={shop}
                remove={removeAlert}
              />
            ))}
          </div>
        ))}
    </section>
  );
};

export default WishlistWrapper;

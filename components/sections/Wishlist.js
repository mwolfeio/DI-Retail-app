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
    console.log("clearing wishlists");
    const batch = firestore.batch();

    idArr.forEach((alertId) =>
      batch.delete(firestore.doc(`stores/${shop}/wishlists/${alertId}`))
    );

    await batch.commit();
    setIdArr([]);
  };
  const removeAlert = async (e, i, id) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("deleting wishlist element");

    let newArr = idArr;
    let removed = newArr.splice(i, 1);

    console.log("newArr: ", newArr);
    await firestore.doc(`stores/${shop}/wishlists/${id}`).delete();
    setIdArr(newArr);
  };

  if (loading || error)
    return (
      <section>
        <SectionHeader
          add={{ display: false }}
          status={open}
          minimize={toggleOpen}
          title={`Wishlist`}
        />
        {loading ? <Loader /> : <div>{error.message}</div>}
      </section>
    );

  snapshot.forEach((doc) => {
    console.log("adding Id");
    if (doc.exists && !idArr.includes(doc.data().prodcutId))
      setIdArr((idArr) => [...idArr, doc.data().prodcutId]);
  });

  console.log("new state idArr: ", idArr);
  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Wishlist`}
        dropDown={[{ name: "clear List", func: clearAll }]}
      />
      {open && snapshot.empty ? (
        <div className="card-container">
          <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
            <b>Wishlist is empty</b>
          </div>
        </div>
      ) : (
        <div className="card-container ">
          {idArr.map((productId, i) => (
            <WishlistItem
              id={productId}
              index={i}
              shop={shop}
              removeAlert={removeAlert}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistWrapper;

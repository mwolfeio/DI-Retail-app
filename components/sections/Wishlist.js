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
    firestore.collection(`stores/${shop}/wishlists`).where("user", "==", email)
  );

  //functions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };
  const clearAll = async () => {
    console.log("clearing wishlists");
    const batch = firestore.batch();

    idArr.forEach((alert) => {
      console.log("clearing: ", alert);
      batch.delete(firestore.doc(`stores/${shop}/wishlists/${alert.id}`));
    });

    await batch.commit();
    setIdArr([]);
  };
  const removeWishlist = async (e, i) => {
    e.preventDefault();
    e.stopPropagation();

    let newArr = idArr;
    let removed = newArr.splice(i, 1);
    console.log("removing: ", removed[0].id);

    await firestore.doc(`stores/${shop}/wishlists/${removed[0].id}`).delete();

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
          title={`Wishlist`}
        />
        {loading ? <Loader /> : <div>{error.message}</div>}
      </section>
    );

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Wishliss`}
        dropDown={[{ name: "clear List", func: clearAll }]}
      />
      {open && snapshot.empty ? (
        <div className="card-container">
          <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
            <b>No wishlists</b>
          </div>
        </div>
      ) : (
        <div className="card-container ">
          {idArr.map((Wishlist, i) => (
            <WishlistItem
              key={`${Wishlist.handle}-item`}
              prodcutId={Wishlist.prodcutId}
              index={i}
              shop={shop}
              remove={removeWishlist}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistWrapper;

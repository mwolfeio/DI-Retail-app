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

    idArr.forEach((Wishlist) =>
      batch.delete(firestore.doc(`stores/${shop}/wishlists/${Wishlist.id}`))
    );

    await batch.commit();
    setIdArr([]);
  };
  const removeWishlist = async (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("deleting Wishlist");

    let newArr = idArr;
    let removed = newArr.splice(i, 1);

    console.log("newArr: ", newArr);
    console.log("removed: ", removed);
    await firestore.doc(`stores/${shop}/wishlists/${removed.id}`).delete();
    console.log("completed successfully");
    setIdArr(newArr);
  };

  //useEffect
  useEffect(() => {
    if (loading || error) return;
    snapshot.forEach((doc) => {
      console.log("adding object");
      if (doc.exists && !idArr.includes(doc.data()))
        setIdArr((idArr) => [...idArr, doc.data()]);
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
          {idArr.map((Wishlist, i) => {
            console.log("Wishlist: ", Wishlist);
            console.log("Wishlist.prodcutId: ", Wishlist.prodcutId);
            return (
              <WishlistItem
                key={`${Wishlist.handle}-item`}
                prodcutId={Wishlist.prodcutId}
                index={i}
                shop={shop}
                remove={removeWishlist}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default WishlistWrapper;

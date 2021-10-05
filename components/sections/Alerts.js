import { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import WishlistItem from "./WishlistItem";
import Loader from "../Loader.js";

//Clear wishlist // TODO:

const WishlistWrapper = ({ email, shop }) => {
  const [open, setOpen] = useState(true);

  //functions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Alerts`}
      />
      {open && <Wishlist email={email} shop={shop} />}
    </section>
  );
};

const Wishlist = ({ email, shop }) => {
  //Firebase Query
  const [snapshot, loading, error] = useDocumentOnce(
    firestore.collection(`stores/${shop}/alerts`).where("user", "==", email)
  );

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let idArr = [];
  console.log("snapshot: ", snapshot);
  snapshot.forEach((doc) => {
    console.log("doc.data(): ", doc.data());
    if (doc.exists) idArr.push(doc.data().prodcutId);
  });

  console.log("idArr: ", idArr);
  return snapshot.empty ? (
    <div className="card-container">
      <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
        <b>No Alerts</b>
      </div>
    </div>
  ) : (
    <div className="card-container ">
      {idArr.map((productId, i) => (
        <WishlistItem id={productId} ref={"wishlists"} index={i} shop={shop} />
      ))}
    </div>
  );
};

export default WishlistWrapper;

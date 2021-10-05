import { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import SectionHeader from "./SectionHeader.js";
import WishlistItem from "./WishlistItem";
import Loader from "../Loader.js";

const WishlistWrapper = ({ email, shop }) => {
  const [open, setOpen] = useState(true);
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
        title={`Wishlist`}
      />
      {open && <Wishlist email={email} shop={shop} />}
    </section>
  );
};

const Wishlist = ({ email, shop }) => {
  //Firebase Query
  const [snapshot, loading, error] = useDocumentOnce(
    firestore.collection(`stores/${shop}/wishlists`).where("user", "==", email)
  );

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let idArr = [];
  snapshot.forEach((doc) => doc.data() && idArr.push(doc.data().productId));

  console.log("idArr: ", idArr);
  return snapshot.empty ? (
    <div className="card-container">
      <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
        <b>No items in wishlist</b>
      </div>
    </div>
  ) : (
    <div className="card-container ">
      {idArr.map((productId) => (
        <WishlistItem id={productId} />
      ))}
    </div>
  );
};

export default WishlistWrapper;

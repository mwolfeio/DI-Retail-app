import { useState, Fragment } from "react";
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
    <section style={{ margin: "24px 0 0 0" }}>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Wishlist`}
      />
      {open && (
        <div className="card-container ">
          <Wishlist email={email} shop={shop} />
        </div>
      )}
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

  return;
  snapshot.empty ? (
    <div className="card-container">
      <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
        <b>No items in wishlist</b>
      </div>
    </div>
  ) : (
    <Fragment>
      {snapshot.map((item) => (
        <WishlistItem item={item.data()} />
      ))}
    </Fragment>
  );
};

export default WishlistWrapper;

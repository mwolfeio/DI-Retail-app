import { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";

const StatCards = ({ shop }) => {
  const [open, setOpen] = useState(true);
  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}/alerts/-CONFIG-`)
  );

  //functions
  const toggleOpen = () => {
    console.log("clicked");
    setOpen(!open);
  };

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let config = data.data();

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Email Settings`}
      />
      {open && (
        <div className="card-container ">
          <p
            className="subtitle"
            style={{
              lineHeight: "22px",
              fontSize: "14px",
              width: "700px",
              margin: "-8px 0 0",
              maxWidth: "Calc(100% - 120px)",
            }}
          >
            Connect and edit the email template used to alert customers to
            products being back in stock.{" "}
          </p>
          <div className="flex-center-left">
            <p>Email Template Id:</p>
          </div>
        </div>
      )}
    </section>
  );
};
export default StatCards;

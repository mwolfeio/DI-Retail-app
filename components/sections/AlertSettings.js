import { useState } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";
import SectionHeader from "./SectionHeader.js";

const StatCards = ({ shop }) => {
  const [open, setOpen] = useState(true);
  const [tempateId, setTemplateId] = useState("");
  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}`)
  );

  //functions
  const toggleOpen = () => setOpen(!open);

  const submitChange = () => {
    console.log("clicked");
  };

  //useEffect
  useEffect(() => {
    if (loading || error) return;
    setTemplateId(data.data().alert_email_template);
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Email Settings`}
      />
      {open && (
        <div>
          {" "}
          <p
            className="subtitle"
            style={{
              lineHeight: "22px",
              fontSize: "14px",
              width: "700px",
              margin: "-8px 0 20px 0",
              maxWidth: "Calc(100% - 120px)",
            }}
          >
            Connect and edit the email template used to alert customers to
            products being back in stock.{" "}
          </p>
          <div className="card-container ">
            <div className="flex-center-left">
              <p>Email Template Id:</p>
              <input
                type="text"
                placeholder="Emter a Sendinblue template id..."
                vlaue={tempateId}
                onChange={(e) => setTemplateId(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default StatCards;

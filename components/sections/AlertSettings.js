import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";
import SectionHeader from "./SectionHeader.js";

const StatCards = ({ shop }) => {
  const [open, setOpen] = useState(true);
  const [templateId, setTemplateId] = useState("");
  const [oldTemplateId, setOldTemplateId] = useState("");
  console.log("route: ", `stores/${shop}`);
  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}`)
  );

  //functions
  const toggleOpen = () => setOpen(!open);
  const handleSubmit = () => {
    console.log("submitting");
    firestore
      .doc(`stores/${shop}`)
      .set({ alert_email_template: templateId }, { merge: true })
      .then(() => {
        setOldTemplateId(templateId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const erase = () => {
    setTemplateId(oldTemplateId);
  };

  //useEffect
  useEffect(() => {
    console.log("running useEffect");
    if (loading || error || data.data() == null) return;
    let docData = data.data();
    let tempId = docData.alert_email_template;
    console.log("docData: ", docData);
    console.log("tempId: ", tempId);
    setTemplateId(tempId);
    setOldTemplateId(tempId);
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  //return component
  let needsSaving = templateId !== oldTemplateId;
  console.log("needsSaving: ", needsSaving);

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
            <div>
              <div className="flex-center-left">
                <p style={{ whiteSpace: "nowrap", marginRight: "16px" }}>
                  Template Id:
                </p>
                <input
                  type="number"
                  placeholder="Enter a Sendinblue template id..."
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                />
              </div>
              <div
                style={{ marginTop: "16px" }}
                className={`flex-center-right ${needsSaving ? "" : "hide"}`}
              >
                <button onClick={erase} style={{ height: "36px" }}>
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="submit-button"
                  style={{ height: "36px", marginLeft: "8px" }}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default StatCards;

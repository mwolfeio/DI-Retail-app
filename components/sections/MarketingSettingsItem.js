import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";
import SectionHeader from "./SectionHeader.js";

const StatCards = ({ shop, title, fieldValue }) => {
  const [open, setOpen] = useState(true);
  const [templateId, setTemplateId] = useState(0);
  const [oldTemplateId, setOldTemplateId] = useState(0);
  console.log("route: ", `stores/${shop}`);
  const [data, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${shop}`)
  );

  const handleSubmit = () => {
    console.log("submitting");
    firestore
      .doc(`stores/${shop}`)
      .set({ [fieldValue]: Number(templateId) }, { merge: true })
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
    let tempId = docData[fieldValue];
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
    <div>
      <div className="flex-center-left">
        <p style={{ whiteSpace: "nowrap", marginRight: "16px" }}>{title}:</p>
        <input
          type="number"
          placeholder="Enter a Sendinblue template id..."
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        />

        <div className={`flex-center-right ${needsSaving ? "" : "hide"}`}>
          <button onClick={erase} style={{ height: "36px", marginLeft: "8px" }}>
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
  );
};
export default StatCards;

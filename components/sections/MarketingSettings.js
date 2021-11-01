import { useState, useEffect } from "react";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Loader from "../Loader.js";
import SectionHeader from "./SectionHeader.js";
import MarketingSettingsItem from "./MarketingSettingsItem.js";

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
            Connect and edit the email template used when gernating personal
            marketing emails. When Generating personalized emails, there can be
            two outcomes. Either the customer is eligible for discounts and the
            discount template is used or not, and the regular template is used.{" "}
            <br />
            Template Variables:{" "}
            <b>
              first_name, last_name, email, points, profile_url, discount,
              product_name_0, product_price_0, product_discounted_price_0,
              product_url_0, image_url_0, product_name_1, product_price_1,
              product_discounted_price_1, product_url_1, image_url_1,
              product_name_2, product_price_2, product_discounted_price_2,
              product_url_2, image_url_2, product_name_3, product_price_3,
              product_discounted_price_3, product_url_3
            </b>{" "}
            and <b>image_url_3</b>.
          </p>
          <div className="card-container ">
            <MarketingSettingsItem
              shop={shop}
              title="Disocunt Template Id"
              fieldValue="discount_email_template"
            />
            <MarketingSettingsItem
              shop={shop}
              title="Regular Template Id"
              fieldValue="regular_email_template"
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default StatCards;

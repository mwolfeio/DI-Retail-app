import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import Opportunities from "../components/sections/Opportunities.js";
import Rewards from "../components/sections/Rewards.js";
import ProductAlerts from "../components/sections/ProductAlerts.js";
// import HeaderCards from "../components/sections/HeaderAlertCards.js";

const GET_SHOP = gql`
  {
    shop {
      id
      url
    }
  }
`;

const getId = (storeName) => {
  return storeName.replace("gid://shopify/Shop/", "");
};
const translateStore = (storeName) => {
  let key = "id_" + getId(storeName);
  let shopTranslator = {
    id_44390383768: "design-ideas",
    id_34498510987: "texxture-home",
    id_56025776295: "larry-traverso",
  };
  return shopTranslator[key];
};

const CustomerPage = () => {
  //Query
  const { loading, error, data } = useQuery(GET_SHOP);
  const [fbData, fbLoading, fbError] = useDocumentOnce(
    firestore.doc(`stores/${shop}/alerts/-STATS-`)
  );

  if (loading || fbLoading) return <Loader />;
  if (error || fbError) return <div>{error.message}</div>;

  let shop = translateStore(data.shop.id);
  let url = data.shop.url.replace("https://", "");

  let alertsStats = fbData.data();
  let productCount = Object.keys(alertsStats).length;
  let aertCount = Object.values(alertsStats).reduce((a, b) => a + b);

  return (
    <main>
      <ButtonNav
        back="customers"
        cnumb={{
          display: false,
        }}
      />
      <div style={{ width: "100%" }}>
        <section className="clear" style={{ marginBottom: "0" }}>
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <h1>Inventory Alerts</h1>
              <h2 className={`subtitle `} style={{ fontSize: "16px" }}>
                <i>Manage alert settings</i>
              </h2>
            </div>
            <div style={{ textAlign: "right" }} className="flex-right-column ">
              <h1 style={{ fontSize: "20px" }}>{aertCount} alerts</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>{productCount} different products</i>
              </h2>
            </div>
          </div>
        </section>
        <section className="disabled">Settings</section>
        <ProductAlerts alertsObj={alertsStats} shop={shop} />
      </div>
    </main>
  );
};
export default CustomerPage;

//  <section className="disabled">USers sorted by alert count</section>

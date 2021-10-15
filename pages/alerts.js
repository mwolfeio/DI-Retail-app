import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import Opportunities from "../components/sections/Opportunities.js";
import Rewards from "../components/sections/Rewards.js";
import ProductAlerts from "../components/sections/ProductAlerts.js";
import HeaderCards from "../components/sections/HeaderAlertCards.js";
import AlertSettings from "../components/sections/AlertSettings.js";

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

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let shop = translateStore(data.shop.id);
  let url = data.shop.url.replace("https://", "");

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
            <HeaderCards shop={shop} />
          </div>
        </section>
        <AlertSettings />
        <ProductAlerts shop={shop} />
      </div>
    </main>
  );
};
export default CustomerPage;

//  <section className="disabled">USers sorted by alert count</section>

import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

//components
import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import Templates from "../components/sections/MarketingSettings.js";
import MarketingSection from "../components/sections/MarketingSection.js";
import SMSMarketing from "../components/sections/SMSMarketing.js";

//gql query
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

//component
const MarketingPage = () => {
  //Query
  // const { loading, error, data } = useQuery(GET_SHOP);
  const loading = false;
  const error = false;
  const data = {
    shop: {
      id: "gid://shopify/Shop/44390383768",
    },
  };

  if (loading || error) {
    return (
      <main>
        <ButtonNav />
        <div
          style={{ height: "100%", width: "100%" }}
          className="flex-center-center"
        >
          {loading ? <Loader /> : error.message}
        </div>
      </main>
    );
  }

  let shop = translateStore(data.shop.id);
  // let url = data.shop.url.replace("https://", "");

  return (
    <main>
      <ButtonNav
        back="customers"
        cnumb={{
          display: false,
        }}
      />
      <div style={{ width: "100%" }}>
        <section className="clear">
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <h1>Marketing</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>Personalized emails and texts</i>
              </h2>
            </div>
            <div style={{ textAlign: "right" }} className="flex-right-column ">
              <h1 style={{ fontSize: "20px" }}>Email Subscriber</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>SMS Subscribers</i>
              </h2>
            </div>
          </div>
        </section>
        <Templates shop={shop} />
        <MarketingSection shop={shop} />
        <SMSMarketing shop={shop} />
      </div>
    </main>
  );
};

export default MarketingPage;

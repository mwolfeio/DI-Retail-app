import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import Opportunities from "../components/sections/Opportunities.js";
import Rewards from "../components/sections/Rewards.js";
import MembershipMembers from "../components/sections/MembershipMembers.js";
import HeaderCards from "../components/sections/HeaderCards.js";

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
              <h1>Membership Program</h1>
              <h2 className={`subtitle `} style={{ fontSize: "16px" }}>
                <i>manage opportunities and customer points</i>
              </h2>
            </div>
            <div style={{ textAlign: "right" }} className="flex-right-column ">
              <h1 style={{ fontSize: "20px" }}>{url}</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>Shopify Id: {getId(data.shop.id)}</i>
              </h2>
            </div>
          </div>

          <HeaderCards shop={shop} />
        </section>
        <Opportunities shop={shop} />
        <Rewards shop={shop} />
        <MembershipMembers shop={shop} />
      </div>
    </main>
  );
};
export default CustomerPage;

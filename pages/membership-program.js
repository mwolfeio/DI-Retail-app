import React from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { firestore } from "../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import Opportunities from "../components/sections/Opportunities.js";
import Rewards from "../components/sections/Rewards.js";
import MembershipMembers from "../components/sections/MembershipMembers.js";

const GET_SHOP = gql`
  {
    shop {
      id
    }
  }
`;

const translateStore = (storeName) => {
  let key = "id_" + storeName.replace("gid://shopify/Shop/", "");
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
  const [statsDoc, dbLoading, fbError] = useDocumentOnce(
    firestore.collection(`stores/${shop}/users/-STATS-`).get
  );

  if (loading || dbLoading) return <Loader />;
  if (error || fbError)
    return <div>{error ? error.message : fbError.message}</div>;

  // let data = {
  //   shop: {
  //     id: "graphql-admin",
  //   },
  // };

  let shop = translateStore(data.shop.id);
  let stats = statsDoc.data();

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
              <h1 style={{ fontSize: "20px" }}>Outstanding points</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>Outstanding codes</i>
              </h2>
            </div>
          </div>

          <div className="order-page-header">
            <div className="clickable-card">
              <h2>Program Members</h2>
              <p>
                {stats.member_count}{" "}
                <span style={{ color: "#b0b7c3" }}>members</span>
              </p>
            </div>

            <div className="clickable-card">
              <h2>Outstanding Points </h2>
              <p>{stats.outstanding_points} Points</p>
            </div>
            <div className="clickable-card">
              <h2>Outstanding Cupons</h2>
              <p>$ </p>
            </div>
          </div>
        </section>
        <Opportunities shop={shop} />
        <Rewards shop={shop} />
        <MembershipMembers memberCount={stats.member_count} shop={shop} />

        <section className="disabled">Members sorted by point total</section>
      </div>
    </main>
  );
};
export default CustomerPage;

// <div
//   style={{ marginLeft: "16px" }}
//   className={`tinny-tag flex-center-center ${
//     !data.order.fullyPaid
//       ? "warning-tiny-tab"
//       : "dissabled-tiny-tab"
//   }`}
// >
//   {!data.order.fullyPaid ? "Unpaid" : "Paid"}
// </div>

// <div className="flex-top-btw">
//   <div style={{ display: "table" }}>
//     {data.order.customer.cus_no ? (
//       <h3>{data.order.customer.cus_no.value}</h3>
//     ) : (
//       ""
//     )}
//     {data.order.customer.res_no ? (
//       <h3>{data.order.customer.res_no.value}</h3>
//     ) : (
//       ""
//     )}
//     <h3>Shopify id: {id}</h3>{" "}
//     <h3>Email: {data.order.customer.email}</h3>
//     <h3>
//       Phone:{" "}
//       {data.order.customer.phone
//         ? data.order.customer.phone
//         : data.order.customer.defaultAddress.phone}
//     </h3>
//   </div>
//   <div style={{ textAlign: "right" }}>
//     <h3 style={{ textAlign: "right" }}>
//       {data.order.customer.ordersCount} Orders <br />
//       <br />
//       {data.order.customer.totalSpent} spent
//     </h3>
//   </div>
// </div>

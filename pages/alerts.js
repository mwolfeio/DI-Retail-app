import React from "react";
import moment from "moment";
import { useRouter } from "next/router";

import Link from "next/link";
import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import MatafieldSection from "../components/sections/Metafields.js";
import Orders from "../components/sections/Orders.js";
import AddressCard from "../components/orderCards/AddressCard.js";
import LineItems from "../components/sections/LineItems.js";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CustomerPage = () => {
  const { id } = useRouter().query;
  console.log(id);
  let globalId = `gid://shopify/Order/${id}`;

  // if (loading) {
  //   return (
  //     <main>
  //       <ButtonNav back="customers" />
  //       <div
  //         style={{ height: "100%", width: "100%" }}
  //         className="flex-center-center"
  //       >
  //         <Loader />
  //       </div>
  //     </main>
  //   );
  // }
  // if (error) {
  //   return (
  //     <main>
  //       <ButtonNav back="customers" />
  //       <div
  //         style={{ height: "100%", width: "100%" }}
  //         className="flex-center-center"
  //       >
  //         {error.message}
  //       </div>
  //     </main>
  //   );
  // }

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
              <h1>Alerts</h1>

              <h2 className={`subtitle `} style={{ fontSize: "16px" }}>
                <i>Manage alert settings</i>
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
              <div className=" flex-center-btw">
                <h2>Metric 1</h2>
              </div>
            </div>

            <div className="clickable-card">
              <div className=" flex-center-btw">
                <h2>Metric 2</h2>
              </div>
            </div>
            <div className="clickable-card">
              <div className=" flex-center-btw">
                <h2>Metric 3</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="disabled">Settings</section>
        <section className="disabled">Product sorted by alert count</section>
        <section className="disabled">alerts</section>
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

import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import Link from "next/link";
import ButtonNav from "../../components/ButtonNav.js";
import Loader from "../../components/Loader.js";
import MatafieldSection from "../../components/sections/Metafields.js";
import Orders from "../../components/sections/Orders.js";
import Interests from "../../components/sections/Interests.js";
import Discounts from "../../components/sections/Discounts.js";
import Placeholder from "../../components/Placeholder.js";

const GET_CUSTOMER = gql`
  query getCustomer($id: ID!) {
    customer(id: $id) {
      defaultAddress {
        address1
        address2
        city
        company
        country
        zip
        provinceCode
        province
        phone
      }
      acceptsMarketing
      createdAt
      addresses(first: 1) {
        address1
        city
        company
        country
        countryCode
        countryCodeV2
        phone
        provinceCode
        province
        zip
      }
      displayName
      email
      firstName
      hasNote
      hasTimelineComment
      image {
        src
      }
      lastName
      lifetimeDuration
      marketingOptInLevel
      metafields(first: 10) {
        edges {
          node {
            id
            key
            namespace
            value
            valueType
          }
        }
      }
      note
      orders(first: 10) {
        edges {
          node {
            id
            name
            totalPrice
            shippingAddress {
              address1
              address2
              city
              company
              countryCode
              provinceCode
              zip
            }
            fulfillable
            metafield(key: "drop_ship", namespace: "Drop Shipping") {
              value
            }
            lineItems(first: 4) {
              edges {
                node {
                  image(maxHeight: 500, maxWidth: 500) {
                    originalSrc
                  }
                  product {
                    id
                  }
                  originalUnitPrice
                  originalTotal
                  quantity
                  sku
                  title
                  vendor
                }
              }
            }
            createdAt
          }
        }
      }
      phone
      ordersCount
      tags
      taxExempt
      taxExemptions
      totalSpent
    }
  }
`;

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CustomerPage = () => {
  const { id, email, shop } = useRouter().query;
  let globalId = `gid://shopify/Customer/${id}`;

  console.log("email: ", email, " id: ", id, "shop: ", shop);

  //Shopify Query
  const { loading, error, data } = useQuery(GET_CUSTOMER, {
    fetchPolicy: "no-cache",
    variables: { id: globalId },
  });

  //Firebase Query
  const [firebaseData, firebaseLoading, firebaseError] = useDocumentOnce(
    firestore.doc(`stores/${shop}/users/${email}`)
  );

  if (loading || firebaseLoading)
    return (
      <Placeholder>
        <Loader />
      </Placeholder>
    );
  if (error || firebaseError)
    return (
      <Placeholder>{error ? error.message : firebaseError.message}</Placeholder>
    );

  console.log("data: ", data);
  console.log("firebaseData: ", firebaseData);
  console.log("firebaseData data: ", firebaseData.data());

  let matafieldsArr = data.customer.metafields.edges;
  let ordersArr = data.customer.orders.edges;
  let interests = firebaseData.data() ? firebaseData.data().interests : {};

  return (
    <main>
      <ButtonNav
        back="customers"
        cnumb={{
          display: false,
          cnumbObj: {},
          globalId: globalId,
          varifiedObj: {},
        }}
      />
      <div style={{ width: "100%" }}>
        <section className="clear">
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <h1>
                {data.customer.firstName} {data.customer.lastName}
              </h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>interests</i>
              </h2>
            </div>
            <div style={{ textAlign: "right" }} className="flex-right-column ">
              <h1 style={{ fontSize: "20px" }}>
                {formatter.format(data.customer.totalSpent)} spent
              </h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>{data.customer.ordersCount} Orders</i>
              </h2>
            </div>
          </div>
          <div className="flex-top-btw">
            <div style={{ display: "table" }}>
              <h3>Email: {data.customer.email}</h3>
              <h3>Phone: {data.customer.phone}</h3>

              <h3 stule>Shopify id: {id.replace("$", "")}</h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <h3 style={{ textAlign: "right" }}>
                Billing Address:
                {data.customer.defaultAddress ? (
                  <div>
                    {data.customer.defaultAddress.address1}
                    <br />
                    {data.customer.defaultAddress.address2}
                    {data.customer.defaultAddress.address2 && <br />}
                    {data.customer.defaultAddress.city},{" "}
                    {data.customer.defaultAddress.provinceCode}
                    <br />
                    {data.customer.defaultAddress.zip},{" "}
                    {data.customer.defaultAddress.country}
                  </div>
                ) : (
                  "No sddress on file"
                )}
              </h3>
            </div>
          </div>
        </section>
        <Interests email={email} interests={interests} />
        <Orders fields={ordersArr} />
        <MatafieldSection
          fields={matafieldsArr}
          type="customer"
          globalId={globalId}
        />
        <section className="disabled">Wishlist</section>
        <section className="disabled">Interests</section>
        <section className="disabled">Reviews</section>
        <section className="disabled">Alerts</section>
        <section className="disabled">Rewards</section>
      </div>
    </main>
  );
};
export default CustomerPage;

// <section className="disabled">Wishlist</section>
// <section className="disabled">Interests</section>
// <section className="disabled">Reviews</section>
// <section className="disabled">Alerts</section>
// <section className="disabled">Rewards</section>

// /<h3>Jained {data.customer.lifetimeDuration} ago</h3>

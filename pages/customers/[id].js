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
import Wishlist from "../../components/sections/Wishlist.js";
import Discounts from "../../components/sections/Discounts.js";
import Placeholder from "../../components/Placeholder.js";
import Alerts from "../../components/sections/Alerts.js";
import Membership from "../../components/sections/Membership.js";

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
      marketingOptInLevel
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
const refreshPage = () => {
  useRouter().reload(window.location.pathname);
};

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

  let matafieldsArr = data.customer.metafields.edges;
  let ordersArr = data.customer.orders.edges;
  let interests = firebaseData.data() ? firebaseData.data().interests : {};
  let points = firebaseData.data() ? firebaseData.data().points : "";
  let isMember = firebaseData.exists;
  let oppArr = firebaseData.data() ? firebaseData.data().opportunities : [];

  return (
    <main>
      <ButtonNav
        cnumb={{
          display: true,
          pointsInt: points,
          email: email,
          shop: shop,
        }}
        dropDown={[{ name: "refresh", func: refreshPage }]}
      />
      <div style={{ width: "100%" }}>
        <section className="clear">
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <div className="flex-center-left">
                <h1 style={{ marginRight: "8px" }}>
                  {data.customer.firstName} {data.customer.lastName}
                </h1>
                {isMember && (
                  <div className="tinny-tag active-tiny-tab flex-center-center">
                    Member
                  </div>
                )}
              </div>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>{data.customer.email}</i>
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
          <div className="flex-top-btw customer-header-subsection">
            <div className="flex-center-right">
              <h3 style={{ marginRight: "12px" }}>Receives marketing: </h3>
              {data.customer.acceptsMarketing ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle opacity="0.3" cx="12" cy="12" r="10" fill="#54E4A6" />
                  <path
                    d="M16.769 7.81769C17.1458 7.41393 17.7786 7.39211 18.1823 7.76895C18.5861 8.14578 18.6079 8.77857 18.2311 9.18232L11.2311 16.6823C10.8655 17.074 10.2561 17.108 9.84923 16.7593L6.34923 13.7593C5.9299 13.3998 5.88134 12.7685 6.24076 12.3492C6.60018 11.9299 7.23148 11.8813 7.65081 12.2407L10.423 14.6169L16.769 7.81769Z"
                    fill="#54E4A6"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle opacity="0.3" cx="12" cy="12" r="10" fill="#B0B7C3" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2782 7.79289C15.8877 7.40237 15.2545 7.40237 14.864 7.79289L12.0355 10.6213L9.20711 7.79289C8.81658 7.40237 8.18342 7.40237 7.79289 7.79289C7.40237 8.18342 7.40237 8.81658 7.79289 9.20711L10.6213 12.0355L7.79289 14.864C7.40237 15.2545 7.40237 15.8877 7.79289 16.2782C8.18342 16.6687 8.81658 16.6687 9.20711 16.2782L12.0355 13.4497L14.864 16.2782C15.2545 16.6687 15.8877 16.6687 16.2782 16.2782C16.6687 15.8877 16.6687 15.2545 16.2782 14.864L13.4497 12.0355L16.2782 9.20711C16.6687 8.81658 16.6687 8.18342 16.2782 7.79289Z"
                    fill="#B0B7C3"
                  />
                </svg>
              )}
            </div>
            <div className="flex-center-right">
              <button
                className={`${!data.customer.acceptsMarketing && "disabled"}`}
                disabled={data.customer.acceptsMarketing ? true : false}
                style={{ marginLeft: "8px" }}
              >
                Resend last Merketing email
              </button>
              <button
                className={` ${
                  !data.customer.acceptsMarketing ? "disabled" : "primary"
                }`}
                style={{ marginLeft: "8px" }}
              >
                Send personalized email
              </button>
            </div>
          </div>
        </section>
        {isMember && (
          <Membership
            email={email}
            points={points}
            oppArr={oppArr}
            shop={shop}
          />
        )}
        <Interests email={email} interests={interests} />
        <Wishlist email={email} shop={shop} />
        <Alerts email={email} shop={shop} />
        <Orders fields={ordersArr} />
        <MatafieldSection
          fields={matafieldsArr}
          type="customer"
          globalId={globalId}
        />

        <section className="disabled">Rewards</section>
      </div>
    </main>
  );
};
export default CustomerPage;

// <Interests email={email} interests={interests} />
// <Wishlist email={email} shop={shop} />
// <Alerts email={email} shop={shop} />
// <Orders fields={ordersArr} />
// <MatafieldSection
//   fields={matafieldsArr}
//   type="customer"
//   globalId={globalId}
// />

//  <section className="disabled">Reviews</section>

// <section className="disabled">Wishlist</section>
// <section className="disabled">Interests</section>
// <section className="disabled">Reviews</section>
// <section className="disabled">Alerts</section>
// <section className="disabled">Rewards</section>

// /<h3>Jained {data.customer.lifetimeDuration} ago</h3>

// <div className="flex-top-btw">
//   <div style={{ display: "table" }}>
//     <h3>Email: {data.customer.email}</h3>
//     <h3>Phone: {data.customer.phone}</h3>
//
//     <h3 stule>Shopify id: {id.replace("$", "")}</h3>
//   </div>
//   <div style={{ textAlign: "right" }}>
//     <h3 style={{ textAlign: "right" }}>
//       Billing Address:
//       {data.customer.defaultAddress ? (
//         <div>
//           {data.customer.defaultAddress.address1}
//           <br />
//           {data.customer.defaultAddress.address2}
//           {data.customer.defaultAddress.address2 && <br />}
//           {data.customer.defaultAddress.city},{" "}
//           {data.customer.defaultAddress.provinceCode}
//           <br />
//           {data.customer.defaultAddress.zip},{" "}
//           {data.customer.defaultAddress.country}
//         </div>
//       ) : (
//         "No sddress on file"
//       )}
//     </h3>
//   </div>
// </div>

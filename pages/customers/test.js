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
import Wishlist from "../../components/sections/Wishlist.js";
import Orders from "../../components/sections/Orders.js";
import Discounts from "../../components/sections/Discounts.js";
import Placeholder from "../../components/Placeholder.js";
import Interests from "../../components/sections/Interests.js";
import Alerts from "../../components/sections/Alerts.js";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const refreshPage = () => {
  useRouter().reload(window.location.pathname);
};

const placeHolder = (msg) => (
  <main>
    <ButtonNav back="customers" />
    <div
      style={{ height: "100%", width: "100%" }}
      className="flex-center-center"
    >
      {msg}
    </div>
  </main>
);

const CustomerPage = () => {
  const { id } = useRouter().query;
  let globalId = `gid://shopify/Customer/${id}`;

  let data = {
    customer: {
      defaultAddress: {
        address1: "16 Depot Square #60",
        address2: "",
        city: "Peterborough",
        company: "Bowerbird & Friends",
        country: "United States",
        zip: "03458",
        provinceCode: "NH",
        province: "New Hampshire",
        phone: "+1 603-924-2550",
        __typename: "MailingAddress",
      },
      acceptsMarketing: true,
      createdAt: "2021-06-16T10:51:25Z",
      addresses: [
        {
          address1: "16 Depot Square #60",
          city: "Peterborough",
          company: "Bowerbird & Friends",
          country: "United States",
          countryCode: "US",
          countryCodeV2: "US",
          phone: "+1 603-924-2550",
          provinceCode: "NH",
          province: "New Hampshire",
          zip: "03458",
          __typename: "MailingAddress",
        },
      ],
      displayName: "Katherine Forrest",
      email: "matthew.wolfe5@gmail.com@yahoo.com",
      firstName: "Katherine",
      hasNote: false,
      hasTimelineComment: false,
      image: {
        src: "https://cdn.shopify.com/proxy/9c36f3827d6a4932cd573a68dff10eb959d527379804822084562afbb24b8f12/www.gravatar.com/avatar/60caa359498acd04f7cc699693bce739.jpg?s=2048&d=https%3A%2F%2Fcdn.shopify.com%2Fshopifycloud%2Fshopify%2Fassets%2Fadmin%2Fcustomers%2Fpolaris%2Favatar-1-b76694110b51e84b3b1f58a87c230122828e20a2d916fffeb403496db8e3f04f.png",
        __typename: "Image",
      },
      lastName: "Forrest",
      lifetimeDuration: "3 months",
      marketingOptInLevel: "SINGLE_OPT_IN",
      metafields: {
        edges: [
          {
            node: {
              id: "gid://shopify/Metafield/19407908012211",
              key: "access_token",
              namespace: "customer_fields",
              value: "95d6468885733eec3b173a85b00b7c94",
              valueType: "STRING",
              __typename: "Metafield",
            },
            __typename: "MetafieldEdge",
          },
          {
            node: {
              id: "gid://shopify/Metafield/19407908044979",
              key: "data",
              namespace: "customer_fields",
              value:
                '{"existing_cus":"Yes","resale":"38-3912838","cus_no":"42370","wholesale_legal":true,"address_type":"biztyp_Corporate"}',
              valueType: "JSON_STRING",
              __typename: "Metafield",
            },
            __typename: "MetafieldEdge",
          },
          {
            node: {
              id: "gid://shopify/Metafield/19978903814323",
              key: "res_no",
              namespace: "Resale Number",
              value: "38-3912838",
              valueType: "STRING",
              __typename: "Metafield",
            },
            __typename: "MetafieldEdge",
          },
          {
            node: {
              id: "gid://shopify/Metafield/19978903847091",
              key: "cus_no",
              namespace: "Customer Number",
              value: "42370",
              valueType: "STRING",
              __typename: "Metafield",
            },
            __typename: "MetafieldEdge",
          },
        ],
        __typename: "MetafieldConnection",
      },
      note: null,
      orders: {
        edges: [
          {
            node: {
              id: "gid://shopify/Order/3987836633267",
              name: "WH1406",
              totalPrice: "1583.50",
              shippingAddress: {
                address1: "16 Depot Square #60",
                address2: "",
                city: "Peterborough",
                company: "Bowerbird & Friends",
                countryCode: "US",
                provinceCode: "NH",
                zip: "03458",
                __typename: "MailingAddress",
              },
              fulfillable: true,
              metafield: {
                value: "FALSE",
                __typename: "Metafield",
              },
              lineItems: {
                edges: [
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/8822367_101_500x500.jpg?v=1611449009",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195781894323",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "125.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "30.00",
                      quantity: 24,
                      sku: "8822367",
                      title: "Nordic™ ornament (finial)",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/8821666_101_500x500.jpg?v=1611449016",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195776553139",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "125.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "30.00",
                      quantity: 24,
                      sku: "8821666",
                      title: "Nordic™ ornament (sleigh)",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/8822364_101_500x500.jpg?v=1611449011",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195781337267",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "125.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "30.00",
                      quantity: 24,
                      sku: "8822364",
                      title: "Nordic™ ornament (nutcracker)",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/8821331_1_06972c77-f8fa-4120-b9f4-43fe60ed947c_500x500.jpg?v=1611235546",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195773833395",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "700.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "84.00",
                      quantity: 12,
                      sku: "8821331",
                      title: "Alpine™ ornaments (snowflakes: set of 24)",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                ],
                __typename: "LineItemConnection",
              },
              createdAt: "2021-08-30T11:21:06Z",
              __typename: "Order",
            },
            __typename: "OrderEdge",
          },
          {
            node: {
              id: "gid://shopify/Order/4029514154163",
              name: "WH1434",
              totalPrice: "2297.00",
              shippingAddress: {
                address1: "16 Depot Square #60",
                address2: "",
                city: "Peterborough",
                company: "Bowerbird & Friends",
                countryCode: "US",
                provinceCode: "NH",
                zip: "03458",
                __typename: "MailingAddress",
              },
              fulfillable: true,
              metafield: {
                value: "false",
                __typename: "Metafield",
              },
              lineItems: {
                edges: [
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/8822751_101_500x500.jpg?v=1611446895",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195782287539",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "1500.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "360.00",
                      quantity: 24,
                      sku: "8822751",
                      title: "Aspen™ tree (6.75 inches: set of 6)",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/8822752_101_500x500.jpg?v=1611446899",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195782615219",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "350.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "84.00",
                      quantity: 24,
                      sku: "8822752",
                      title: "Aspen™ tree (11.5 inches)",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/7003493_101_500x500.jpg?v=1611447288",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195751092403",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "350.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "105.00",
                      quantity: 30,
                      sku: "7003493",
                      title: "Chiku™ long spoon",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                  {
                    node: {
                      image: {
                        originalSrc:
                          "https://cdn.shopify.com/s/files/1/0532/6018/9875/products/3459604_101_500x500.jpg?v=1611234851",
                        __typename: "Image",
                      },
                      product: {
                        id: "gid://shopify/Product/6195737788595",
                        priceRange: {
                          maxVariantPrice: {
                            amount: "750.0",
                            __typename: "MoneyV2",
                          },
                          __typename: "ProductPriceRange",
                        },
                        __typename: "Product",
                      },
                      originalTotal: "90.00",
                      quantity: 12,
                      sku: "3459604",
                      title: "Upland™ tape measure",
                      vendor: "texxture",
                      __typename: "LineItem",
                    },
                    __typename: "LineItemEdge",
                  },
                ],
                __typename: "LineItemConnection",
              },
              createdAt: "2021-09-20T19:54:21Z",
              __typename: "Order",
            },
            __typename: "OrderEdge",
          },
        ],
        __typename: "OrderConnection",
      },
      phone: null,
      ordersCount: "3",
      tags: ["42370_cus_no"],
      taxExempt: true,
      taxExemptions: [],
      totalSpent: "5599.00",
      __typename: "Customer",
    },
  };

  //Firebase Query
  const [firebaseData, firebaseLoading, firebaseError] = useDocumentOnce(
    firestore.doc(`users/${data.customer.email}`)
  );
  if (firebaseLoading)
    <Placeholder>
      <Loader />
    </Placeholder>;
  if (firebaseError) <Placeholder>{firebaseError.message}</Placeholder>;

  console.log("firebaseData: ", firebaseData);

  let matafieldsArr = data.customer.metafields.edges;
  let ordersArr = data.customer.orders.edges;
  let customerNumberObj = matafieldsArr.find(
    (o) => o.node.namespace === "Customer Number" && o.node.key === "cus_no"
  );
  let resaleNumberObj = matafieldsArr.find(
    (o) => o.node.namespace === "Resale Number" && o.node.key === "res_no"
  );
  let cusNumb = customerNumberObj ? customerNumberObj.node.value : "";

  return (
    <main>
      <ButtonNav
        back="customers"
        cnumb={{
          display: true,
          cnumbObj: customerNumberObj ? customerNumberObj.node : {},
          globalId: globalId,
          varified: true,
        }}
        dropDown={[{ name: "refresh", func: refreshPage }]}
      />
      <div style={{ width: "100%" }}>
        <section className="clear">
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <h1>
                {data.customer.firstName} {data.customer.lastName}
              </h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>{data.customer.defaultAddress.company}</i>
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
              <h3 style={{ marginRight: "12px" }}>Recieves marketing: </h3>
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
            <div className="flex-center-right ">
              <button
                className={`${!data.customer.acceptsMarketing && "disabled"}`}
                disabled={data.customer.acceptsMarketing ? true : false}
                style={{ marginLeft: "8px" }}
              >
                Send last Merketing email
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
        <Discounts
          name={`${data.customer.firstName} ${data.customer.lastName}`}
          discountObj={{ value: 5 }}
        />
        <Interests
          email={"matthew.wolfe5@gmail.com"}
          interests={{ test: 1, test2: 4, test5: 6 }}
        />
        <Wishlist email={"matthew.wolfe5@gmail.com"} shop="design-ideas" />

        <Alerts email={"matthew.wolfe5@gmail.com"} shop="design-ideas" />
        <Orders fields={ordersArr} />
        <MatafieldSection fields={matafieldsArr} customerId={globalId} />
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

// /<h3>Jained {data.customer.lifetimeDuration} ago</h3>

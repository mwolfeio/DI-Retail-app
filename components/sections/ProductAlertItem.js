import { useState, useEffect } from "react";
import { useLazyQuery } from "react-apollo";
import { gql } from "apollo-boost";

import SectionHeader from "./SectionHeader.js";
import Link from "next/link";
import Loader from "../Loader.js";

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      variants(first: 50) {
        edges {
          node {
            image(maxHeight: 100, maxWidth: 100) {
              src
            }
            sku
            price
            title
            selectedOptions {
              name
              value
            }
          }
        }
      }
      totalInventory
      onlineStoreUrl
      images(maxHeight: 100, maxWidth: 100, first: 1) {
        edges {
          node {
            src
          }
        }
      }
    }
    shop {
      url
    }
  }
`;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//component
const CustomerPage = ({ prodcutId, index, count, shop }) => {
  const [stateId, setStateId] = useState(prodcutId);
  // if (!active) return <div></div>;
  console.log("stateId ", stateId);

  //Shopify Query
  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCT, {
    fetchPolicy: "no-cache",
    variables: { id: `gid://shopify/Product/${prodcutId}` },
  });

  useEffect(() => {
    console.log("running useEffect for: ", prodcutId);
    setStateId(prodcutId);
    getProduct();
  }, [prodcutId]);

  if (loading || !data) return <Loader />;
  if (error) return <div>{error.message}</div>;

  console.log("data: ", data);
  console.log("product: ", data.product);

  if (!data.product) return <div>Product does not exist</div>;
  let product = data.product;
  let variant =
    product.variants.edges.length > 0 ? product.variants.edges[0].node : {};
  let img =
    product.images.edges.length > 0
      ? product.images.edges[0].node.src
      : "https://i.stack.imgur.com/y9DpT.jpg";

  return (
    <Link href={`/products/${prodcutId}`}>
      <div className="card product-page-product-card alert-card">
        <div className="flex-center-center">
          <div className="alert-bubble flex-center-column">
            <p style={{ lineHeight: "22px", color: "white" }}>{count}</p>
            <p className="subtitle" style={{ color: "white" }}>
              Alert{count === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <img src={img} />
        <div>
          <h2 style={{ lineHeight: "22px" }}>{product.title}</h2>
          <p className="subtitle">
            SKU: {variant.sku} • ID: {prodcutId}
          </p>

          <div className="flex-center-left">
            <a
              target="_blank"
              href={product.onlineStoreUrl}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={{
                  height: "28px",
                  padding: "0 12px",
                  marginLeft: "-12px",
                }}
                className="text-button"
              >
                View
              </button>
            </a>
            <a
              target="_blank"
              href={`${data.shop.url}/admin/products/${prodcutId}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={{ height: "28px", padding: "0 12px" }}
                className="text-button"
              >
                Edit
              </button>
            </a>
          </div>
        </div>
        <div className="flex-center-column">
          <p style={{ lineHeight: "22px" }}>
            {variant.selectedOptions.length
              ? variant.selectedOptions[0].value
              : "Vlaue"}
          </p>
          <p className="subtitle">
            {variant.selectedOptions
              ? variant.selectedOptions[0].name
              : "Attribute"}
          </p>
        </div>
        <div className="flex-center-column">
          <p style={{ lineHeight: "22px" }}>
            {formatter.format(variant.price)}
          </p>
          <p className="subtitle">Price</p>
        </div>
      </div>
    </Link>
  );
};

export default CustomerPage;

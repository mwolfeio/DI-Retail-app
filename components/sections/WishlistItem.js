import { useState } from "react";
import { useQuery } from "react-apollo";
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
          }
        }
      }
      totalInventory
      onlineStoreUrl
      images(maxHeight: 100, maxWidth: 100) {
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

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CustomerPage = ({ id }) => {
  //Shopify Query
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: `gid://shopify/Product/${id}` },
  });

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let product = data.product;
  let img = product.image
    ? product.image.src
    : "https://i.stack.imgur.com/y9DpT.jpg";

  console.log("product: ", product);
  return (
    <Link href={`/products/${id}`}>
      <div className="card orders-page-product-card">
        <img src={img} />
        <div>
          <h2>{product.title}</h2>
          <p className="subtitle">
            SKU: {product.variants.edges[0].node.sku} •{" "}
            {product.variants.edges[0].node.variantTitle}
          </p>
          <div className="flex-center-left">
            <a target="_blank" href={product.onlineStoreUrl}>
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
            <a target="_blank" href={`${data.shop.url}/admin/products/${id}`}>
              <button
                style={{ height: "28px", padding: "0 12px" }}
                className="text-button"
              >
                Edit
              </button>
            </a>
          </div>
        </div>
        <p style={{ color: "#b0b7c3" }}>{product.totalInventory}</p>
        <p>
          <b>{formatter.format(product.variants.edges[0].node.price)}</b>
        </p>
      </div>
    </Link>
  );
};

export default CustomerPage;

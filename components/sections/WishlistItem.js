import { useState } from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

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

// remove item from wishlist // TODO:

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//component
const CustomerPage = ({ id, remove, index, shop }) => {
  const [active, setActive] = useState(true);
  if (!active) return <div></div>;

  //Shopify Query
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: `gid://shopify/Product/${id}` },
  });

  //delete wishlist
  // const deleteItem = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log("removing");
  //   await firestore.doc(`stores/${shop}/${ref}/${id}`).delete();
  //   setActive(false);
  // };

  if (loading) return <Loader />;
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
    <Link href={`/products/${id}`}>
      <div className="card product-page-product-card">
        <img src={img} />
        <div>
          <h2 style={{ lineHeight: "22px" }}>{product.title}</h2>
          <p className="subtitle">
            SKU: {variant.sku} • ID: {id}
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
              href={`${data.shop.url}/admin/products/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={{ height: "28px", padding: "0 12px" }}
                className="text-button"
              >
                Edit
              </button>
            </a>
            <button
              onClick={(e) => deleteAlert(e, index)}
              style={{ height: "28px", padding: "0 12px", color: "#e4545d" }}
              className="text-button"
            >
              Remove
            </button>
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

        <div className="flex-center-column">
          <p style={{ lineHeight: "22px" }}>{product.totalInventory}</p>
          <p className="subtitle">Quantity</p>
        </div>
      </div>
    </Link>
  );
};

export default CustomerPage;

// <div className="card orders-page-product-card">
//   <img src={img} />
//   <div>
//     <h2>{product.title}</h2>
//     <p className="subtitle">
//       SKU: {product.variants.edges[0].node.sku} •{" "}
//       {product.variants.edges[0].node.title}
//     </p>
//     <div className="flex-center-left">
//       <a target="_blank" href={product.onlineStoreUrl}>
//         <button
//           style={{
//             height: "28px",
//             padding: "0 12px",
//             marginLeft: "-12px",
//           }}
//           className="text-button"
//         >
//           View
//         </button>
//       </a>
//       <a target="_blank" href={`${data.shop.url}/admin/products/${id}`}>
//         <button
//           style={{ height: "28px", padding: "0 12px" }}
//           className="text-button"
//         >
//           Edit
//         </button>
//       </a>
//     </div>
//   </div>
//   <p style={{ color: "#b0b7c3" }}>In stock: {product.totalInventory}</p>
//   <p>
//     <b>{formatter.format(product.variants.edges[0].node.price)}</b>
//   </p>
// </div>

import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import Link from "next/link";
import ButtonNav from "../../components/ButtonNav.js";
import Loader from "../../components/Loader.js";
import CollectionDescription from "../../components/sections/CollectionDescription.js";
import CollectionImage from "../../components/sections/CollectionImage.js";

const GET_COLLECTION = gql`
  query getCollection($id: ID!) {
    collection(id: $id) {
      description
      handle
      image {
        src
      }
      desktopImage: metafield(key: "desk_img", namespace: "Desktop Image") {
        id
        value
      }
      mobileImage: metafield(key: "mob_img", namespace: "Mobile Image") {
        id
        value
      }
      desktopProducts: metafield(
        key: "desk_prod"
        namespace: "Desktop Products"
      ) {
        id
        value
      }
      mobileProducts: metafield(key: "mob_prod", namespace: "Mobile Products") {
        id
        value
      }
      productsCount
      products(first: 5, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            featuredImage {
              src
            }
            title
          }
        }
      }
      title
      seo {
        description
        title
      }
    }
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

const ProductPage = () => {
  const { id } = useRouter().query;
  const globalId = `gid://shopify/Collection/${id}`;
  const { loading, error, data } = useQuery(GET_COLLECTION, {
    fetchPolicy: "no-cache",
    variables: { id: globalId },
  });

  if (loading) {
    return (
      <main>
        <ButtonNav />
        <div
          style={{ height: "100%", width: "100%" }}
          className="flex-center-center"
        >
          <Loader />
        </div>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <ButtonNav />
        <div
          style={{ height: "100%", width: "100%" }}
          className="flex-center-center"
        >
          {error.message}
        </div>
      </main>
    );
  }

  let shop = translateStore(data.shop.id);

  console.log("Collection data for globalId: ", data);
  if (!data) return <div>no data</div>;
  let collection = data.collection;

  return (
    <main>
      <ButtonNav
        cnumb={{
          display: false,
          globalId: globalId,
        }}
      />
      <div style={{ width: "100%" }}>
        <section className="clear">
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <h1>{collection.title}</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>Shopify ID: {id}</i>
              </h2>
            </div>
            <div style={{ textAlign: "right" }} className="flex-right-column ">
              <h1 style={{ fontSize: "20px" }}>
                {collection.productsCount} Products
              </h1>
              <div style={{ height: "29px" }} className="flex-center-right">
                <a
                  href={`${data.shop.url}/admin/collections/${collection.handle}`}
                  target="_blank"
                >
                  <button
                    className="text-button"
                    style={{ height: "28px", margin: " 0 8px 0 0" }}
                  >
                    View
                  </button>
                </a>
                <a
                  href={`${data.shop.url}/admin/collections/${id}`}
                  target="_blank"
                >
                  <button className="text-button" style={{ height: "28px" }}>
                    Edit
                  </button>
                </a>
              </div>
            </div>
          </div>
          <p>{collection.description}</p>
        </section>
        <CollectionImage id={id} />
        <CollectionDescription id={id} />
      </div>
    </main>
  );
};
export default ProductPage;

// /<h3>Jained {data.customer.lifetimeDuration} ago</h3>

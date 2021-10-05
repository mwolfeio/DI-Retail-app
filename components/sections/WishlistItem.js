import { useState } from "react";
import SectionHeader from "./SectionHeader.js";
import Link from "next/link";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CustomerPage = ({ item }) => {
  // let product = item.node;
  // let url = product.product ? product.product.onlineStoreUrl : "";
  // let id = product.product
  //   ? product.product.id.replace("gid://shopify/Product/", "")
  //   : "";
  // let img =
  //   product.variant && product.variant.image
  //     ? product.variant.image.src
  //     : product.image
  //     ? product.image.src
  //     : "https://i.stack.imgur.com/y9DpT.jpg";

  // console.log("product: ", product);
  return <div>test</div>;
};

export default CustomerPage;

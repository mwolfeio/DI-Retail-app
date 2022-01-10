import Link from "next/link";

import CustomersIcon from "../../media/icons/Customers.js";
import ListInput from "./InterlistInput.js";

let truncate = (str) => {
  let length = str.length;
  if (length > 50) return `${str.substring(0, 25)}...`;
  else return str;
};
let animationDelayCalc = (index) => {
  let mod = index % 50;
  return mod * 0.03;
};

export default function SpecialPage({ product, index }) {
  let src = product.imgSrc
    ? product.imgSrc
    : "https://i.stack.imgur.com/y9DpT.jpg";

  console.log("ProductList: ", product);
  return (
    <Link href={`/products/${product.id}`} passHref>
      <li
        style={{
          opacity: product.status !== "ACTIVE" ? "1" : "0.6 !important",
          animationDelay: `${animationDelayCalc(index)}s`,
          color:
            product.inventory < 1 && product.status !== "ACTIVE"
              ? "#fdf4e0"
              : "",
        }}
        key={`customer-list-item-${index}`}
      >
        <img src={src} />

        <div className="list-name" style={{ justifySelf: "start" }}>
          <p>{product.title}</p>
          <p className="subtitle">{truncate(product.description)}</p>
        </div>

        <div className="list-name flex-center-column">
          <p>{product.productsCount}</p>
          <p className="subtitle flex-center-column">Products</p>
        </div>

        <span className="svg-container flex-center-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#b0b7c3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.5 7l5 5-5 5"
            ></path>
          </svg>
        </span>
      </li>
    </Link>
  );
}

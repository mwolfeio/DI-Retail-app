import Link from "next/link";
import { firestore } from "../../lib/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import CustomersIcon from "../../media/icons/Customers.js";
import ListInput from "./InterlistInput.js";
// import Varify from "./InterlistVarify.js";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let truncate = (str) => {
  let length = str.length;
  if (length > 26) return `${str.substring(0, 23)}...`;
  else return str;
};

let animationDelayCalc = (index) => {
  let mod = index % 50;
  return mod * 0.03;
};

export default function SpecialPage(props) {
  const [doc, loading, error] = useDocumentOnce(
    firestore.doc(`stores/${props.shop}/users/${props.customer.email}`)
  );

  console.log("route: ", `stores/${props.shop}/users/${props.customer.email}`);

  let hide = loading || error ? true : false;
  let isMember = hide || !doc.exists ? false : true;
  if (error) console.log(error);

  console.log("CustomerList: ", props);
  console.log("Customer doc: ", doc);
  console.log("Customer hide ", props);
  console.log("Customer isMember ", isMember);

  return (
    <Link
      href={{
        pathname: `/customers/${props.customer.id}`,
        query: {
          email: props.customer.email,
          id: props.customer.id,
          shop: props.shop,
        },
      }}
    >
      <li
        className=""
        style={{ animationDelay: `${animationDelayCalc(props.index)}s` }}
        key={`customer-list-item-${props.index}`}
      >
        <div className="list-name" style={{ justifySelf: "start" }}>
          <div
            style={{ flexWrap: "nowrap", width: "100%" }}
            className="flex-center-left"
          >
            <p>{props.customer.name}</p>
            {isMember && (
              <div className="membership-tag flex-center-center">Member</div>
            )}
          </div>
          <p className="subtitle">{truncate(props.customer.email)}</p>
        </div>

        <div className="list-name" style={{ justifySelf: "start" }}>
          <p>{truncate(props.customer.address1)}</p>
          <p className="subtitle">{truncate(props.customer.address2)}</p>
        </div>
        <div className="flex-center-center">
          {props.customer.acceptsMarketing ? (
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
        {isMember ? (
          <ListInput
            data={{
              pointsInt: doc.data().points,
              email: props.customer.email,
              shop: props.shop,
            }}
          />
        ) : (
          <p className="subtitle">-</p>
        )}
        <div className="list-name flex-center-column">
          <p>{props.customer.orders}</p>
          <p className="subtitle flex-center-column">
            {formatter.format(props.customer.totalSpent)}
          </p>
        </div>
        <div
          className="list-name flex-right-column"
          style={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "column",
          }}
        >
          <p style={{ textAlign: "right" }}>{props.customer.age}</p>
        </div>
      </li>
    </Link>
  );
}

// <Link href={`/customers/${props.customer.email}~?#${props.customer.id}`} passHref>

// <Varify
//   cusId={props.customer.varified.id}
//   fieldId={props.customer.varified.id}
//   cnumb={props.customer.cusnumb}
//   varfied={props.customer.varified.id}
// />

import React from "react";
import Link from "next/link";
import Back from "../media/icons/Back.js";
import Dash from "../media/icons/Dashboard.js";
import Customers from "../media/icons/Customers.js";
import Products from "../media/icons/Products.js";
import Orders from "../media/icons/Orders.js";
import Membership from "../media/icons/Membership.js";
import Alerts from "../media/icons/Alerts.js";
import Collections from "../media/icons/Collections.js";
import Marketing from "../media/icons/Marketing.js";
import MoreButton from "./MoreButton.js";
import CustomerNumber from "./CustomerNumber.js";
import { useRouter } from "next/router";

export default function SpecialPage({ cnumb, dropDown, button }) {
  // let link = back ? `/${back}` : "/";
  const router = useRouter();

  return (
    <div className="flex-center-btw" style={{ marginBottom: "16px" }}>
      <div className="flex-center-left">
        <button style={{ marginRight: "8px" }} onClick={() => router.back()}>
          <Back />
          Back
        </button>
        <Link href="/">
          <button className="icon">
            <Dash />
          </button>
        </Link>
        <div className="smll-divider" />
        <Link href="/customers">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Customers />
          </button>
        </Link>
        <Link href="/orders">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Orders />
          </button>
        </Link>
        <Link href="/products">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Products />
          </button>
        </Link>
        <Link href="/collections">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Collections />
          </button>
        </Link>
        <Link href="/membership-program">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Membership />
          </button>
        </Link>
        <Link href="/alerts">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Alerts />
          </button>
        </Link>
        <Link href="/marketing">
          <button className="icon" style={{ marginRight: "8px" }}>
            <Marketing />
          </button>
        </Link>
      </div>
      <div className="flex-center-right">
        {cnumb && cnumb.text}
        {cnumb && cnumb.display ? <CustomerNumber data={cnumb} /> : ""}

        {dropDown && (
          <MoreButton>
            {dropDown.map((lineItem) => (
              <span onClick={lineItem.func}>{lineItem.name}</span>
            ))}
          </MoreButton>
        )}
      </div>
    </div>
  );
}

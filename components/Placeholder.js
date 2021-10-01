import React from "react";

import ButtonNav from "./ButtonNav.js";

export default function SpecialPage(props) {
  return (
    <main>
      <ButtonNav back="customers" />
      <div
        style={{ height: "100%", width: "100%" }}
        className="flex-center-center"
      >
        {props.children}
      </div>
    </main>
  );
}

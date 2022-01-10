import { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import SectionHeader from "./SectionHeader.js";

import MoreButton from "../MoreButton.js";

const Section = ({ arr, id, globalId }) => {
  return (
    <section>
      <SectionHeader
        status={open}
        minimize={toggleOpen}
        title={`Shoppible Image`}
      />
      {open && (
        <div>
          <p
            className="subtitle"
            style={{
              lineHeight: "22px",
              fontSize: "14px",
              width: "700px",
              margin: "-8px 0 20px",
              maxWidth: "Calc(100% - 120px)",
            }}
          >
            Edit the shoppable images for each collection.
          </p>
        </div>
      )}
    </section>
  );
};
export default Section;

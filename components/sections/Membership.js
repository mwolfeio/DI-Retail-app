import { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";

import SectionHeader from "./SectionHeader.js";
import MetafieldInput from "./MetafieldInput.js";

import MoreButton from "../MoreButton.js";

//graphql

const Section = ({ arr, id, globalId }) => {
  const [open, setOpen] = useState(true);
  const [searchTermArray, setSearchTermArray] = useState([
    { code: "DI-7E5EEC", value: 5 },
  ]);
  const [fieldId, setFieldId] = useState(id);
  const [input, setInput] = useState("");

  //Query

  //handlers
  const toggleOpen = () => {
    setOpen(!open);
  };
  const deleteMetafield = () => {
    let payload = {
      variables: {
        input: {
          id: fieldId,
        },
      },
    };

    console.log("deleting: ", payload);
    deleteField(payload)
      .then(() => {
        setSearchTermArray([]);
        setFieldId("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitHandler = () => {
    let newTermsArr = input.split(", ");
    let allTermsArr = [...searchTermArray, ...newTermsArr];

    submit(allTermsArr);
  };
  const submit = (arrayToSubmit) => {
    console.log("arrayToSubmit:", arrayToSubmit);
  };
  const removeTerm = (i) => {
    console.log("running removeTerm");
    let newArr = searchTermArray;
    newArr.splice(i, 1);
    console.log("newArr= ", newArr);
    submit(newArr);
  };

  // useEffect(() => {
  //   setSearchTermArray(arr);
  // }, [arr]);
  useEffect(() => {
    setFieldId(id);
  }, [id]);

  return (
    <section>
      <SectionHeader
        status={open}
        minimize={toggleOpen}
        title={`Membership (${searchTermArray.length})`}
      />
      {open && (
        <div>
          <div className="flex-center-center" style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your terms (ex. term A, term B, etc..)"
            />
            <button
              className=""
              style={{ margin: "0 8px", opacity: input ? 1 : 0.5 }}
              onClick={() => setInput("")}
              disabled={input ? false : true}
            >
              clear
            </button>
            <button
              onClick={submitHandler}
              style={{ opacity: input ? 1 : 0.5 }}
              className={input && "submit-button"}
              disabled={input ? false : true}
            >
              Submit
            </button>
          </div>
          <div
            className="card-container flex-top-left "
            style={{ minHeight: "80px", flexWrap: "wrap" }}
          >
            {searchTermArray.length ? (
              searchTermArray.map((term, i) => (
                <div
                  style={{ color: "#4e5d78" }}
                  className="search-term-tag flex-center-center"
                >
                  {term}
                  <div
                    onClick={() => removeTerm(i)}
                    style={{ color: "#b0b7c3" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      style={{ height: "18px", width: "18px" }}
                    >
                      <path
                        fill="currentColor"
                        d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"
                      ></path>
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="flex-center-center"
                style={{ background: "none", width: "100%" }}
              >
                <p className="subtitle" style={{ fontSize: "14px" }}>
                  No terms yet
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default Section;

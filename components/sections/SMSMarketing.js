import { useState, useEffect } from "react";

//components
import Loader from "../Loader.js";
import SectionHeader from "./SectionHeader.js";

//component
const MarketingPage = ({ shop }) => {
  const [recipiant, setRecipiant] = useState();
  const [user, setUser] = useState();
  const [open1, setOpen1] = useState(true);

  //functions
  // const sendTestEmail = async () => {
  //   console.log("sending test");
  //   try {
  //     const res = await fetch(
  //       `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/marketing/email/${recipiant}/for/${user}"`
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    < style={{ opacity: "0.5" }}>
      <SectionHeader
        status={open1}
        minimize={() => setOpen1(!open1)}
        title="Test Text"
      />
      {open1 && (
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
            Send a test marketing text to a designated number populated with a
            specific customers data.
          </p>
          <div className="card-container">
            <div>
              <div
                className="flex-center-left"
                style={{ marginBottom: "16px" }}
              >
                <p style={{ whiteSpace: "nowrap", marginRight: "16px" }}>
                  User Email
                </p>
                <input
                  disabled="true"
                  type="email"
                  onChange={(e) => setUser(e.target.value)}
                  value={""}
                  placeholder="Who's data would you like to use?"
                />
              </div>
              <div
                className="flex-center-left"
                style={{ marginBottom: "16px" }}
              >
                <p style={{ whiteSpace: "nowrap", marginRight: "16px" }}>
                  Recipiant number
                </p>
                <input
                  disabled="true"
                  type="tel"
                  onChange={(e) => setRecipiant(e.target.value)}
                  value={""}
                  placeholder="Who should recieve this message?"
                />
              </div>
              <div className="flex-center-btw">
                <a href="">
                  <button>Edit sms</button>
                </a>
                <button
                  className="submit-button"
                  disabled={recipiant && user ? false : true}
                  style={{ opacity: recipiant && user ? 1 : 0.5 }}
                >
                  Send Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketingPage;

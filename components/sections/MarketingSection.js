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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sending test");
    try {
      const res = await fetch(
        `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/marketing/email/${recipiant}/for/${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await res.json();
      console.log(response);
      console.log("email sent");
      setRecipiant("");
      setUser("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <SectionHeader
        status={open1}
        minimize={() => setOpen1(!open1)}
        title="Test Email"
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
            Send a test marketing email to a designated email address populated
            with a specific customers data.
          </p>
          <div className="card-container">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div
                className="flex-center-left"
                style={{ marginBottom: "16px" }}
              >
                <p style={{ whiteSpace: "nowrap", marginRight: "16px" }}>
                  User Email
                </p>
                <input
                  required
                  type="email"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  placeholder="Who's data would you like to use?"
                />
              </div>
              <div
                className="flex-center-left"
                style={{ marginBottom: "16px" }}
              >
                <p style={{ whiteSpace: "nowrap", marginRight: "16px" }}>
                  Recipiant Email
                </p>
                <input
                  required
                  type="email"
                  onChange={(e) => setRecipiant(e.target.value)}
                  value={recipiant}
                  placeholder="Who should recieve this test email?"
                />
              </div>
              <div className="flex-center-btw">
                <a href="">
                  <button>Edit Template</button>
                </a>
                <button
                  className="submit-button"
                  disabled={recipiant && user ? false : true}
                  style={{ opacity: recipiant && user ? 1 : 0.5 }}
                  submit
                >
                  Send Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketingPage;

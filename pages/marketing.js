import { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

//components
import ButtonNav from "../components/ButtonNav.js";
import Loader from "../components/Loader.js";
import SectionHeader from "../components/sections/SectionHeader.js";

//gql query
const GET_SHOP = gql`
  {
    shop {
      id
      url
    }
  }
`;
//Customers who except marketing count

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

//component
const MarketingPage = () => {
  const [recipiant, setRecipiant] = useState();
  const [user, setUser] = useState();
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  //Query
  const { loading, error, data } = useQuery(GET_SHOP);
  // let loading = false;
  // let error = false;
  // let data = {
  //   shop: {
  //     id: "44390383768",
  //     url: "test",
  //   },
  // };

  //functions
  const sendTestEmail = () => {
    console.log("sending test");
  };

  if (loading || error) {
    return (
      <main>
        <ButtonNav />
        <div
          style={{ height: "100%", width: "100%" }}
          className="flex-center-center"
        >
          {loading ? <Loader /> : error.message}
        </div>
      </main>
    );
  }

  let shop = translateStore(data.shop.id);
  let url = data.shop.url.replace("https://", "");

  return (
    <main>
      <ButtonNav
        back="customers"
        cnumb={{
          display: false,
        }}
      />
      <div style={{ width: "100%" }}>
        <section className="clear">
          <div className="flex-bottom-btw underline">
            <div style={{ textAlign: "left" }}>
              <h1>Marketing</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>Personalized emails and texts</i>
              </h2>
            </div>
            <div style={{ textAlign: "right" }} className="flex-right-column ">
              <h1 style={{ fontSize: "20px" }}>Email Subscriber</h1>
              <h2 className="subtitle" style={{ fontSize: "16px" }}>
                <i>SMS Subscribers</i>
              </h2>
            </div>
          </div>
        </section>
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
                Send a test mrketing email to a designated email address
                populated with a specific customers data.
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
                      onClick={sendTestEmail}
                    >
                      Send Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section>
          <SectionHeader
            status={open2}
            minimize={() => setOpen1(!open2)}
            title="Test Message"
          />
          {open2 && (
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
                Send a test mrketing text to a designated number populated with
                a specific customers data.
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
                      Recipiant number
                    </p>
                    <input
                      type="tel"
                      onChange={(e) => setRecipiant(e.target.value)}
                      value={recipiant}
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
                      onClick={sendTestEmail}
                    >
                      Send Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MarketingPage;

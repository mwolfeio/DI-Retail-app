import { useState } from "react";

const CustomerPage = ({ acceptsMarketing, shop, email }) => {
  const [loading, setLoading] = useState(false);
  //functions
  const handleSubmit = async () => {
    console.log("sending test");
    try {
      setLoading(true);
      const res = await fetch(
        `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/marketing/email/${email}/for/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let response = await res.json();
      console.log("Sent to shop: ", shop);
      console.log(response);
      console.log("email sent");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-center-right">
      <button
        className={`disabled`}
        disabled={acceptsMarketing && email ? true : false}
        style={{ marginLeft: "8px" }}
      >
        Send personalized text
      </button>
      <button
        onClick={() => {
          if (acceptsMarketing) {
            handleSubmit();
          }
        }}
        className={` ${!acceptsMarketing ? "disabled" : "primary"}`}
        style={{ marginLeft: "8px" }}
      >
        {loading ? "Sending..." : `Send personalized email`}
      </button>
    </div>
  );
};
export default CustomerPage;

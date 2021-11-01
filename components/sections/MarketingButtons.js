const CustomerPage = ({ acceptsMarketing, shop, email }) => {
  //functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sending test");
    try {
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
      console.log(response);
      console.log("email sent");
      setRecipiant("");
      setUser("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-center-right">
      <button
        className={`disabled`}
        disabled={acceptsMarketing ? true : false}
        style={{ marginLeft: "8px" }}
      >
        Send personalized text
      </button>
      <button
        onClick={acceptsMarketing ? handleSubmit() : ""}
        className={` ${!acceptsMarketing ? "disabled" : "primary"}`}
        style={{ marginLeft: "8px" }}
      >
        Send personalized email
      </button>
    </div>
  );
};
export default CustomerPage;

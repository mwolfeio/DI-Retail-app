import { useState, useEffect } from "react";

import SectionHeader from "./SectionHeader.js";
import OpportunitiesItem from "./OpportunitiesItem.js";
import MoreButton from "../MoreButton.js";
import Loader from "../Loader.js";

const Section = ({ shop }) => {
  const [open, setOpen] = useState(true);
  const [allOpportunites, setAllOportunites] = useState([]);
  const [activeOportunites, setActiveOportunites] = useState([]);
  const [Opportunites, setOpportunites] = useState([]);
  const [loading, setLoading] = useState(false);

  //handlers
  const toggleOpen = () => {
    setOpen(!open);
  };

  //functions
  const fetchOpportunities = async () => {
    console.log("running fetchOpportunities");
    setLoading(true);

    //get admin opportunities
    const fullListRes = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/opportunities`
    );
    const fullList = await fullListRes.json();

    // get store opportunities
    const activeListRes = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/opportunities`
    );
    const activeList = await activeListRes.json();
    const finalArr = generateOpportunityArray(fullList, activeList);

    setAllOportunites(fullList);
    setActiveOportunites(activeList);
    setOpportunites(finalArr);
    setLoading(false);
  };
  const addOpportunity = async (id, data) => {
    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/opportunities/${id}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newData = await response.json();
    UpdateOpportunityInArray(true, newData);
  };
  const deleteOpportunity = async (id) => {
    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/opportunities/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newData = await response.json();
    UpdateOpportunityInArray(false, newData);
  };

  const generateOpportunityArray = (allArr, activeArr) => {
    const finalArr = [];
    console.log("allArr: ", allArr);
    console.log("activeArr: ", activeArr);
    allArr.forEach((item) => {
      let id = item.id;
      let index = activeArr.findIndex((x) => x.id === id);

      console.log("index: ", index);
      if (index !== -1) {
        let activeItem = activeArr[index];
        activeItem.active = true;
        finalArr.push(activeItem);
      } else {
        item.active = false;
        finalArr.push(item);
      }
    });

    console.log("finalArr: ", finalArr);
    return finalArr;
  };
  const UpdateOpportunityInArray = (add, item) => {
    let newArr = [...Opportunites];
    let oppArrIndex = newArr.findIndex((x) => x.id === item.id);
    let allArrIndex = allOpportunites.findIndex((x) => x.id === item.id);

    if (add) {
      item.active = true;
      newArr[oppArrIndex] = item;
    } else {
      item = allOpportunites[allArrIndex];
      item.active = false;
      newArr[oppArrIndex] = item;
    }

    return setOpportunites(newArr);
  };

  //onMount hydrate page
  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Opportunities (${activeOportunites.length} / ${allOpportunites.length})`}
      />
      {open && (
        <div>
          <p
            className="subtitle"
            style={{
              lineHeight: "22px",
              fontSize: "14px",
              width: "700px",
              margin: "-8px 0 0",
              maxWidth: "Calc(100% - 120px)",
            }}
          >
            Opportunities offer different ways for your customers to earn
            points. This is a great way to motivate customers to preform desired
            tasks. You can toggle them on or off and change their values.
            Opportunities appear on the customer’s account page.
          </p>
          <p
            className="subtitle"
            style={{
              lineHeight: "22px",
              fontSize: "14px",
              width: "700px",
              margin: "0 0 20px",
              maxWidth: "Calc(100% - 120px)",
            }}
          >
            <i>Note: set Usage limit to 0 for unlimited usage</i>
          </p>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {Opportunites.length < 1 ? (
                <div className="card-container">
                  <div
                    className="flex-center-center"
                    style={{ color: "#b0b7c3" }}
                  >
                    <b>No Opportunites</b>
                  </div>
                </div>
              ) : (
                <div className="card-container">
                  {Opportunites.map((opp) => (
                    <OpportunitiesItem
                      opp={opp}
                      add={addOpportunity}
                      remove={deleteOpportunity}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default Section;

//<img src={`data:image/svg+xml;utf8,${encodeURIComponent(opp.icon)}`} />

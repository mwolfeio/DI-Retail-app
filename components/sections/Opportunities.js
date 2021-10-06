import { useState, useEffect } from "react";

import SectionHeader from "./SectionHeader.js";
import MetafieldInput from "./MetafieldInput.js";

import MoreButton from "../MoreButton.js";

// app.get("/opportunities", getOpportunityOptions);
// app.get("/:store/opportunities", getOpportunities);
// app.get("/:store/opportunities/:name", getOpportunity);
// app.post("/:store/opportunities/:name", addOpportunity);
// app.delete("/:store/opportunities/:name", removeOpportunity);

const Section = ({ shop }) => {
  console.log("from app: ", shop);
  const [open, setOpen] = useState(true);
  const [allOpportunites, setAllOportunites] = useState([]);
  const [Opportunites, setOpportunites] = useState([]);

  //handlers
  const toggleOpen = () => {
    setOpen(!open);
  };

  //functions
  const fetchOpportunities = async () => {
    const promises = [];
    //get admin opportunities
    promises.push(
      fetch(
        `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/opportunities`
      )
    );

    // get store opportunities
    promises.push(
      fetch(
        `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/opportunities`
      )
    );

    const resolved = await Promise.all(promises);
    const finalArr = generateOpportunityArray(resolved[0], resolved[2]);
    setAllOportunites(resolved[0]);
    setOpportunites(finalArr);
  };
  const addOpportunity = async (id, data) => {
    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/opportunities/${id}`,
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newData = await response;
    UpdateOpportunityInArray(true, newData);
  };
  const deleteOpportunity = async (id) => {
    const response = await fetch(
      `https://us-central1-${process.env.PROJECTID}.cloudfunctions.net/api/${shop}/opportunities/${id}`,
      {
        method: "DELETE",
        body: {},
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response;
    UpdateOpportunityInArray(false, data);
  };

  const generateOpportunityArray = (allArr, activeArr) => {
    const finalArr = [];

    allArr.forEach((item) => {
      let id = item.id;
      let index = activeArr.findIndex((x) => x.id === id);

      if (index !== -1) {
        let activeItem = activeArr[index];
        activeItem.active = true;
        finalArr.push(activeItem);
      } else {
        item.active = false;
        finalArr.push(item);
      }
    });

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
      newArr[index] = item;
    }

    return setOpportunites(newArr);
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <section>
      <SectionHeader
        add={{ display: false }}
        status={open}
        minimize={toggleOpen}
        title={`Opportunities (${Opportunites.length} / ${allOpportunites.length})`}
      />
      {open && (
        <div>
          {Opportunites.length < 1 ? (
            <div className="card-container">
              <div className="flex-center-center" style={{ color: "#b0b7c3" }}>
                <b>No Opportunites</b>
              </div>
            </div>
          ) : (
            <div className="card-container">
              {Opportunites.map((opp) => {
                let icon = parser.parseFromString(opp.icon, "image/svg+xml");

                return (
                  <div className="card">
                    {icon}
                    <h3>{opp.name}</h3>
                    <p>{opp.description}</p>
                    <p>{opp.value}</p>
                    <p>{opp.value_type}</p>
                    <p>{opp.limit}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default Section;

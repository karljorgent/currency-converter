import React, { useState } from "react";
import "./css/CreateCurrency.css";

export default function CreateCurrency() {
  const [name, setName] = useState(null);
  const [bid, setBid] = useState(null);
  const [ask, setAsk] = useState(null);

  const handleSubmit = () => {
    const data = {
      name: name,
      bid: bid,
      ask: ask,
    };

    if (name == null || bid == null || ask == null) {
      alert("Please fill out all fields");
    } else {
      let url = "http://localhost:8080/currencies";
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      };
      let status;
      fetch(url, options)
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((json) => {
          if (status === 201) {
            alert("Currency added successfully");
          } else {
            console.log(json);
            if (json.error) alert("Error " + status +  " adding currency: " + json.error); 
            else alert("Error adding currency: " + JSON.stringify(json));
          }
          return json;
        })
        .catch((err) => console.error("error:" + err));
    }
  };

  return (
    <div className="create-currency">
      <h1>Add Currency</h1>
      <form>
        <div className="name">
          Name:
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="bid">
          Bid:
          <input
            type="number"
            onChange={(event) => {
              setBid(event.target.value);
            }}
          />
        </div>
        <div className="ask">
          Ask:
          <input
            type="number"
            onChange={(event) => {
              setAsk(event.target.value);
            }}
          />
        </div>

        <input type="submit" value="Add" onClick={() => handleSubmit()} />
        <input type="submit" value="Cancel" />
      </form>
    </div>
  );
}

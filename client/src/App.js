import React, { useEffect } from "react";
import Dropdown from "react-dropdown";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const width = window.screen.width;
  const navigate = useNavigate();

  const selectLanguage = (e) => {
    localStorage.setItem("language", e.value);

    const data = {
      uuid: localStorage.getItem("uuid"),
    };

    axios
      .post("/", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data posted");
        } else {
          console.log("Response status " + response.status);
        }
      })
      .catch((err) => console.log(err.response.data));
    navigate("/eng-intro");
  };

  return (
    <div className="main">
      <div className="start-text">
        <h1 className="intro-heading">26th Annual Global CEO Survey</h1>

      </div>
      <div
        style={{
          width: width <= 768 ? "90%" : "40%",
          textAlign: "center",
          margin: "auto auto",
        }}
      >
        <Dropdown
          options={options}
          onChange={selectLanguage}
          value={defaultOption}
        />
      </div>
    </div>
  );
}

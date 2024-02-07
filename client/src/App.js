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
  const options = ["Русский", "English"];
  const defaultOption = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Select language / Выберите язык";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!localStorage.getItem("uuid")) {
      localStorage.setItem("uuid", uuidv4());
    }
    localStorage.removeItem("q14-checked");
    localStorage.removeItem("q15");
    localStorage.removeItem("q15-dontknow");
    localStorage.removeItem("q16");
  }, []);

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
        <h1 className="intro-heading">
          26-ой Ежегодный опрос руководителей крупнейших компаний мира
        </h1>
        {/* <h1 className="intro-heading">
          Здравствуйте, опрос закрыт.
        </h1> */}
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

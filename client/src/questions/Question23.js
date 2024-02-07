import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question23() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q23-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q23-checked")));
    }
    if (localStorage.getItem("q23")) {
      setInput(localStorage.getItem("q23"));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  function handleClick(e) {
    const { value } = e.target;
    setInput(value);

    setChecked((prev) => {
      return {
        ...prev,
        [value]: true,
      };
    });

    Object.keys(checked)
      .filter((v) => v === value)
      .map((v) => (checked[v] = true));
    Object.keys(checked)
      .filter((v) => v !== value)
      .map((v) => (checked[v] = false));
  }

  useEffect(() => {
    localStorage.setItem("q23", input);
    localStorage.setItem("q23-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      navigate("/eng-q23b");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q23: localStorage.getItem("q23"),
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
    }
  }

  return (
    
  
        <div className="main">
          <div className="sticky-sub-div">
            <h2 className="percent">
              {Math.round(((100 / 29) * 26).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 26).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <p className="left-align-text question">
                What changes have you noticed in Kazakhstan's investment climate
                during 2021?
              </p>
            ) : (
              <p className="left-align-text question">
                Как, на Ваш взгляд, изменился инвестиционный климат в Казахстане
                за 2022 год?
              </p>
            )}
          </div>
          <Form className="left-align-text">
            <div className="m-div">
              <label className="label-cell m-label">
                <input
                  type="radio"
                  className="radio-input m-input"
                  name="option"
                  value="option1"
                  onChange={handleClick}
                  checked={checked.option1}
                ></input>
                {lng === "English" ? "Improved" : "Улучшился"}
              </label>
            </div>
            <div className="m-div">
              <label className="label-cell m-label">
                <input
                  type="radio"
                  className="radio-input m-input"
                  name="option"
                  value="option2"
                  onChange={handleClick}
                  checked={checked.option2}
                ></input>
                {lng === "English"
                  ? "Stayed the same"
                  : "Остался на прежнем уровне"}
              </label>
            </div>
            <div className="m-div">
              <label className="label-cell m-label">
                <input
                  type="radio"
                  className="radio-input m-input"
                  name="option"
                  value="option3"
                  onChange={handleClick}
                  checked={checked.option3}
                ></input>
                {lng === "English" ? "Declined" : "Ухудшился"}
              </label>
            </div>
            <Buttons lng={lng} click={handleSubmit} />
          </Form>
        </div>
      
    
  );
}

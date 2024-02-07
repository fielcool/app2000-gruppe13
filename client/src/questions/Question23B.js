import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question23B() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q23b-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q23b-checked")));
    }
    if (localStorage.getItem("q23b")) {
      setInput(localStorage.getItem("q23b"));
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
    localStorage.setItem("q23b", input);
    localStorage.setItem("q23b-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      navigate("/eng-q24");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q23b: localStorage.getItem("q23b"),
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
              {Math.round(((100 / 29) * 27).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 27).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <p className="left-align-text question">
                Do you believe that the new Investment Policy Concept of
                Kazakhstan until 2026, approved by the government as of 15 July
                2022 #482 is effective?
                <a
                  href="https://adilet.zan.kz/rus/docs/P2200000482"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (https://adilet.zan.kz/rus/docs/P2200000482)
                </a>
              </p>
            ) : (
              <p className="left-align-text question">
                Считаете ли эффективной новую Концепцию инвестиционной политики
                Республики Казахстан до 2026 года, утвержденной постановлением
                Правительства РК от 15 июля 2022 года № 482?
                <a
                  href="https://adilet.zan.kz/rus/docs/P2200000482"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  (https://adilet.zan.kz/rus/docs/P2200000482)
                </a>
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
                {lng === "English" ? "Ineffective" : "Неэффективная"}
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
                {lng === "English" ? "Effective" : "Эффективная"}
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
                {lng === "English" ? "Don't know" : "Затрудняюсь ответить"}
              </label>
            </div>
            <Buttons lng={lng} click={handleSubmit} />
          </Form>
        </div>
      
    
  );
}

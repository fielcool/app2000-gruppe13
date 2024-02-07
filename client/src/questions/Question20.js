import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question20() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q20-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q20-checked")));
    }
    if (localStorage.getItem("q20")) {
      setInput(localStorage.getItem("q20"));
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
    option4: false,
    option5: false,
    option6: false,
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
    localStorage.setItem("q20", input);
    localStorage.setItem("q20-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q20: localStorage.getItem("q20"),
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

      navigate("/eng-q21");
    }
  }

  return (
    
  
        <div className="main">
          <div className="sticky-sub-div">
            <h2 className="percent">
              {Math.round(((100 / 29) * 21).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 21).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <>
                <p className="question">
                  Excluding the last fiscal year, how did your company’s
                  profitability compare to your closest competitors’ over the
                  previous two years?
                </p>
                <p className="question-i">
                  <i>PLEASE SELECT ONE RESPONSE</i>
                </p>
              </>
            ) : (
              <>
                <p className="question">
                  Исключая последний финансовый год, сравните рентабельность
                  Вашей компании с доходностью Ваших ближайших конкурентов за
                  предыдущие два года?
                </p>
                <p className="question-i">
                  <i>УКАЖИТЕ ТОЛЬКО ОДИН ВАРИАНТ ОТВЕТА</i>
                </p>
              </>
            )}
          </div>
          <Form>
            <div className="left-align-text">
              <div className="m-div">
                <label className="m-label label-cell">
                  <input
                    type="radio"
                    name="option"
                    value="option1"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option1}
                  />
                  {lng === "English"
                    ? "Much worse (>10% below)"
                    : "Гораздо хуже (ниже более чем на 10%)"}
                </label>
              </div>
              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option2"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option2}
                  />
                  {lng === "English" ? "Worse (6–10% below)" : "Хуже (ниже на 6–10%)"}
                </label>
              </div>
              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option3"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option3}
                  />
                  {lng === "English"
                    ? "About the same (between 5% below and 5% above)"
                    : "Тот же уровень (ниже на 5% и выше на 5%)"}
                </label>
              </div>
              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option4"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option4}
                  />
                  {lng === "English" ? "Better (6–10% above)" : "Лучше (выше на 6–10%)"}
                </label>
              </div>
              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option5"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option5}
                  />
                  {lng === "English"
                    ? "Much better (>10% above)"
                    : "Гораздо лучше (выше более чем на 10%)"}
                </label>
              </div>

              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option6"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option6}
                  />
                  {lng === "English" ? "Don't know" : "Затрудняюсь ответить"}
                </label>
              </div>
            </div>
            <Buttons lng={lng} click={handleSubmit} />
          </Form>
        </div>
      
    
  );
}

import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question6() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q6-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q6-checked")));
    }
    if (localStorage.getItem("q6")) {
      setInput(localStorage.getItem("q6"));
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
    option7: false,
    option8: false,
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
    localStorage.setItem("q6", input);
    localStorage.setItem("q6-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q6: localStorage.getItem("q6"),
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

      navigate("/eng-q7");
    }
  }

  return (
    
  
        <div className="main">
          <div className="sticky-sub-div">
            <h2 className="percent">
              {Math.round(((100 / 29) * 7).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 7).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <>
                <p className="question">
                  How do you believe employee resignation/retirement rates in
                  your company will change in the next 12 months?
                </p>
                <p className="question-i">
                  <i>PLEASE SELECT ONE RESPONSE</i>
                </p>
              </>
            ) : (
              <>
                <p className="question">
                  Как, по Вашему мнению, изменится коэффициент увольнений/выхода
                  сотрудников на пенсию в Вашей компании в ближайшие 12 месяцев?
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
                  {lng === "English" ? "Decrease significantly" : "Значительное снижение"}
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
                  {lng === "English" ? "Decrease moderately" : "Умеренное снижение"}
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
                  {lng === "English" ? "Decrease slightly" : "Незначительное снижение"}
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
                  {lng === "English" ? "No change" : "Без изменений"}
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
                  {lng === "English" ? "Increase slightly" : "Незначительное повышение"}
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
                  {lng === "English" ? "Increase moderately" : "Умеренное повышение"}
                </label>
              </div>
              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option7"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option7}
                  />
                  {lng === "English" ? "Increase significantly" : "Значительное повышение"}
                </label>
              </div>
              <div className="m-div">
                <label className="m-label">
                  <input
                    type="radio"
                    name="option"
                    value="option8"
                    onChange={handleClick}
                    className="m-input radio-input"
                    checked={checked.option8}
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

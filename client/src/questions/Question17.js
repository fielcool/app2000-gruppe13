import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question17() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q17-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q17-checked")));
    }
    if (localStorage.getItem("q17")) {
      setInput(localStorage.getItem("q17"));
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
    localStorage.setItem("q17", input);
    localStorage.setItem("q17-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q17: localStorage.getItem("q17"),
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

      navigate("/eng-q18");
    }
  }

  return (
    
  
        <div className="main">
          <div className="sticky-sub-div">
            <h2 className="percent">
              {Math.round(((100 / 29) * 18).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 18).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <>
                <p className="question">
                  To what extent has your work schedule as CEO evolved
                  organically over time versus been actively designed by you?
                </p>
                <p className="question-i">
                  <i>PLEASE SELECT ONE RESPONSE</i>
                </p>
              </>
            ) : (
              <>
                <p className="question">
                  В какой степени Ваш график работы в качестве первого
                  руководителя развивался органично с течением времени или
                  активно выстраивался Вами лично?
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
                  {lng === "English" ? "Entirely organically evolved" : "Полностью органичное развитие"}
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
                  {lng === "English"
                    ? "Mostly organically evolved"
                    : "По большей части органичное развитие"}
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
                    ? "Equally organically evolved and actively designed"
                    : "В равной степени органичное развитие и активная разработка"}
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
                  {lng === "English"
                    ? "Mostly actively designed"
                    : "По большей части активная разработка"}
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
                  {lng === "English" ? "Entirely actively designed" : "Полностью активная разработка"}
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

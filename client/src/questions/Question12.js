import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question12() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q12-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q12-checked")));
    }
    if (localStorage.getItem("q12")) {
      setInput(localStorage.getItem("q12"));
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
    localStorage.setItem("q12", input);
    localStorage.setItem("q12-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q12: localStorage.getItem("q12"),
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

      navigate("/eng-q13");
    }
  }

  return (
    
  
        <div className="main">
          <div className="sticky-sub-div">
            <h2 className="percent">
              {Math.round(((100 / 29) * 13).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 13).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <>
                <p className="question">
                  If your company continues running on its current path, for how
                  long do you think your business will be economically viable?
                </p>
                <p className="question-i">
                  <i>PLEASE SELECT ONE RESPONSE</i>
                </p>
              </>
            ) : (
              <>
                <p className="question">
                  Если Ваша компания продолжит двигаться по прежнему пути, как
                  долго, по Вашему мнению, Ваш бизнес будет экономически
                  жизнеспособным?
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
                  {lng === "English" ? "1 year or less" : "1 год или менее"}
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
                  {lng === "English" ? "2–3 years" : "2–3 года"}
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
                  {lng === "English" ? "4–6 years" : "4–6 лет"}
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
                  {lng === "English" ? "7–10 years" : "7–10 лет"}
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
                  {lng === "English" ? "More than 10 years" : "Более 10 лет"}
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

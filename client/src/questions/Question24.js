import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question24() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q24")) {
      setInput(localStorage.getItem("q24"));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      handleShow();
    } else {
      localStorage.setItem("q24", input);
      navigate("/eng-q25");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q24: localStorage.getItem("q24"),
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
              {Math.round(((100 / 29) * 28).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 28).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <p className="left-align-text">
                Taking into account the business achievements in 2022, please
                name the best Kazakhstan CEO 2022 and why?
              </p>
            ) : (
              <p className="left-align-text">
                Принимая во внимания бизнес-достижения в 2022 году, пожалуйста,
                назовите Лучшего СЕО Казахстана 2022 года и почему?
              </p>
            )}
          </div>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={
                  lng === "English" ? "Specify here" : "Пожалуйста, укажите"
                }
                value={input}
                onChange={handleChange}
                className="input-text"
              ></Form.Control>
            </Form.Group>
            <Buttons lng={lng} click={handleSubmit} />
          </Form>
        </div>
      
    
  );
}

import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";

export default function Question25() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q25")) {
      setInput(localStorage.getItem("q25"));
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
      localStorage.setItem("q25", input);
      navigate("/eng-finish")

      const data = {
        uuid: localStorage.getItem("uuid"),
        q25: localStorage.getItem("q25"),
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
              {Math.round(((100 / 29) * 29).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 29).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <p className="left-align-text">
                What quality should a CEO possess to succeed in the modern
                business environment?
              </p>
            ) : (
              <p className="left-align-text">
                Каким главным качеством, на Ваш взгляд, должен обладать глава
                компании для успешной работы в современной бизнес-среде?
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
            <div className="back-next-btns">
              <Button
                variant="secondary"
                className="back-btn"
                onClick={() => navigate(-1)}
              >
                <i
                  className="fas fa-chevron-left"
                  style={{ marginRight: "8px" }}
                ></i>
                {lng === "English" ? "Back" : "Назад"}
              </Button>

              <Button className="finish-btn" onClick={handleSubmit}>
                <i className="fas fa-check" style={{ marginRight: "8px" }}></i>
                {/* <Link
                  to="/eng-finish"
                  style={{ color: "#fff", textDecoration: "none" }}
                > */}
                  {lng === "English" ? "Finish" : "Завершить"}
                {/* </Link> */}
              </Button>
            </div>
          </Form>
        </div>
      
    
  );
}

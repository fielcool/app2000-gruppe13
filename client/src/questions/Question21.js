import { useNavigate } from "react-router-dom";
import "../App.css";
import "../Medium.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question21() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q21-checkedA")) {
      setCheckedA(JSON.parse(localStorage.getItem("q21-checkedA")));
    }
    if (localStorage.getItem("q21-checkedB")) {
      setCheckedB(JSON.parse(localStorage.getItem("q21-checkedB")));
    }
    if (localStorage.getItem("q21")) {
      setInput(JSON.parse(localStorage.getItem("q21")));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const rows =
    lng === "English"
      ? [
          {
            key: "A",
            value: "Confidence in revenue growth - next 12 months",
          },
          {
            key: "B",
            value: "Confidence in revenue growth - next three years",
          },
        ]
      : [
          {
            key: "A",
            value: "Уверенность в росте выручки - следующие 12 месяцев ",
          },
          {
            key: "B",
            value: "Уверенность в росте выручки - следующие три года ",
          },
        ];

  const columns =
    lng === "English"
      ? [
          {
            key: "1",
            value: "Not confident",
          },
          {
            key: "2",
            value: "Slightly confident",
          },
          {
            key: "3",
            value: "Moderately confident",
          },
          {
            key: "4",
            value: "Very confident",
          },
          {
            key: "5",
            value: "Extremely confident",
          },
          {
            key: "6",
            value: "Don't know",
          },
        ]
      : [
          {
            key: "1",
            value: "Не уверен (-а)",
          },
          {
            key: "2",
            value: "Немного уверен (-а)",
          },
          {
            key: "3",
            value: "Умеренно уверен (-а)",
          },
          {
            key: "4",
            value: "Очень уверен (-а)",
          },
          {
            key: "5",
            value: "Чрезвычайно уверен (-а)",
          },
          {
            key: "6",
            value: "Затрудняюсь ответить",
          },
        ];

  const [input, setInput] = useState({
    A: "",
    B: "",
  });

  const [checkedA, setCheckedA] = useState({
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
  });
  const [checkedB, setCheckedB] = useState({
    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,
  });

  function handleClick(e) {
    const { name, value } = e.target;
    const index = name + value;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    if (name === "A") {
      Object.keys(checkedA)
        .filter((v) => v === index)
        .map((v) => (checkedA[v] = true));
      Object.keys(checkedA)
        .filter((v) => v !== index)
        .map((v) => (checkedA[v] = false));
    }
    if (name === "B") {
      Object.keys(checkedB)
        .filter((v) => v === index)
        .map((v) => (checkedB[v] = true));
      Object.keys(checkedB)
        .filter((v) => v !== index)
        .map((v) => (checkedB[v] = false));
    }
  }

  useEffect(() => {
    localStorage.setItem("q21-checkedA", JSON.stringify(checkedA));
    localStorage.setItem("q21-checkedB", JSON.stringify(checkedB));
    localStorage.setItem("q21", JSON.stringify(input));
  }, [input, checkedA, checkedB]);

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.entries(input).filter((el) => el[1] === "").length > 0) {
      handleShow();
    } else {
      navigate("/eng-q22");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q21: JSON.parse(localStorage.getItem("q21")),
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
            {Math.round(((100 / 29) * 22).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 22).toString() + "%",
              }}
            ></div>
          </div>
          <ModalAlert show={show} close={handleClose} />
          {lng === "English" ? (
            <>
              <p className="question">
                How confident are you about your company’s prospects for revenue
                growth over: <br />- the next 12 months?
                <br />- the next three years?
              </p>
              <p className="question-i">
                <i>PLEASE SELECT ONE RESPONSE FOR EACH STATEMENT</i>
              </p>
            </>
          ) : (
            <>
              <p className="question">
                Насколько вы уверены в перспективах роста выручки вашей компании
                в течение:
                <br />- cледующих 12 месяцев?
                <br />- следующих трех лет?
              </p>
              <p className="question-i">
                <i>ДЛЯ КАЖДОЙ СТРОКИ УКАЖИТЕ ТОЛЬКО ОДИН ВАРИАНТ ОТВЕТА</i>
              </p>
            </>
          )}
        </div>
        {width <= 768 ? (
          <div className="left-align-text">
            {rows.map((row) => {
              return (
                <div key={row.key}>
                  <strong>
                    <p className="question" style={{ color: "#db536a" }}>
                      {row.key}) {row.value}
                    </p>
                  </strong>
                  {columns.map((col) => {
                    return (
                      <div className="m-div" key={col.key}>
                        <label className="m-label">
                          <input
                            type="radio"
                            name={row.key}
                            value={col.key}
                            onChange={handleClick}
                            className="m-input"
                            checked={
                              row.key === "A"
                                ? checkedA[`${row.key}${col.key}`]
                                : row.key === "B"
                                ? checkedB[`${row.key}${col.key}`]
                                : ""
                            }
                          ></input>
                          {col.value}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <table className="table">
            <tbody>
              <tr>
                <td colSpan="2"></td>

                {columns.map((col) => {
                  return (
                    <td style={{ width: "150px" }} key={col.key}>
                      <strong>{col.value}</strong>
                    </td>
                  );
                })}
              </tr>
              {rows.map((row) => {
                return (
                  <tr className="table-row" key={row.key}>
                    <td>{row.key}</td>
                    <td className="left-align-text">{row.value}</td>
                    {columns.map((col) => {
                      return (
                        <td className="input-cell" key={col.key}>
                          <label className="label-cell">
                            <input
                              type="radio"
                              name={row.key}
                              value={col.key}
                              onChange={handleClick}
                              checked={
                                row.key === "A"
                                  ? checkedA[`${row.key}${col.key}`]
                                  : row.key === "B"
                                  ? checkedB[`${row.key}${col.key}`]
                                  : ""
                              }
                            ></input>
                          </label>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <Buttons lng={lng} click={handleSubmit} />
      </div>
    
  );
}

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import "../Small.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question1() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q1-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q1-checked")));
    }
    if (localStorage.getItem("q1")) {
      setInput(JSON.parse(localStorage.getItem("q1")));
    }
  }, []);

  const rows = [
    {
      key: "A",
      value:
        lng === "English"
          ? "Global economic growth - next 12 months"
          : "Глобальный экономический рост - следующие 12 месяцев",
    },
    {
      key: "B",
      value:
        lng === "English"
          ? "Kazakhstan economic growth - next 12 months"
          : "Экономический рост Казахстана  - следующие 12 месяцев",
    },
  ];

  const columns = [
    {
      key: "1",
      value:
        lng === "English" ? "Decline significantly" : "Значительно снизится",
    },
    {
      key: "2",
      value: lng === "English" ? "Decline moderately" : "Умеренно снизится",
    },
    {
      key: "3",
      value: lng === "English" ? "Decline slightly" : "Немного снизится",
    },
    {
      key: "4",
      value:
        lng === "English" ? "Stay the same" : "Останется на прежнем уровне",
    },
    {
      key: "5",
      value: lng === "English" ? "Improve slightly" : "Немного повысится",
    },
    {
      key: "6",
      value: lng === "English" ? "Improve moderately" : "Умеренно повысится",
    },
    {
      key: "7",
      value:
        lng === "English" ? "Improve significantly" : "Значительно повысится",
    },
    {
      key: "8",
      value: lng === "English" ? "Don't know" : "Затрудняюсь ответить",
    },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    A: "",
    B: "",
  });

  const [checked, setChecked] = useState({
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
    A7: false,
    A8: false,

    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,
    B7: false,
    B8: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const index = name + value;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setChecked((prev) => {
      return {
        ...prev,
        [index]: true,
      };
    });

    Object.keys(checked)
      .filter((el) => el === index)
      .map((el) => {
        return (checked[el] = true);
      });
    Object.keys(checked)
      .filter((el) => el !== index && el.slice(0, 1) === name)
      .map((el) => {
        return (checked[el] = false);
      });
  }

  useEffect(() => {
    localStorage.setItem("q1", JSON.stringify(input));
    localStorage.setItem("q1-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (input.A && input.B) {
      navigate("/eng-q2");
      const data = {
        uuid: localStorage.getItem("uuid"),
        q1: JSON.parse(localStorage.getItem("q1")),
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
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 2).toString())}
          {lng === "English" ? "% completed" : "% завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 2).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          {lng === "English" ? (
            <>
              <p className="question">
                How do you believe economic growth (i.e., gross domestic
                product) will change, if at all, over the next 12 months in:{" "}
                <br />
                <span style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                  A) the global economy?
                </span>
                <br />
                <span style={{ marginLeft: "2rem" }}>
                  B) Kazakhstan economy?
                </span>
              </p>
              <i>
                <p className="question-i">
                  PLEASE SELECT ONE RESPONSE PER EACH STATEMENT
                </p>
              </i>
            </>
          ) : (
            <>
              <p className="question">
                Как, по вашему мнению, изменится экономический рост (т.е.
                валовой внутренний продукт) в следующие 12 месяцев, если вообще
                изменится: <br />
                <span style={{ marginLeft: "2rem", marginTop: "1rem" }}>
                  A) глобальная экономика?
                </span>
                <br />
                <span style={{ marginLeft: "2rem" }}>
                  B) экономика Казахстана?{" "}
                </span>
              </p>
              <i>
                <p className="question-i">
                  ДЛЯ КАЖДОЙ СТРОКИ УКАЖИТЕ ТОЛЬКО ОДИН ВАРИАНТ ОТВЕТА
                </p>
              </i>
            </>
          )}
        </div>
      </div>
      {width <= 768 ? (
        <div className="left-align-text">
          {rows.map((row) => {
            return (
              <div key={row.key}>
                <strong>
                  <p style={{ color: "#db536a" }} className="question">
                    {row.key}) {row.value}
                  </p>
                </strong>

                {columns.map((col) => {
                  return (
                    <div className="m-div" key={col.key}>
                      <label className="m-label">
                        <input
                          className="m-input"
                          name={row.key}
                          value={col.key}
                          type="radio"
                          onChange={handleChange}
                          checked={checked[`${row.key}${col.key}`]}
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
        <Form>
          <table className="table">
            <tbody>
              <tr>
                <td colSpan="2"></td>
                {columns.map((col) => {
                  return (
                    <td key={col.key}>
                      <strong>{col.value}</strong>
                    </td>
                  );
                })}
              </tr>
              {rows.map((row) => {
                return (
                  <tr key={row.key} className="table-row">
                    <td>{row.key}</td>
                    <td className="left-align-text">{row.value}</td>

                    {columns.map((col) => {
                      return (
                        <td key={col.key} className="input-cell">
                          <label className="label-cell">
                            <input
                              name={row.key}
                              value={col.key}
                              type="radio"
                              onChange={handleChange}
                              checked={checked[`${row.key}${col.key}`]}
                              className="radio-input"
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
        </Form>
      )}
      <Buttons lng={lng} click={handleSubmit} />
    </div>
  );
}

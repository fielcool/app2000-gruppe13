import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question5() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q5-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q5-checked")));
    }
    if (localStorage.getItem("q5")) {
      setInput(JSON.parse(localStorage.getItem("q5")));
    }
  }, []);
  const rows = [
    {
      key: "A",
      value:
        lng === "English"
          ? "Reducing workforce (e.g., layoffs, redundancies)"
          : "Сокращение рабочей силы (например, сокращение штата, увольнения)",
    },
    {
      key: "B",
      value:
        lng === "English"
          ? "Implementing hiring freezes"
          : "Введение моратория на прием на работу",
    },
    {
      key: "C",
      value:
        lng === "English" ? "Slowing investments" : "Замедление инвестиций",
    },
    {
      key: "D",
      value: lng === "English" ? "Delaying deals" : "Отсрочка сделок",
    },
    {
      key: "E",
      value:
        lng === "English"
          ? "Reducing operating costs"
          : "Снижение операционных затрат",
    },
    {
      key: "F",
      value:
        lng === "English"
          ? "Finding alternative suppliers"
          : "Поиск альтернативных поставщиков",
    },
    {
      key: "G",
      value:
        lng === "English"
          ? "Diversifying our product/service offering"
          : "Диверсификация наших продуктов/услуг",
    },
    {
      key: "H",
      value:
        lng === "English"
          ? "Reevaluating ongoing projects or major initiatives"
          : "Переоценка текущих проектов или крупных инициатив",
    },
    {
      key: "I",
      value:
        lng === "English"
          ? "Reducing compensation"
          : "Сокращение компенсационных выплат",
    },
    {
      key: "J",
      value:
        lng === "English"
          ? "Raising prices of products and services"
          : "Повышение цен на товары и услуги",
    },
  ];
  const columns = [
    {
      key: "1",
      value:
        lng === "English"
          ? "We do not plan to do this"
          : "Мы не планируем этого делать",
    },
    {
      key: "2",
      value:
        lng === "English"
          ? "We are considering this in the next 12 months"
          : "Мы рассматриваем данный вариант в течение следующих 12 месяцев",
    },
    {
      key: "3",
      value:
        lng === "English"
          ? "We are already doing this/have done this"
          : "Мы уже делаем это/сделали это",
    },
    {
      key: "4",
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
    C: "",
    D: "",
    E: "",
    F: "",
    G: "",
    H: "",
    I: "",
    J: "",
  });
  const [checked, setChecked] = useState({
    A1: false,
    A2: false,
    A3: false,
    A4: false,

    B1: false,
    B2: false,
    B3: false,
    B4: false,

    C1: false,
    C2: false,
    C3: false,
    C4: false,

    D1: false,
    D2: false,
    D3: false,
    D4: false,

    E1: false,
    E2: false,
    E3: false,
    E4: false,

    F1: false,
    F2: false,
    F3: false,
    F4: false,

    G1: false,
    G2: false,
    G3: false,
    G4: false,

    H1: false,
    H2: false,
    H3: false,
    H4: false,

    I1: false,
    I2: false,
    I3: false,
    I4: false,

    J1: false,
    J2: false,
    J3: false,
    J4: false,
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
      .forEach((el) => {
        checked[el] = true;
      });
    Object.keys(checked)
      .filter((el) => el !== index && el.slice(0, 1) === name)
      .forEach((el) => {
        checked[el] = false;
      });
  }

  useEffect(() => {
    localStorage.setItem("q5", JSON.stringify(input));
    localStorage.setItem("q5-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      input.A &&
      input.B &&
      input.C &&
      input.D &&
      input.E &&
      input.F &&
      input.G &&
      input.H &&
      input.I &&
      input.J
    ) {
      // localStorage.setItem("q5-carbonNeutral", input.A);
      // localStorage.setItem("q5-netZero", input.B);

      const data = {
        uuid: localStorage.getItem("uuid"),
        q5: JSON.parse(localStorage.getItem("q5")),
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

      navigate("/eng-q6");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 6).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 6).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        {lng === "English" ? (
          <>
            <p className="question">
              Which of the following options best describes any action your
              company may be considering to mitigate against potential economic
              challenges and volatility in the next 12 months?
            </p>
            <p className="question-i">
              <i>PLEASE SELECT ONE RESPONSE UNDER EACH STATEMENT LISTED</i>
            </p>
          </>
        ) : (
          <>
            <p className="question">
              Какой из следующих вариантов лучше всего описывает любые действия,
              которые Ваша компания может рассмотреть для смягчения последствий
              потенциальных экономических проблем и нестабильности в следующие
              12 месяцев?
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
                <p
                  className="question question-options"
                  style={{ color: "#db536a" }}
                >
                  <strong>
                    {row.key}) {row.value}
                  </strong>
                </p>
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
        <>
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
                    <td className="left-align-text" style={{ width: "200px" }}>
                      {row.value}
                    </td>
                    {columns.map((col) => {
                      return (
                        <td
                          key={col.key}
                          className="input-cell"
                          // style={{ width: "250px" }}
                        >
                          <label className="label-cell">
                            <input
                              name={row.key}
                              value={col.key}
                              type="radio"
                              onChange={handleChange}
                              checked={checked[`${row.key}${col.key}`]}
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
        </>
      )}
      <Buttons lng={lng} click={handleSubmit} />
    </div>
  );
}

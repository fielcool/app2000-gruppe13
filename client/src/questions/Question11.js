import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import "../Small.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question11() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q11-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q11-checked")));
    }
    if (localStorage.getItem("q11")) {
      setInput(JSON.parse(localStorage.getItem("q11")));
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
            value:
              "The final outcomes of the projects I review tend to meet or exceed initial forecasts of their financial performance",
          },
          {
            key: "B",
            value:
              "Leaders in my company tolerate small-scale failures",
          },
          {
            key: "C",
            value:
              "Leaders in my company make strategic decisions for their function or division without consulting me",
          },
          {
            key: "D",
            value:
              "Leaders in my company encourage dissent and debate",
          },
          {
            key: "E",
            value:
              "The behaviours of employees are aligned with my company's values and direction",
          },
        ]
      : [
          {
            key: "A",
            value:
              "Окончательные результаты проектов, которые я проверяю, как правило, соответствуют первоначальным прогнозам их финансовых результатов или превосходят их",
          },
          {
            key: "B",
            value: "Руководители в моей компании терпят мелкие неудачи",
          },
          {
            key: "C",
            value:
              "Руководители в моей компании принимают стратегические решения для своей функции или подразделения, не консультируясь со мной",
          },
          {
            key: "D",
            value:
              "Руководители в моей компании поощряют разногласие во мнениях и обсуждения",
          },
          {
            key: "E",
            value:
              "Поведение сотрудников соответствует ценностям и направлениям моей компании",
          },
        ];

  const columns =
    lng === "English"
      ? [
          {
            key: "1",
            value: "Rarely 0–20% of the time",
          },
          {
            key: "2",
            value: "Occasionally 21–40% of the time",
          },
          {
            key: "3",
            value: "Sometimes 41–60% of the time",
          },
          {
            key: "4",
            value: "Often 61–80% of the time",
          },
          {
            key: "5",
            value: "Usually 81–100% of the time",
          },
          {
            key: "6",
            value: "Don't know",
          },
        ]
      : [
          {
            key: "1",
            value: "Редко 0–20% времени",
          },
          {
            key: "2",
            value: "Время от времени 21–40% времени",
          },
          {
            key: "3",
            value: "Иногда 41–60% времени",
          },
          {
            key: "4",
            value: "Часто 61–80% времени",
          },
          {
            key: "5",
            value: "В большинстве случаев 81–100% времени",
          },
          {
            key: "6",
            value: "Затрудняюсь ответить",
          },
        ];

  const [input, setInput] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });

  const [checked, setChecked] = useState({
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,

    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,

    C1: false,
    C2: false,
    C3: false,
    C4: false,
    C5: false,
    C6: false,

    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
    D6: false,

    E1: false,
    E2: false,
    E3: false,
    E4: false,
    E5: false,
    E6: false,
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

    setChecked((prev) => {
      return {
        ...prev,
        [index]: true,
      };
    });

    Object.keys(checked)
      .filter((v) => v[0].slice(0, 1) === name && v[0] === index)
      .map((v) => (checked[v] = true));
    Object.keys(checked)
      .filter((v) => v[0].slice(0, 1) === name && v[0] !== index)
      .map((v) => (checked[v] = false));
  }

  useEffect(() => {
    localStorage.setItem("q11-checked", JSON.stringify(checked));
    localStorage.setItem("q11", JSON.stringify(input));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.entries(input).filter((x) => x[1] === "").length > 0) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q11: JSON.parse(localStorage.getItem("q11")),
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

      navigate("/eng-q12");
    }
  }

  return (

      <div className="main">
        <div className="sticky-sub-div">
          <h2 className="percent">
            {Math.round(((100 / 29) * 12).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 12).toString() + "%",
              }}
            ></div>
          </div>
          <ModalAlert show={show} close={handleClose} />
          {lng === "English" ? (
            <>
              <p className="question">
                For each of the statements below, please indicate how frequently
                these occur in your company:
              </p>
              <p className="question-i">
                <i>PLEASE SELECT ONE RESPONSE UNDER EACH STATEMENT LISTED</i>
              </p>
            </>
          ) : (
            <>
              <p className="left-align-text question">
                Для каждого из приведенных ниже утверждений укажите, как часто
                они встречаются в Вашей компании:
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
                <div className="left-align-text" key={row.key}>
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
                            className="m-input"
                            type="radio"
                            name={row.key}
                            value={col.key}
                            onChange={handleClick}
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
          <form>
            <Table bordered style={{ fontSize: "14px" }}>
              <thead>
                <tr>
                  <th colSpan="2"></th>
                  {columns.map((column) => {
                    return <th key={column.key}>{column.value}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  return (
                    <tr key={row.key}>
                      <td>{row.key}</td>
                      <td className="left-align-text">{row.value}</td>
                      {columns.map((col) => {
                        return (
                          <td className="input-cell" key={col.key}>
                            <label className="label-cell">
                              <input
                                type="radio"
                                className="m-input"
                                name={row.key}
                                value={col.key}
                                onChange={handleClick}
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
            </Table>
          </form>
        )}
        <Buttons lng={lng} click={handleSubmit} />
      </div>
    
  );
}

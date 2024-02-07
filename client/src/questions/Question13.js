import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import "../Small.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import Dropdown from "react-dropdown";

export default function Question13() {
  const lng = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Русский";
  const options =
    lng === "English"
      ? [
          "Energy, Utilities and Resources, Mining",
          "Financial Services",
          "Healthcare and Pharma Life Sciences",
          "Industrial Manufacturing & Automotive",
          "Retail & Consumer",
          "Telecommunications, Media and Technology",
          "Other (please specify)",
        ]
      : [
          "Ресурсы, энергетика и горнодобывающая отрасль",
          "Финансовый сектор",
          "Фармацевтика и здравоохранение",
          "Сектор машиностроения, производства промышленных товаров и автомобильная отрасль",
          "Розничная торговля и производство потребительских товаров",
          "Телекоммуникации, медиа и технологии",
          "Другое (укажите)",
        ];
  const defaultOption = localStorage.getItem("q13-industry")
    ? localStorage.getItem("q13-industry")
    : lng === "English"
    ? "Select industry"
    : "Выберите отрасль";

  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q13-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q13-checked")));
    }
    if (localStorage.getItem("q13")) {
      setInput(JSON.parse(localStorage.getItem("q13")));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const rows =
    lng === "English"
      ? [
          {
            key: "A",
            value: "New entrants to my industry from adjacent industries",
          },
          {
            key: "B",
            value:
              "Technology disruptors (e.g., advanced tech, AI, metaverse, blockchain)",
          },
          {
            key: "C",
            value: "Supply chain disruption",
          },
          {
            key: "D",
            value: "Labour/skills shortages",
          },
          {
            key: "E",
            value: "Changes in regulation",
          },
          {
            key: "F",
            value: "Transition to new energy sources",
          },
          {
            key: "G",
            value: "Changing customer demand/preferences",
          },
        ]
      : [
          {
            key: "A",
            value: "Новые участники моей отрасли из смежных отраслей",
          },
          {
            key: "B",
            value:
              "Прорывные технологии (например, передовые технологии, искусственный интеллект, метавселенная, блокчейн)",
          },
          {
            key: "C",
            value: "Нарушение цепочки поставок",
          },
          {
            key: "D",
            value: "Нехватка рабочей силы/навыков",
          },
          {
            key: "E",
            value: "Изменения в регулировании",
          },
          {
            key: "F",
            value: "Переход на новые источники энергии",
          },
          {
            key: "G",
            value: "Изменение спроса/предпочтений клиентов",
          },
        ];

  const columns =
    lng === "English"
      ? [
          {
            key: "1",
            value: "Not at all",
          },
          {
            key: "2",
            value: "To a limited extent",
          },
          {
            key: "3",
            value: "To a moderate extent",
          },
          {
            key: "4",
            value: "To a large extent",
          },
          {
            key: "5",
            value: "To a very large extent",
          },
          {
            key: "6",
            value: "Don't know",
          },
        ]
      : [
          {
            key: "1",
            value: "Не окажет влияния",
          },
          {
            key: "2",
            value: "Ограниченное влияние",
          },
          {
            key: "3",
            value: "Умеренное влияние",
          },
          {
            key: "4",
            value: "Большое влияние",
          },
          {
            key: "5",
            value: "Значительное влияние",
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
    F: "",
    G: "",
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

    F1: false,
    F2: false,
    F3: false,
    F4: false,
    F5: false,
    F6: false,

    G1: false,
    G2: false,
    G3: false,
    G4: false,
    G5: false,
    G6: false,
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

  const [industry, setIndustry] = useState(localStorage.getItem('q13-industry') ? localStorage.getItem('q13-industry') : '');
  const [isOther, setIsOther] = useState(false);

  const selectIndustry = (e) => {
    setIndustry(e.value);

    if (
      e.value === "Other (please specify)" ||
      e.value === "Другое (укажите)"
    ) {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  };

  const setOtherIndustry = (e) => {
    setIndustry(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("q13-checked", JSON.stringify(checked));
    localStorage.setItem("q13", JSON.stringify(input));
    localStorage.setItem("q13-industry", industry);
  }, [input, checked, industry]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      Object.entries(input).filter((x) => x[1] === "" || industry === "")
        .length > 0
    ) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q13: JSON.parse(localStorage.getItem("q13")),
        q13industry: localStorage.getItem("q13-industry"),
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

      navigate("/eng-q14");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 14).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 14).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        {lng === "English" ? (
          <>
            <p className="question">
              To what extent do you believe the following will impact (i.e.,
              either increase or decrease) profitability in the industry over
              the next ten years?
            </p>
            <div
              style={{
                width: width <= 768 ? "100%" : "40%",
                marginBottom: "1rem",
              }}
            >
              <Dropdown
                options={options}
                onChange={selectIndustry}
                value={defaultOption}
                placeholder="industries"
                style={{ width: "100%", textAlign: "left" }}
              />
              {isOther && (
                <Form>
                  <Form.Group>
                    <Form.Control
                      style={{ marginTop: "1rem" }}
                      placeholder="Other (please specify)"
                      value={
                        industry === "Other (please specify)" ? "" : industry
                      }
                      onChange={setOtherIndustry}
                    />
                  </Form.Group>
                </Form>
              )}
            </div>
            <p className="question-i">
              <i>PLEASE SELECT ONE RESPONSE FOR EACH STATEMENT</i>
            </p>
          </>
        ) : (
          <>
            <p className="left-align-text question">
              В какой степени, по Вашему мнению, представленное ниже повлияет на
              (т. е. увеличит или уменьшит) прибыльность отрасли в следующие
              десять лет?
            </p>
            <div
              style={{
                width: width <= 768 ? "100%" : "50%",
                marginBottom: "1rem",
              }}
            >
              <Dropdown
                options={options}
                onChange={selectIndustry}
                value={defaultOption}
                placeholder="отрасли"
              />
              {isOther && (
                <Form>
                  <Form.Group>
                    <Form.Control
                      style={{ marginTop: "1rem" }}
                      placeholder="Другое (укажите)"
                      value={industry === "Другое (укажите)" ? "" : industry}
                      onChange={setOtherIndustry}
                    />
                  </Form.Group>
                </Form>
              )}
            </div>
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

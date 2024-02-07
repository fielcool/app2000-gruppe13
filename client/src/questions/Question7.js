import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question7() {
  const lng = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Русский";
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q7-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q7-checked")));
    }
    if (localStorage.getItem("q7")) {
      setInput(JSON.parse(localStorage.getItem("q7")));
    }
  }, []);

  const rows = [
    {
      key: "A",
      value:
        lng === "English"
          ? "Physical assets (e.g., risks to factories, office buildings and other assets due to extreme weather or other climate events)"
          : "Физические активы (например, риски для заводов, офисных зданий и других активов из-за экстремальных погодных условий или других климатических явлений)",
    },
    {
      key: "B",
      value:
        lng === "English"
          ? "Cost profile (e.g., costs to comply with new regulation, asset depreciation and insurance liabilities)"
          : "Профиль затрат (например, затраты на соблюдение новых правил, амортизация активов и страховые обязательства)",
    },
    {
      key: "C",
      value:
        lng === "English"
          ? "Supply chain (e.g., production capabilities, ability to source raw materials)"
          : "Цепочка поставок (например, производственные возможности, возможность получения сырья)",
    },
  ];
  const columns = [
    {
      key: "1",
      value: lng === "English" ? "Not at all" : "Не окажут влияния",
    },
    {
      key: "2",
      value: lng === "English" ? "To a limited extent" : "Ограниченное влияние",
    },
    {
      key: "3",
      value: lng === "English" ? "To a moderate extent" : "Умеренное влияние",
    },
    {
      key: "4",
      value: lng === "English" ? "To a large extent" : "Большое влияние",
    },
    {
      key: "5",
      value:
        lng === "English" ? "To a very large extent" : "Значительное влияние",
    },
    {
      key: "6",
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
    localStorage.setItem("q7", JSON.stringify(input));
    localStorage.setItem("q7-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (input.A && input.B && input.C) {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q7: JSON.parse(localStorage.getItem("q7")),
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

      navigate("/eng-q8");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 8).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 8).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        {lng === "English" ? (
          <>
            <p className="question">
              To what extent do you expect the following areas of your business
              to be impacted by climate risk in the next 12 months?
            </p>
            <p className="question-i">
              <i>PLEASE SELECT ONE RESPONSE FOR EACH STATEMENT</i>
            </p>
          </>
        ) : (
          <>
            <p className="question">
              В какой степени, по Вашему мнению, климатические риски повлияют на
              следующие сферы Вашего бизнеса в ближайшие 12 месяцев?
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

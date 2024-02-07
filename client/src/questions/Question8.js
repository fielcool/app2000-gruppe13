import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question8() {
  const lng = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Русский";
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q8-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q8-checked")));
    }
    if (localStorage.getItem("q8")) {
      setInput(JSON.parse(localStorage.getItem("q8")));
    }
  }, []);

  const rows = [
    {
      key: "A",
      value:
        lng === "English"
          ? "Develop a data-driven, enterprise-level strategy for reducing emissions and mitigating climate risks"
          : "Разработать основанную на данных стратегию на уровне предприятия по сокращению выбросов и смягчению климатических рисков",
    },
    {
      key: "B",
      value:
        lng === "English"
          ? "Implement initiatives to reduce my company’s emissions"
          : "Реализовать инициативы по сокращению выбросов моей компании",
    },
    {
      key: "C",
      value:
        lng === "English"
          ? "Implement initiatives to protect my company’s physical assets and/or workforce from the physical impacts of climate risk"
          : "Реализовать инициативы по защите физических активов и/или рабочей силы моей компании от физического воздействия климатических рисков",
    },
    {
      key: "D",
      value:
        lng === "English"
          ? "Innovate new, climate-friendly products or processes"
          : "Внедрять новые, безопасные для климата продукты или процессы",
    },
    {
      key: "E",
      value:
        lng === "English"
          ? "Apply an internal price on carbon in decision making"
          : "Применять внутреннюю цену на углерод при принятии решений",
    },
  ];
  const columns = [
    {
      key: "1",
      value:
        lng === "English"
          ? "We don’t plan to do this"
          : "Мы не планируем этого делать",
    },
    {
      key: "2",
      value:
        lng === "English"
          ? "Planned, but not started"
          : "Запланировано, но не начато",
    },
    {
      key: "3",
      value: lng === "English" ? "In progress" : "В процессе",
    },
    {
      key: "4",
      value:
        lng === "English"
          ? "Completed but not yet generating measurable results"
          : "Завершено, но измеримых результатов еще нет",
    },
    {
      key: "5",
      value:
        lng === "English"
          ? "Completed AND generating measurable results"
          : "Завершено И получены измеримые результаты",
    },
    {
      key: "6",
      value:
        lng === "English"
          ? "Completed AND generating measurable results AND my company reports the results publicly"
          : "Завершено И получены измеримые результаты И моя компания публично сообщает о результатах",
    },
    {
      key: "7",
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
  });
  const [checked, setChecked] = useState({
    A1: false,
    A2: false,
    A3: false,
    A4: false,
    A5: false,
    A6: false,
    A7: false,

    B1: false,
    B2: false,
    B3: false,
    B4: false,
    B5: false,
    B6: false,
    B7: false,

    C1: false,
    C2: false,
    C3: false,
    C4: false,
    C5: false,
    C6: false,
    C7: false,

    D1: false,
    D2: false,
    D3: false,
    D4: false,
    D5: false,
    D6: false,
    D7: false,

    E1: false,
    E2: false,
    E3: false,
    E4: false,
    E5: false,
    E6: false,
    E7: false,
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
    localStorage.setItem("q8", JSON.stringify(input));
    localStorage.setItem("q8-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();

    if (input.A && input.B && input.C && input.D && input.E) {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q8: JSON.parse(localStorage.getItem("q8")),
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

      navigate("/eng-q9");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 9).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 9).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        {lng === "English" ? (
          <>
            <p className="question">
              Below is a list of actions companies may undertake to prepare for
              the risk of climate change. Which statement best characterises
              your company’s level of progress on these actions?
            </p>
            <p className="question-i">
              <i>PLEASE SELECT ONE RESPONSE FOR EACH STATEMENT</i>
            </p>
          </>
        ) : (
          <>
            <p className="question">
              Ниже приведен перечень мер, которые компании могут предпринять,
              чтобы подготовиться к риску изменения климата. Какое утверждение
              лучше всего характеризует уровень прогресса Вашей компании в этом
              направлении?
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

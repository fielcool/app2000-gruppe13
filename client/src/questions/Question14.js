import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question14() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const rows = [
    {
      key: "1",
      value:
        lng === "English"
          ? "Automating processes and systems"
          : "Автоматизация процессов и систем",
    },
    {
      key: "2",
      value:
        lng === "English"
          ? "Deploying technology (cloud, AI and other advanced tech)"
          : "Развертывание технологий (облачные системы, ИИ и другие передовые технологии)",
    },
    {
      key: "3",
      value:
        lng === "English"
          ? "Exploring the metaverse"
          : "Изучение метавселенной",
    },
    {
      key: "4",
      value:
        lng === "English"
          ? "Adopting alternative energy sources"
          : "Использование альтернативных источников энергии",
    },
    {
      key: "5",
      value:
        lng === "English"
          ? "Relocating the company's operations in response to climate risk"
          : "Релокация операционной деятельности компании в связи с климатическими рисками",
    },
    {
      key: "6",
      value:
        lng === "English"
          ? "Decarbonising the company’s business model"
          : "Декарбонизация бизнес-модели компании",
    },
    {
      key: "7",
      value:
        lng === "English"
          ? "Adjusting the company's supply chain (including nearshoring/onshoring operations)"
          : "Корректировка цепочки поставок компании (включая ниаршоринг/оншоринг)",
    },
    {
      key: "8",
      value:
        lng === "English"
          ? "Upskilling the company’s workforce in priority areas"
          : "Повышение квалификации персонала компании по приоритетным направлениям",
    },
    {
      key: "9",
      value:
        lng === "English"
          ? "None of the above"
          : "Ни один из вышеперечисленных вариантов",
    },
    {
      key: "10",
      value: lng === "English" ? "Don't know" : "Затрудняюсь ответить",
    },
  ];

  const width = window.screen.width;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [checked, setChecked] = useState({
    E1: false,
    E2: false,
    E3: false,
    E4: false,
    E5: false,
    E6: false,
    E7: false,
    E8: false,
    E9: false,
    E10: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q14-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q14-checked")));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const index = name + value;

    if (value === "9") {
      setChecked({
        E1: false,
        E2: false,
        E3: false,
        E4: false,
        E5: false,
        E6: false,
        E7: false,
        E8: false,
        E9: true,
        E10: false,
      });
    } else if (value === "10") {
      setChecked({
        E1: false,
        E2: false,
        E3: false,
        E4: false,
        E5: false,
        E6: false,
        E7: false,
        E8: false,
        E9: false,
        E10: true,
      });
    } else {
      setChecked((prev) => {
        return {
          ...prev,
          [index]: !checked[index],
          E9: false,
          E10: false,
        };
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("q14-checked", JSON.stringify(checked));
  }, [checked]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(JSON.parse(localStorage.getItem("q14-checked"))).filter(
        (v) => v === true
      ).length === 0
    ) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q14: JSON.parse(localStorage.getItem("q14-checked")),
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

      if (
        JSON.parse(localStorage.getItem("q14-checked")).E9 ||
        JSON.parse(localStorage.getItem("q14-checked")).E10
      ) {
        navigate("/eng-q16");
      } else {
        navigate("/eng-q15");
      }
    }
  };

  return (

      <div className="main">
        <div className="sticky-sub-div">
          <h2 className="percent">
            {Math.round(((100 / 29) * 15).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 15).toString() + "%",
              }}
            ></div>
          </div>
          <ModalAlert show={show} close={handleClose} />
          <div className="left-align-text">
            {lng === "English" ? (
              <span className="question">
                Which of the following investments, if any, is your company
                making in the next 12 months?
                <i>
                  <p className="question-i">PLEASE SELECT ALL THAT APPLY</p>
                </i>
              </span>
            ) : (
              <span className="question">
                Какие из следующих инвестиций, если таковые имеются, Ваша
                компания планирует в ближайшие 12 месяцев?
                <i>
                  <p className="question-i" style={{ marginTop: "1rem" }}>
                    УКАЖИТЕ ВСЕ ПОДХОДЯЩИЕ ВАРИАНТЫ
                  </p>
                </i>
              </span>
            )}
          </div>
        </div>

        {width <= 768 ? (
          <>
            <div className="left-align-text">
              {rows.map((row) => {
                return (
                  <div key={row.key} className="m-div">
                    <label className="m-label">
                      <input
                        type="checkbox"
                        name="E"
                        value={row.key}
                        onChange={handleChange}
                        checked={checked[`E${row.key}`]}
                      ></input>
                      {row.value}
                    </label>
                  </div>
                );
              })}
            </div>
            <Buttons lng={lng} click={handleSubmit} />
          </>
        ) : (
          <>
            {rows.map((row) => {
              return (
                <div style={{ textAlign: "left" }} key={row.key}>
                  <label className="label-cell">
                    <input
                      type="checkbox"
                      name="E"
                      value={row.key}
                      onChange={handleChange}
                      checked={checked[`E${row.key}`]}
                    ></input>
                    {"   " + row.value}
                  </label>
                </div>
              );
            })}
            <Buttons lng={lng} click={handleSubmit} />
          </>
        )}
      </div>
    
  );
}

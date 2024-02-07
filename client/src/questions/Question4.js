import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question4() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const rows = [
    {
      key: "1",
      value:
        lng === "English"
          ? "Relocating physical assets"
          : "Релокация физических активов",
    },
    {
      key: "2",
      value:
        lng === "English"
          ? "Adjusting supply chains"
          : "Корректировка цепочек поставок",
    },
    {
      key: "3",
      value:
        lng === "English"
          ? "Relocating our workforce"
          : "Релокация нашей рабочей силы",
    },
    {
      key: "4",
      value:
        lng === "English"
          ? "Increasing investments in cybersecurity or data privacy"
          : "Увеличение инвестиций в кибербезопасность или конфиденциальность данных",
    },
    {
      key: "5",
      value:
        lng === "English"
          ? "Diversifying our product/service offering"
          : "Диверсификация наших продуктов/услуг",
    },
    {
      key: "6",
      value:
        lng === "English"
          ? "Adjusting our presence in current markets and/or expanding into new markets"
          : "Корректировка нашего присутствия на имеющихся рынках и/или выход на новые рынки",
    },
    {
      key: "7",
      value:
        lng === "English"
          ? "None of the above"
          : "Ни один из вышеперечисленных вариантов",
    },
    {
      key: "8",
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
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q4-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q4-checked")));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const index = name + value;

    if (value === "7") {
      setChecked({
        E1: false,
        E2: false,
        E3: false,
        E4: false,
        E5: false,
        E6: false,
        E7: true,
        E8: false,
      });
    } else if (value === "8") {
      setChecked({
        E1: false,
        E2: false,
        E3: false,
        E4: false,
        E5: false,
        E6: false,
        E7: false,
        E8: true,
      });
    } else {
      setChecked((prev) => {
        return {
          ...prev,
          [index]: !checked[index],
          E7: false,
          E8: false,
        };
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("q4-checked", JSON.stringify(checked));
  }, [checked]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(JSON.parse(localStorage.getItem("q4-checked"))).filter(
        (v) => v === true
      ).length === 0
    ) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q4: JSON.parse(localStorage.getItem("q4-checked")),
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

      navigate("/eng-q5");
    }
  };

  return (

      <div className="main">
        <div className="sticky-sub-div">
          <h2 className="percent">
            {Math.round(((100 / 29) * 5).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 5).toString() + "%",
              }}
            ></div>
          </div>
          <ModalAlert show={show} close={handleClose} />
          <div className="left-align-text">
            {lng === "English" ? (
              <span className="question">
                Which of the following actions, if any, is your company
                considering to mitigate against exposure to geopolitical
                conflict in the next 12 months?
                <i>
                  <p className="question-i">PLEASE SELECT ALL THAT APPLY</p>
                </i>
              </span>
            ) : (
              <span className="question">
                Какие из следующих действий, если таковые имеются, рассматривает
                Ваша компания для смягчения воздействия геополитического
                конфликта в следующие 12 месяцев?
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

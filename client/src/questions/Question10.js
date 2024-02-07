import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question10() {
  const lng = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Русский";
  const rows = [
    {
      key: "1",
      value:
        lng === "English" ? "Economic recovery" : "Восстановление экономики",
    },
    {
      key: "2",
      value:
        lng === "English"
          ? "Infrastructure development"
          : "Развитие инфраструктуры",
    },
    {
      key: "3",
      value:
        lng === "English"
          ? "Diversity, equity and inclusion"
          : "Разнообразие, равенство и инклюзивность",
    },
    {
      key: "4",
      value: lng === "English" ? "Public safety" : "Общественная безопасность",
    },
    {
      key: "5",
      value: lng === "English" ? "Education" : "Образование",
    },
    {
      key: "6",
      value:
        lng === "English"
          ? "International development"
          : "Международное развитие",
    },
    {
      key: "7",
      value:
        lng === "English" ? "Sustainable development" : "Устойчивое развитие",
    },
    {
      key: "8",
      value: lng === "English" ? "Climate change" : "Климатические изменения",
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
  const navigate = useNavigate();
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

    if (localStorage.getItem("q10-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q10-checked")));
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
    localStorage.setItem("q10-checked", JSON.stringify(checked));
  }, [checked]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(JSON.parse(localStorage.getItem("q10-checked"))).filter(
        (v) => v === true
      ).length === 0
    ) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q10: JSON.parse(localStorage.getItem("q10-checked")),
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

      navigate("/eng-q11");
    }
  };

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 11).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 11).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        <div className="left-align-text">
          {lng === "English" ? (
            <span className="question">
              In which of the following areas is your company collaborating with
              non-business entities (governments, NGOs or academic institutions)
              to address societal issues?
              <i>
                <p className="question-i">PLEASE SELECT ALL THAT APPLY</p>
              </i>
            </span>
          ) : (
            <span className="question">
              В какой из следующих областей Ваша компания сотрудничает с
              некоммерческими организациями (правительствами, НПО или
              академическими учреждениями) для решения социальных проблем?
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

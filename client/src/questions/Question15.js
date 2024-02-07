import { useNavigate } from "react-router-dom";
import "../App.css";
import "../Medium.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question15() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q15-dontknow")) {
      setDontKnow(JSON.parse(localStorage.getItem("q15-dontknow")));
    }
    if (localStorage.getItem("q15")) {
      setNum(JSON.parse(localStorage.getItem("q15")));
    }
  }, []);
  const rows = [
    {
      key: "E1",
      value:
        lng === "English"
          ? "Automating processes and systems"
          : "Автоматизация процессов и систем",
    },
    {
      key: "E2",
      value:
        lng === "English"
          ? "Deploying technology (cloud, AI and other advanced tech)"
          : "Развертывание технологий (облачные системы, ИИ и другие передовые технологии)",
    },
    {
      key: "E3",
      value:
        lng === "English"
          ? "Exploring the metaverse"
          : "Изучение метавселенной",
    },
    {
      key: "E4",
      value:
        lng === "English"
          ? "Adopting alternative energy sources"
          : "Использование альтернативных источников энергии",
    },
    {
      key: "E5",
      value:
        lng === "English"
          ? "Relocating the company's operations in response to climate risk"
          : "Релокация операционной деятельности компании в связи с климатическими рисками",
    },
    {
      key: "E6",
      value:
        lng === "English"
          ? "Decarbonising the company’s business model"
          : "Декарбонизация бизнес-модели компании",
    },
    {
      key: "E7",
      value:
        lng === "English"
          ? "Adjusting the company's supply chain (including nearshoring/onshoring operations)"
          : "Корректировка цепочки поставок компании (включая ниаршоринг/оншоринг)",
    },
    {
      key: "E8",
      value:
        lng === "English"
          ? "Upskilling the company’s workforce in priority areas"
          : "Повышение квалификации персонала компании по приоритетным направлениям",
    },
  ];

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const [num, setNum] = useState({
    E1: 0,
    E2: 0,
    E3: 0,
    E4: 0,
    E5: 0,
    E6: 0,
    E7: 0,
    E8: 0,
  });
  const [dontKnow, setDontKnow] = useState({
    E1: false,
    E2: false,
    E3: false,
    E4: false,
    E5: false,
    E6: false,
    E7: false,
    E8: false,
  });

  const handleRange = (e) => {
    const { name, value } = e.target;

    setDontKnow((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
    setNum((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    setDontKnow((prev) => {
      return {
        ...prev,
        [e.target.name]: true,
      };
    });
    setNum((prev) => {
      return {
        ...prev,
        [e.target.name]: 0,
      };
    });
  };

  useEffect(() => {
    localStorage.setItem("q15", JSON.stringify(num));
    localStorage.setItem("q15-dontknow", JSON.stringify(dontKnow));
  }, [num, dontKnow]);

  function handleSubmit(e) {
    e.preventDefault();
    var checklist = [];

    if (
      checklist.filter((c) => (num[c] === 0 || num[c] === "0") && !dontKnow[c])
        .length > 0
    ) {
      handleShow();
    } else {
      navigate("/eng-q16");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q15: JSON.parse(localStorage.getItem("q15")),
        q15dontknow: JSON.parse(localStorage.getItem("q15-dontknow")),
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
            {Math.round(((100 / 29) * 16).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 16).toString() + "%",
              }}
            ></div>
          </div>

          <ModalAlert show={show} close={handleClose} />
          {lng === "English" ? (
            <>
              <p className="question">
                For each of the investment areas selected, please indicate on
                the sliding scale the percentage of investment allocated to
                preserving current business versus reinventing the business for
                the future: <br /> The left side of the scale indicates the
                investment is mainly to preserve current business, while the
                right side indicates the investment is mainly to reinvent the
                business for the future.
              </p>
              <p className="question-i">
                <i>
                  PLEASE MOVE THE CURSOR ALONG THE SLIDING SCALE TO THE
                  PERCENTAGE THAT BEST DESCRIBES THE BALANCE FOR YOUR COMPANY
                </i>
              </p>
            </>
          ) : (
            <>
              <p className="question">
                Для каждой из выбранных областей инвестиций укажите по
                скользящей шкале процентную долю инвестиций, направляемых на
                сохранение текущего бизнеса по сравнению с переосмыслением
                бизнеса в будущем:
                <br /> Левая часть шкалы указывает на то, что инвестиции в
                основном направлены на сохранение текущего бизнеса, а правая
                часть указывает на то, что инвестиции в основном направлены на
                переосмысление бизнеса для будущего.
              </p>
              <p className="question-i">
                <i>
                  ПЕРЕМЕСТИТЕ КУРСОР ПО СКОЛЬЗЯЩЕЙ ШКАЛЕ НА ПРОЦЕНТНУЮ ДОЛЮ,
                  КОТОРАЯ НАИЛУЧШИМ ОБРАЗОМ ОПИСЫВАЕТ БАЛАНС ДЛЯ ВАШЕЙ КОМПАНИИ
                </i>
              </p>
            </>
          )}
        </div>
        {width <= 768 ? (
          <div className="left-align-text">
            {rows &&
              rows
                .filter((row) =>
                  Object.entries(
                    JSON.parse(localStorage.getItem("q14-checked"))
                  )
                    .filter((x) => x[1] === true)
                    .map((x) => x[0])
                    .includes(row.key)
                )
                .map((row) => {
                  return (
                    <>
                      <p>{row.value}</p>
                      <div>
                        <output name={row.key} id={row.key}>
                          {num[row.key]}%
                        </output>
                        <input
                          style={{ width: "100%" }}
                          type="range"
                          name={row.key}
                          id={row.key}
                          value={num[row.key]}
                          min="0"
                          max="100"
                          onInput={handleRange}
                        />
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <input
                          type="radio"
                          name={row.key}
                          onChange={handleClick}
                          checked={dontKnow[row.key]}
                          id={row.key}
                        />
                        <label for={row.key} style={{marginLeft:"10px"}}>{lng === "English" ? "Don't know" : "Затрудняюсь ответить"}</label>
                      </div>
                      <hr/>
                    </>
                  );
                })}
          </div>
        ) : (
          <>
            <table className="table">
              <tbody>
                <tr>
                  <td></td>
                  <td>
                    &lt;-{" "}
                    {lng === "English"
                      ? "Preserving current business"
                      : "Сохранение текущего бизнеса"}
                  </td>
                  <td>
                    {lng === "English"
                      ? "Reinventing the business for the future"
                      : "Переосмысление бизнеса для будущего"}{" "}
                    -&gt;
                  </td>
                  <td>
                    {lng === "English" ? "Don't know" : "Затрудняюсь ответить"}
                  </td>
                </tr>
                {rows &&
                  rows
                    .filter((row) =>
                      Object.entries(
                        JSON.parse(localStorage.getItem("q14-checked"))
                      )
                        .filter((x) => x[1] === true)
                        .map((x) => x[0])
                        .includes(row.key)
                    )
                    .map((row) => {
                      return (
                        <tr key={row.key}>
                          <td>{row.value}</td>
                          <td colSpan={2}>
                            <div>
                              <output name={row.key} id={row.key}>
                                {num[row.key]}%
                              </output>
                              <input
                                style={{ width: "100%" }}
                                type="range"
                                name={row.key}
                                id={row.key}
                                value={num[row.key]}
                                min="0"
                                max="100"
                                onInput={handleRange}
                              />
                            </div>
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={row.key}
                              onChange={handleClick}
                              checked={dontKnow[row.key]}
                            />
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            {/* <table className="table">
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
            </table> */}
          </>
        )}

        <Buttons lng={lng} click={handleSubmit} />
      </div>
    
  );
}

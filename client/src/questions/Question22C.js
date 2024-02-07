import { useNavigate } from "react-router-dom";
import { Button, Table, Form, Col, Row } from "react-bootstrap";
import React from "react";
import "../App.css";
import "../Medium.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";

export default function Question22C() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q22c-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q22c-checked")));
    }
    if (localStorage.getItem("q22c")) {
      setInput(JSON.parse(localStorage.getItem("q22c")));
    }
    if (localStorage.getItem("q22c-other")) {
      setOther(localStorage.getItem("q22c-other"));
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
            index: 1,
            key: "A",
            value: "A skilled, educated and adaptable workforce",
          },
          {
            index: 2,
            key: "B",
            value: "Adequate physical and digital infrastructure",
          },
          {
            index: 3,
            key: "C",
            value: "Reducing climate change and environmental damage",
          },
          {
            index: 4,
            key: "D",
            value: "High levels of employment",
          },
          {
            index: 5,
            key: "E",
            value: "An effective tax system",
          },
          {
            index: 6,
            key: "F",
            value: "Greater income equality",
          },
          {
            index: 7,
            key: "G",
            value: "The good health and well-being of the workforce",
          },
          {
            index: 8,
            key: "H",
            value: "A diverse and inclusive workforce",
          },
          {
            index: 9,
            key: "I",
            value: "Safeguards around usage of personal data",
          },
          {
            index: 10,
            key: "J",
            value: "Predictable macroeconomic environment",
          },
          {
            index: 11,
            key: "K",
            value: "Investment attractiveness of the country",
          },
          {
            index: 12,
            key: "L",
            value: "Fighting against corruption and bribery",
          },
          {
            index: 13,
            key: "M",
            value: "The supremacy of law in all spheres of state activity",
          },
          {
            index: 14,
            key: "N",
            value: "Access to affordable capital",
          },
        ]
      : [
          {
            index: 1,
            key: "A",
            value: "Квалифицированный и адаптивный персона",
          },
          {
            index: 2,
            key: "B",
            value: "Развитая инфраструктура  (включая цифровую инфраструктуру)",
          },
          {
            index: 3,
            key: "C",
            value:
              "Снижение рисков изменения климата и ущерба окружающей среде",
          },
          {
            index: 4,
            key: "D",
            value: "Высокий уровень занятости",
          },
          {
            index: 5,
            key: "E",
            value: "Эффективная налоговая система",
          },
          {
            index: 6,
            key: "F",
            value: "Большее равенство доходов населения",
          },
          {
            index: 7,
            key: "G",
            value: "Здоровье и благополучие сотрудников",
          },
          {
            index: 8,
            key: "H",
            value: "Диверсифицированный и инклюзивный персонал",
          },
          {
            index: 9,
            key: "I",
            value: "Меры предосторожности при использовании личных данных",
          },
          {
            index: 10,
            key: "J",
            value: "Предсказуемая макроэкономическая среда",
          },
          {
            index: 11,
            key: "K",
            value: "Инвестиционная привлекательность страны",
          },
          {
            index: 12,
            key: "L",
            value: "Борьба с коррупцией и взяточничеством",
          },
          {
            index: 13,
            key: "M",
            value: "Верховенство права во всех сферах деятельности государства",
          },
          {
            index: 14,
            key: "N",
            value: "Доступ к недорогому капиталу",
          },
        ];

  const [input, setInput] = useState([]);
  const [other, setOther] = useState("");
  const [none, setNone] = useState(false);
  const [dontknow, setDontknow] = useState(false);
  const [checked, setChecked] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
  });

  const handleClick = (e) => {
    const { name } = e.target;
    setChecked((prev) => {
      return {
        ...prev,
        [name]: !checked[name],
      };
    });
    setNone(false);
  };

  const handleChange = (e) => {
    setOther(e.target.value);
    setNone(false);
  };

  const handleNone = () => {
    setNone(!none);

    if (none === false) {
      setDontknow(false);
      setOther("");
    }
  };

  useEffect(() => {
    if (dontknow === true || none === true) {
      Object.keys(checked).forEach((el) => {
        checked[el] = false;
      });
    }

    Object.entries(checked)
      .filter((x) => x[1] === true)
      .forEach((x) => {
        if (!input.includes(x[0])) {
          input.push(x[0]);
        }
      });

    Object.entries(checked)
      .filter((x) => x[1] === false)
      .forEach((x) => {
        if (input.includes(x[0])) {
          setInput(input.filter((el) => el !== x[0]));
        }
      });

    Object.entries(checked)
      .filter((x) => x[1] === true)
      .forEach((x) => {
        Object.keys(checked)
          .filter((a) => a === x[0])
          .forEach((a) => {
            checked[a] = true;
          });
      });
    Object.entries(checked)
      .filter((x) => x[1] === false)
      .forEach((x) => {
        Object.keys(checked)
          .filter((a) => a === x[0])
          .forEach((a) => {
            checked[a] = false;
          });
      });

    localStorage.setItem("q22c-none", none);
    localStorage.setItem("q22c", JSON.stringify(input));
    localStorage.setItem("q22c-other", other);
    localStorage.setItem("q22c-checked", JSON.stringify(checked));
  }, [none, dontknow, input, checked, other]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.length === 0 && none === false && !other) {
      handleShow();
    } else {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q22c: JSON.parse(localStorage.getItem("q22c")),
        q22cNone: localStorage.getItem("q22c-none"),
        q22cDontknow: localStorage.getItem("q22c-dontknow"),
        q22cOther: localStorage.getItem("q22c-other"),
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
      navigate("/eng-q23");
    }
  };

  return (
    
        <div className="main">
          <div className="sticky-sub-div">
            <h2 className="percent">
              {Math.round(((100 / 29) * 25).toString())}%{" "}
              {lng === "English" ? "completed" : "завершено"}
            </h2>
            <div className="progressBarEmpty">
              <div
                className="progressBarFilled"
                style={{
                  width: ((100 / 29) * 25).toString() + "%",
                }}
              ></div>
            </div>
            <ModalAlert show={show} close={handleClose} />
            {lng === "English" ? (
              <>
                <p className="question">
                  In order to achieve goals (if any) which of stated below, your
                  company is interested in cooperation with government agencies
                  in the next three years?
                </p>
                <p className="question-i">
                  <i>SELECT ALL THAT APPLY</i>
                </p>
              </>
            ) : (
              <>
                <p className="question">
                  В достижении каких из указанных целей (при наличии таковых)
                  ваша компания заинтересована в сотрудничестве с
                  государственными органами в ближайшие три года?
                </p>
                <p className="question-i">
                  <i>ОТМЕТЬТЕ ВСЕ ПОДХОДЯЩИЕ ОТВЕТЫ</i>
                </p>
              </>
            )}
          </div>
          {width <= 768 ? (
            <div className="left-align-text">
              {rows.map((row) => {
                return (
                  <div className="m-div" key={row.key}>
                    <label className="m-label">
                      <input
                        className="m-input"
                        type="checkbox"
                        name={row.key}
                        value={row.value}
                        onChange={handleClick}
                        checked={checked[row.key]}
                        // disabled={
                        //   none === true || dontknow === true ? true : false
                        // }
                      ></input>
                      {row.value}
                    </label>
                  </div>
                );
              })}
              <Form.Control
                type="text"
                placeholder={
                  lng === "English"
                    ? "Other (please specify)"
                    : "Прочее (пожалуйста уточните)"
                }
                className="text-input"
                onChange={handleChange}
                value={other}
                // disabled={none || dontknow ? true : false}
              ></Form.Control>
              <div>
                <Button
                  type="button"
                  variant={none ? "warning" : "outline-dark"}
                  className="none-btn"
                  value="None of the above"
                  onClick={handleNone}
                >
                  {lng === "English"
                    ? "NONE OF THE ABOVE"
                    : "Ничего из вышеперечисленного"}
                </Button>
              </div>
            </div>
          ) : (
            <Form>
              <Row>
                <Col>
                  <Table>
                    <tbody>
                      {rows
                        .filter((row) => row.index < 8)
                        .map((row) => {
                          return (
                            <tr key={row.key}>
                              <td>{row.key}</td>
                              <td className="left-align-text">{row.value}</td>
                              <td>
                                <label
                                  className="alt-label-cell"
                                  style={{
                                    width: "150px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={row.key}
                                    value={row.value}
                                    onChange={handleClick}
                                    checked={checked[row.key]}
                                    // disabled={
                                    //   none === true || dontknow === true
                                    //     ? true
                                    //     : false
                                    // }
                                  ></input>
                                </label>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <Table>
                    <tbody>
                      {rows
                        .filter((row) => row.index >= 8)
                        .map((row) => {
                          return (
                            <tr key={row.key}>
                              <td>{row.key}</td>
                              <td
                                className="left-align-text"
                                onClick={handleClick}
                              >
                                {row.value}
                              </td>
                              <td>
                                <label
                                  className="alt-label-cell"
                                  style={{
                                    width: "150px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={row.key}
                                    value={row.value}
                                    onChange={handleClick}
                                    checked={checked[row.key]}
                                    // disabled={
                                    //   none === true || dontknow === true
                                    //     ? true
                                    //     : false
                                    // }
                                  ></input>
                                </label>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Form.Control
                type="text"
                placeholder={
                  lng === "English"
                    ? "Other (please specify)"
                    : "Прочее (пожалуйста уточните)"
                }
                style={{ width: "33.5%", marginTop: "1rem" }}
                onChange={handleChange}
                value={other}
                // disabled={none || dontknow ? true : false}
              ></Form.Control>
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  width: "33.5%",
                  marginTop: "1rem",
                }}
              >
                <Button
                  type="button"
                  variant={none ? "warning" : "outline-dark"}
                  className="none-btn"
                  value="None of the above"
                  onClick={handleNone}
                >
                  {lng === "English"
                    ? "NONE OF THE ABOVE"
                    : "Ничего из вышеперечисленного"}
                </Button>
              </div>
            </Form>
          )}
          <Buttons lng={lng} click={handleSubmit} />
        </div>
      
    
  );
}

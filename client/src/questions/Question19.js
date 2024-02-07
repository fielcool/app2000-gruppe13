import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";
import "../App.css";
import "../Medium.css";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question19() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q19")) {
      setInput(JSON.parse(localStorage.getItem("q19")));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const [input, setInput] = useState({
    revenue: "",
    profit: "",
    return: "",
  });

  const [dontknow, setDontknow] = useState({
    revenue: false,
    profit: false,
    return: false,
  });

  const [error, setError] = useState({
    revenue: false,
    profit: false,
    return: false,
  });

  function validate(number) {
    const re = /[0-9]/;
    return re.test(number);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setDontknow((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
  };

  const handleDontknow = (e) => {
    const { name } = e.target;
    setDontknow((prev) => {
      return {
        ...prev,
        [name]: !dontknow[name],
      };
    });
  };

  useEffect(() => {
    if (dontknow.revenue === true) {
      setInput((prev) => {
        return {
          ...prev,
          revenue: "",
        };
      });
    }
    if (dontknow.profit === true) {
      setInput((prev) => {
        return {
          ...prev,
          profit: "",
        };
      });
    }
    if (dontknow.return === true) {
      setInput((prev) => {
        return {
          ...prev,
          return: "",
        };
      });
    }
  }, [dontknow]);

  const handleBlur = (e) => {
    const { name } = e.target;

    if (validate(input[name])) {
      setError((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setError((prev) => {
      return {
        ...prev,
        [name]: false,
      };
    });
  };

  useEffect(() => {
    localStorage.setItem("q19", JSON.stringify(input));
    localStorage.setItem("q19-dontknow", JSON.stringify(dontknow));
  }, [input, dontknow, error]);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      (input.revenue === "" && dontknow.revenue === false) ||
      (input.profit === "" && dontknow.profit === false) ||
      (input.return === "" && dontknow.return === false)
    ) {
      handleShow();
    } else {
      navigate("/eng-q20");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q19: JSON.parse(localStorage.getItem("q19")),
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
            {Math.round(((100 / 29) * 20).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 20).toString() + "%",
              }}
            ></div>
          </div>
          <ModalAlert show={show} close={handleClose} />
          {lng === "English" ? (
            <>
              <p className="question">
                What was your company’s revenue growth, profit margin and{" "}
                {localStorage.getItem("q13-industry") === "Financial Services"
                  ? "return on equity (ROE)"
                  : "return on assets (ROA)"}{" "}
                for the last fiscal year?
              </p>
              <p className="question-i">
                <i>
                  PLEASE PROVIDE YOUR ANSWER TO THE NEAREST PERCENTAGE POINT IN
                  THE BOX BELOW
                </i>
              </p>
            </>
          ) : (
            <>
              <p className="question">
                Каким был рост выручки Вашей компании, размер прибыли и{" "}
                {localStorage.getItem("q13-industry") === "Финансовый сектор"
                  ? "рентабельность собственного капитала (ROE)"
                  : "рентабельность активов (ROA)"}{" "}
                за последний финансовый год?
              </p>
              <p className="question-i">
                <i>
                  ПРЕДСТАВЬТЕ СВОЙ ОТВЕТ С БЛИЖАЙШИМ ПРОЦЕНТНЫМ ПОКАЗАТЕЛЕМ В
                  НИЖЕ ПРЕДСТАВЛЕННОЙ ЯЧЕЙКЕ
                </i>
              </p>
            </>
          )}
        </div>
        {width <= 768 ? (
          <div>
            <Row>
              <Col sm={6}>
                <strong>
                  <p
                    className="left-align-text"
                    style={{ marginBottom: width <= 480 ? "1rem" : "" }}
                  >
                    {lng === "English"
                      ? "Revenue growth - last fiscal year"
                      : "Рост выручки - последний финансовый год"}
                  </p>
                </strong>
              </Col>
            </Row>
            {error.revenue === true && dontknow.revenue === false ? (
              <p
                style={{
                  color: "#dc3545",
                  fontStyle: "italic",
                  fontSize: "12px",
                  textAlign: "left",
                  width: "100%",
                  margin: 0,
                  padding: 0,
                }}
              >
                {lng === "English"
                  ? "*Please specify whole number"
                  : "*Пожалуйста, укажите целое число"}
              </p>
            ) : (
              ""
            )}
            <Row>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  // placeholder={
                  //   lng === "English"
                  //     ? "Specify whole number"
                  //     : "Укажите целое число"
                  // }
                  name="revenue"
                  value={input.revenue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="m-input-22"
                  autoComplete="off"
                />
              </Col>
              <Col>
                <Button
                  name="revenue"
                  value="Don't know"
                  onClick={handleDontknow}
                  variant={
                    dontknow.revenue === true ? "warning" : "outline-dark"
                  }
                  className="dontknow-22"
                >
                  {lng === "English" ? "Don't know" : "Затрудняюсь ответить"}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <strong>
                  <p className="left-align-text">
                    {lng === "English"
                      ? "Profit growth - last fiscal year"
                      : "Размер прибыли - последний финансовый год"}
                  </p>
                </strong>
              </Col>
            </Row>
            {error.profit === true && dontknow.profit === false ? (
              <p
                style={{
                  color: "#dc3545",
                  fontStyle: "italic",
                  fontSize: "12px",
                  textAlign: "left",
                  width: "100%",
                  margin: 0,
                  padding: 0,
                }}
              >
                {lng === "English"
                  ? "*Please specify whole number"
                  : "*Пожалуйста, укажите целое число"}
              </p>
            ) : (
              ""
            )}
            <Row>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  // placeholder={
                  //   lng === "English"
                  //     ? "Specify whole number"
                  //     : "Укажите целое число"
                  // }
                  name="profit"
                  value={input.profit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="m-input-22"
                  autoComplete="off"
                />
              </Col>
              <Col>
                <Button
                  name="profit"
                  value="Don't know"
                  onClick={handleDontknow}
                  variant={
                    dontknow.profit === true ? "warning" : "outline-dark"
                  }
                  className="dontknow-22"
                >
                  {lng === "English" ? "Don't know" : "Затрудняюсь ответить"}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <strong>
                  <p className="left-align-text">
                    {lng === "English" &&
                    localStorage.getItem("q13-industry") ===
                      "Financial Services"
                      ? "Return on equity (ROE)"
                      : lng === "English" &&
                        localStorage.getItem("q13-industry") !==
                          "Financial Services"
                      ? "Return on assets (ROA) - last fiscal year"
                      : lng === "Русский" &&
                        localStorage.getItem("q13-industry") ===
                          "Финансовый сектор"
                      ? "Рентабельность собственного капитала (ROE) — последний финансовый год"
                      : lng === "Русский" &&
                        localStorage.getItem("q13-industry") !==
                          "Финансовый сектор"
                      ? "Рентабельность активов (ROA) — последний финансовый год"
                      : ""}
                  </p>
                </strong>
              </Col>
            </Row>
            {error.return === true && dontknow.return === false ? (
              <p
                style={{
                  color: "#dc3545",
                  fontStyle: "italic",
                  fontSize: "12px",
                  textAlign: "left",
                  width: "100%",
                  margin: 0,
                  padding: 0,
                }}
              >
                {lng === "English"
                  ? "*Please specify whole number"
                  : "*Пожалуйста, укажите целое число"}
              </p>
            ) : (
              ""
            )}
            <Row>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  // placeholder={
                  //   lng === "English"
                  //     ? "Specify whole number"
                  //     : "Укажите целое число"
                  // }
                  name="return"
                  value={input.return}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="m-input-22"
                  autoComplete="off"
                />
              </Col>
              <Col>
                <Button
                  name="return"
                  value="Don't know"
                  onClick={handleDontknow}
                  variant={
                    dontknow.return === true ? "warning" : "outline-dark"
                  }
                  className="dontknow-22"
                >
                  {lng === "English" ? "Don't know" : "Затрудняюсь ответить"}
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <Form>
            <Table style={{ width: "70%" }} borderless>
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }}>
                    {lng === "English"
                      ? "Revenue growth - last fiscal year"
                      : "Рост выручки - последний финансовый год"}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Col>
                        {error.revenue === true &&
                        dontknow.revenue === false ? (
                          <p
                            style={{
                              color: "#dc3545",
                              fontStyle: "italic",
                              fontSize: "12px",
                              textAlign: "left",
                              width: "100%",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {lng === "English"
                              ? "*Please specify whole number"
                              : "*Пожалуйста, укажите целое число"}
                          </p>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          // placeholder={
                          //   lng === "English"
                          //     ? "Specify whole number"
                          //     : "Укажите целое число"
                          // }
                          name="revenue"
                          value={dontknow.revenue === true ? "" : input.revenue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                        />
                      </Col>
                      <Form.Label
                        column
                        sm={2}
                        style={{ textAlign: "left", paddingLeft: 0 }}
                      >
                        %
                      </Form.Label>
                    </Form.Group>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <Button
                      variant={
                        dontknow.revenue === true ? "warning" : "outline-dark"
                      }
                      name="revenue"
                      value="Don't know"
                      onClick={handleDontknow}
                    >
                      {lng === "English"
                        ? "Don't know"
                        : "Затрудняюсь ответить"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>
                    {lng === "English"
                      ? "Profit margin - last fiscal year"
                      : "Размер прибыли - последний финансовый год"}
                  </td>
                  <td>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Col>
                        {error.profit === true && dontknow.profit === false ? (
                          <p
                            style={{
                              color: "#dc3545",
                              fontStyle: "italic",
                              fontSize: "12px",
                              textAlign: "left",
                              width: "100%",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {lng === "English"
                              ? "*Please specify whole number"
                              : "*Пожалуйста, укажите целое число"}
                          </p>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          // placeholder={
                          //   lng === "English"
                          //     ? "Specify whole number"
                          //     : "Укажите целое число"
                          // }
                          name="profit"
                          value={dontknow.profit === true ? "" : input.profit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                        />
                      </Col>
                      <Form.Label
                        column
                        sm={2}
                        style={{ textAlign: "left", paddingLeft: 0 }}
                      >
                        %
                      </Form.Label>
                    </Form.Group>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <Button
                      variant={
                        dontknow.profit === true ? "warning" : "outline-dark"
                      }
                      name="profit"
                      value="Don't know"
                      onClick={handleDontknow}
                    >
                      {lng === "English"
                        ? "Don't know"
                        : "Затрудняюсь ответить"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>
                    {lng === "English" &&
                    localStorage.getItem("q13-industry") ===
                      "Financial Services"
                      ? "Return on equity (ROE)"
                      : lng === "English" &&
                        localStorage.getItem("q13-industry") !==
                          "Financial Services"
                      ? "Return on assets (ROA) - last fiscal year"
                      : lng === "Русский" &&
                        localStorage.getItem("q13-industry") ===
                          "Финансовый сектор"
                      ? "Рентабельность собственного капитала (ROE) — последний финансовый год"
                      : lng === "Русский" &&
                        localStorage.getItem("q13-industry") !==
                          "Финансовый сектор"
                      ? "Рентабельность активов (ROA) — последний финансовый год"
                      : ""}
                  </td>
                  <td>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Col>
                        {error.return === true && dontknow.return === false ? (
                          <p
                            style={{
                              color: "#dc3545",
                              fontStyle: "italic",
                              fontSize: "12px",
                              textAlign: "left",
                              width: "100%",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {lng === "English"
                              ? "*Please specify whole number"
                              : "*Пожалуйста, укажите целое число"}
                          </p>
                        ) : (
                          ""
                        )}
                        <Form.Control
                          type="text"
                          // placeholder={
                          //   lng === "English"
                          //     ? "Specify whole number"
                          //     : "Укажите целое число"
                          // }
                          name="return"
                          value={dontknow.return === true ? "" : input.return}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                        />
                      </Col>
                      <Form.Label
                        column
                        sm={2}
                        style={{ textAlign: "left", paddingLeft: 0 }}
                      >
                        %
                      </Form.Label>
                    </Form.Group>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    <Button
                      name="return"
                      value="Don't know"
                      onClick={handleDontknow}
                      variant={
                        dontknow.return === true ? "warning" : "outline-dark"
                      }
                    >
                      {lng === "English"
                        ? "Don't know"
                        : "Затрудняюсь ответить"}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        )}
        <Buttons lng={lng} click={handleSubmit} />
      </div>
    
  );
}

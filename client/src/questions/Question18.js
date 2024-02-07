import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "../ModalAlert";
import Buttons from "../Buttons";
import React from "react";

export default function Question18() {
  const lng = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Русский";
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q18")) {
      setNum(JSON.parse(localStorage.getItem("q18")));
    }
  }, []);
  const rows =
    lng === "English"
      ? [
          {
            key: "A",
            value:
              "Driving current operating performance (including board engagement on current performance)",
          },
          {
            key: "B",
            value:
              "Evolving the business and its strategy to meet future demands (including board engagement on long-term direction)",
          },
          {
            key: "C",
            value: "Engaging with or mentoring/developing employee",
          },
          {
            key: "D",
            value:
              "Engaging with investors, government officials and other external leaders",
          },
          {
            key: "E",
            value: "Engaging with customers",
          },
          {
            key: "F",
            value: "Other",
          },
        ]
      : [
          {
            key: "A",
            value:
              "Управление текущими операционными показателями (включая взаимодействие с советом директоров по текущим показателям)",
          },
          {
            key: "B",
            value:
              "Развитие бизнеса и стратегии компании для удовлетворения будущих потребностей (включая взаимодействие с советом директоров в долгосрочной перспективе)",
          },
          {
            key: "C",
            value:
              "Взаимодействие с или наставничество для/развитие сотрудников",
          },
          {
            key: "D",
            value:
              "Взаимодействие с инвесторами, государственными чиновниками и другими внешними лидерами",
          },
          {
            key: "E",
            value: "Работа с клиентами",
          },
          {
            key: "F",
            value: "Прочее",
          },
        ];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const checked = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  const [num, setNum] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  });

  const [total, setTotal] = useState(0);
  const [totalErr, setTotalErr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNum((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    var list = [];
    Object.entries(num).forEach((e) => {
      list.push(parseInt(e[1]));
      setTotal(list.reduce((a, b) => a + b, 0));
    });
    localStorage.setItem("q18", JSON.stringify(num));
  }, [num]);

  useEffect(() => {
    if (total > 100) {
      setTotalErr(true);
    } else {
      setTotalErr(false);
    }
  }, [total]);

  function handleSubmit(e) {
    e.preventDefault();

    if (total < 100) {
      handleShow();
    } else {
      navigate("/eng-q19");

      const data = {
        uuid: localStorage.getItem("uuid"),
        q18: JSON.parse(localStorage.getItem("q18")),
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
          {Math.round(((100 / 29) * 19).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 19).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        {lng === "English" ? (
          <>
            <p className="question">
              Knowing what you know now, if you could start over with a blank
              calendar, how would you allocate your time as CEO?
            </p>
            <p className="question-i">
              <i>PLEASE ADD % TO THE NEAREST WHOLE NUMBER AND TOTALLING 100%</i>
            </p>
          </>
        ) : (
          <>
            <p className="left-align-text question">
              Зная то, что Вы знаете сейчас, если бы Вы могли начать все сначала
              с пустым календарем, как бы Вы распределили свое время в качестве
              первого руководителя?
            </p>
            <p className="question-i">
              <i>ДОБАВЬТЕ % К БЛИЖАЙШЕМУ ЦЕЛОМУ ЧИСЛУ И ВСЕГО 100%</i>
            </p>
          </>
        )}
      </div>
      {width <= 768 ? (
        <div className="left-align-text">
          <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {lng === "English" ? "Total" : "Всего"}: {total}%
          </p>
          <p
            style={{
              fontSize: "10px",
              color: "red",
              margin: 0,
              padding: 0,
            }}
          >
            {totalErr && total > 100
              ? "Сумма не должна превышать 100%"
              : totalErr && total < 100
              ? "Сумма не должна быть меньше 100%"
              : ""}
          </p>
          {rows.map((row) => {
            return (
              <div className="m-div" key={row.key}>
                <p> {row.value}</p>
                <input
                  type="number"
                  min="0"
                  name={row.key}
                  value={num[row.key]}
                  onChange={handleChange}
                  className="m-input"
                  checked={checked[row.key] === true ? true : false}
                />
                %
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "left" }}>
          <table className="table">
            <tbody>
              <tr>
                <td></td>
                <td colSpan={2}>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      color: total <= 100 ? "black" : "red",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    Всего: {total}%
                  </p>

                  <p
                    style={{
                      fontSize: "10px",
                      color: "red",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {totalErr && total > 100
                      ? "Сумма не должна превышать 100%"
                      : totalErr && total < 100
                      ? "Сумма не должна быть меньше 100%"
                      : ""}
                  </p>
                </td>
              </tr>
              {rows.map((row) => {
                return (
                  <tr key={row.key}>
                    <td>
                      {row.key}. {row.value}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        name={row.key}
                        value={num[row.key] === 0 ? "" : num[row.key]}
                        onChange={handleChange}
                        // disabled={total < 100 ? false : true}
                        style={{
                          border: "solid 1px gray",
                          borderRadius: "5px",
                          marginRight: "5px",
                        }}
                      />
                    </td>
                    <td>%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Buttons lng={lng} click={handleSubmit} />
    </div>
  );
}

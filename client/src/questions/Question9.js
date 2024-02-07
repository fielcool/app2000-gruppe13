import { useNavigate } from "react-router-dom";
import "../App.css";
import ModalAlert from "../ModalAlert";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Buttons from "../Buttons";

export default function Question9() {
  const lng = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "Русский";
  const width = window.screen.width;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const rows = [
    {
      key: "A",
      value:
        lng === "English" ? "Industry consortia" : "Отраслевые консорциумы",
    },
    {
      key: "B",
      value:
        lng === "English"
          ? "NGOs (Non-governmental organisations)"
          : "НПО (неправительственные организации)",
    },
    {
      key: "C",
      value:
        lng === "English"
          ? "Established companies/competitors"
          : "Устоявшиеся компании/конкуренты",
    },
    {
      key: "D",
      value:
        lng === "English"
          ? "Governments (at national or local level)"
          : "Правительства (на национальном или местном уровне)",
    },
    {
      key: "E",
      value:
        lng === "English"
          ? "Academic institutions"
          : "Академические учреждения",
    },
    {
      key: "F",
      value:
        lng === "English"
          ? "Entrepreneurs or start-ups"
          : "Предприниматели или стартапы",
    },
  ];

  const columns = [
    {
      key: "1",
      value: lng === "English" ? "Not at all" : "Не сотрудничает",
    },
    {
      key: "2",
      value:
        lng === "English" ? "To a limited extent" : "В ограниченной степени",
    },
    {
      key: "3",
      value: lng === "English" ? "To a moderate extent" : "В умеренной степени",
    },
    {
      key: "4",
      value: lng === "English" ? "To a large extent" : "В немалой степени",
    },
    {
      key: "5",
      value:
        lng === "English" ? "To a very large extent" : "В значительной степени",
    },
    {
      key: "6",
      value: lng === "English" ? "Don't know" : "Затрудняюсь ответить",
    },
  ];

  const [concerns, setConcerns] = useState([]);

  const [input, setInput] = useState({
    A1: "",
    B1: "",
    C1: "",
    D1: "",
    E1: "",
    F1: "",
  });
  const [inputNew, setInputNew] = useState({
    A2: "",
    B2: "",
    C2: "",
    D2: "",
    E2: "",
    F2: "",
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
  });

  const [checkedNew, setCheckedNew] = useState({
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
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q9-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q9-checked")));
    }
    if (localStorage.getItem("q9")) {
      setInput(JSON.parse(localStorage.getItem("q9")));
    }
    if (localStorage.getItem("q9-concerns")) {
      setConcerns(JSON.parse(localStorage.getItem("q9-concerns")));
    }
    if (localStorage.getItem("q9-checked-new")) {
      setCheckedNew(JSON.parse(localStorage.getItem("q9-checked-new")));
    }
    if (localStorage.getItem("q9-new")) {
      setInputNew(JSON.parse(localStorage.getItem("q9-new")));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const index = name.slice(0, 1) + value;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    Object.keys(checked)
      .filter((el) => el.slice(0, 1) === name.slice(0, 1) && el === index)
      .forEach((y) => {
        setChecked((prev) => {
          return {
            ...prev,
            [y]: true,
          };
        });
      });
    Object.keys(checked)
      .filter((z) => z.slice(0, 1) === name.slice(0, 1) && z !== index)
      .forEach((a) => {
        checked[a] = false;
      });
  }

  function handleChangeNew(e) {
    const { name, value } = e.target;
    const index = name.slice(0, 1) + value;
    setInputNew((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    Object.keys(checkedNew)
      .filter((el) => el.slice(0, 1) === name.slice(0, 1) && el === index)
      .forEach((y) => {
        setCheckedNew((prev) => {
          return {
            ...prev,
            [y]: true,
          };
        });
      });
    Object.keys(checkedNew)
      .filter((z) => z.slice(0, 1) === name.slice(0, 1) && z !== index)
      .forEach((a) => {
        checkedNew[a] = false;
      });
  }

  useEffect(() => {
    Object.entries(input)
      .filter((x) => x[0] && x[1])
      .forEach((e) => {
        var index = e[0] + e[1];

        Object.keys(checked)
          .filter((el) => el.slice(0, 1) === e[0] && el === index)
          .map((y) => {
            return (checked[y] = true);
          });
        Object.keys(checked)
          .filter((z) => z.slice(0, 1) === e[0] && z !== index)
          .map((a) => {
            return (checked[a] = false);
          });
      });

    Object.entries(input)
      .filter(
        (x) =>
          x[0].slice(0, 1) === "E" &&
          (x[1] === "2" || x[1] === "3" || x[1] === "4" || x[1] === "5")
      )
      .forEach((x) => {
        if (!concerns.includes(x[0])) {
          concerns.push(x[0]);
        }
      });
    Object.entries(input)
      .filter((x) => x[1] === "1" || x[1] === "6")
      .forEach((x) => {
        if (concerns.includes(x[0])) {
          setConcerns(concerns.filter((y) => y !== x[0]));
        }
      });
  }, [input, checked, concerns]);

  useEffect(() => {
    //NEW
    Object.entries(inputNew)
      .filter((x) => x[0] && x[1])
      .forEach((e) => {
        var index = e[0] + e[1];

        Object.keys(checkedNew)
          .filter((el) => el.slice(0, 1) === e[0] && el === index)
          .map((y) => {
            return (checkedNew[y] = true);
          });
        Object.keys(checkedNew)
          .filter((z) => z.slice(0, 1) === e[0] && z !== index)
          .map((a) => {
            return (checkedNew[a] = false);
          });
      });
  }, [inputNew, checkedNew]);

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("q9-checked", JSON.stringify(checked));
    localStorage.setItem("q9-concerns", JSON.stringify(concerns));
    localStorage.setItem("q9", JSON.stringify(input));
    localStorage.setItem("q9-checked-new", JSON.stringify(checkedNew));
    localStorage.setItem("q9-new", JSON.stringify(inputNew));

    if (
      input.A1 &&
      input.B1 &&
      input.C1 &&
      input.D1 &&
      input.E1 &&
      input.F1 &&
      inputNew.A2 &&
      inputNew.B2 &&
      inputNew.C2 &&
      inputNew.D2 &&
      inputNew.E2 &&
      inputNew.F2
    ) {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q9: JSON.parse(localStorage.getItem("q9")),
        q9new: JSON.parse(localStorage.getItem("q9-new")),
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
        inputNew.B2 === "2" ||
        inputNew.B2 === "3" ||
        inputNew.B2 === "4" ||
        inputNew.B2 === "5" ||
        inputNew.D2 === "2" ||
        inputNew.D2 === "3" ||
        inputNew.D2 === "4" ||
        inputNew.D2 === "5" ||
        inputNew.E2 === "2" ||
        inputNew.E2 === "3" ||
        inputNew.E2 === "4" ||
        inputNew.E2 === "5"
      ) {
        navigate("/eng-q10");
      } else {
        navigate("/eng-q11");
      }
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 10).toString())}%{" "}
          {lng === "English" ? "completed" : "завершено"}
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 10).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        {lng === "English" ? (
          <div className="left-align-text">
            <p>
              To what extent is your company collaborating with the following
              groups to:
            </p>
            <p>
              a) create new sources of value (e.g., innovate new products/in new
              markets)?
              <br />
              b) address societal issues (e.g., climate change; socioeconomic
              inequality; diversity, equity and inclusion)?
            </p>
            <i>
              <p className="question-i">
                PLEASE SELECT ONE RESPONSE PER EACH STATEMENT
              </p>
            </i>
          </div>
        ) : (
          <div className="left-align-text">
            <p>
              В какой степени Ваша компания сотрудничает со следующими группами
              над:
            </p>
            <p>
              a) созданием новых ценностных источников (например, внедрение
              инноваций в новые продукты/на новых рынках)?
              <br />
              b) решением социальных проблем (например, изменение климата,
              социально-экономическое неравенство, разнообразие, равенство и
              инклюзивность)?
            </p>
            <i>
              <p className="question-i">
                ДЛЯ КАЖДОЙ СТРОКИ УКАЖИТЕ ТОЛЬКО ОДИН ВАРИАНТ ОТВЕТА ПО КАЖДОМУ
                ВИДЕ ПРЕДСТАВЛЕННЫХ УГРОЗ
              </p>
            </i>
          </div>
        )}
      </div>
      {width <= 768 ? (
        <div>
          {rows.map((row) => {
            return (
              <div className="left-align-text" key={row.key}>
                <>
                  <p className="question" style={{ color: "#db536a" }}>
                    <strong>{row.value} - a)</strong>
                  </p>
                  <p className="question-sub">{row.text}</p>
                  {columns.map((col) => {
                    return (
                      <div className="m-div" key={col.key}>
                        <label className="m-label">
                          <input
                            type="radio"
                            name={`${row.key}1`}
                            className="m-input"
                            value={col.key}
                            onChange={handleChange}
                            checked={checked[`${row.key}${col.key}`]}
                          ></input>
                          {col.value}
                        </label>
                      </div>
                    );
                  })}
                </>
                <>
                  <p className="question" style={{ color: "#db536a" }}>
                    <strong>{row.value} - b)</strong>
                  </p>
                  <p className="question-sub">{row.text}</p>
                  {columns.map((col) => {
                    return (
                      <div className="m-div" key={col.key}>
                        <label className="m-label">
                          <input
                            type="radio"
                            name={`${row.key}2`}
                            className="m-input"
                            value={col.key}
                            onChange={handleChangeNew}
                            checked={checkedNew[`${row.key}${col.key}`]}
                          ></input>
                          {col.value}
                        </label>
                      </div>
                    );
                  })}
                </>
              </div>
            );
          })}
        </div>
      ) : (
        <form>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <td colSpan="3"></td>

                  {columns.map((col) => {
                    return (
                      <td key={col.key}>
                        <strong>{col.value}</strong>
                      </td>
                    );
                  })}
                </tr>
              </thead>

              {rows.map((row) => {
                return (
                  <tbody key={row.key}>
                    <tr className="table-row">
                      <td rowSpan={2}>{row.key}</td>
                      <td rowSpan={2} className="left-align-text">
                        <p style={{ margin: 0, padding: 0 }}>
                          <strong>{row.value}</strong>
                        </p>
                        <p style={{ margin: 0, padding: 0 }}>{row.text}</p>
                      </td>
                      <td>a)</td>
                      {columns.map((col) => {
                        return (
                          <td
                            key={col.key}
                            className="input-cell"
                            style={{ width: "120px" }}
                          >
                            <label className="label-cell">
                              <input
                                type="radio"
                                name={`${row.key}1`}
                                value={col.key}
                                onChange={handleChange}
                                checked={checked[`${row.key}${col.key}`]}
                              ></input>
                            </label>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td>b)</td>
                      {columns.map((col) => {
                        return (
                          <td
                            key={col.key}
                            className="input-cell"
                            style={{ width: "100px" }}
                          >
                            <label className="label-cell">
                              <input
                                type="radio"
                                name={`${row.key}2`}
                                value={col.key}
                                onChange={handleChangeNew}
                                checked={checkedNew[`${row.key}${col.key}`]}
                              ></input>
                            </label>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </form>
      )}
      <Buttons lng={lng} click={handleSubmit} />
    </div>
  );
}

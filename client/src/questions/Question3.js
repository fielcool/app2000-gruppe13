import { useNavigate } from "react-router-dom";
import "../App.css";
import ModalAlert from "../ModalAlert";
import { useState, useEffect } from "react";
import axios from "axios";
import Buttons from "../Buttons";
import React from "react";

export default function Question3() {
  const lng = localStorage.getItem("language") ? localStorage.getItem("language") : "Русский"
  const width = window.screen.width;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  const rows = [
    {
      key: "A",
      value:
        lng === "English"
          ? "Macroeconomic volatility"
          : "Макроэкономическая волатильность",
      text:
        lng === "English"
          ? "(including in GDP and economic cycle, unemployment)"
          : "(в том числе в отношении ВВП и экономического цикла, безработицы)",
    },
    {
      key: "B",
      value: lng === "English" ? "Inflation" : "Инфляция",
      text:
        lng === "English"
          ? "(increase in prices and decrease in the purchasing value of money)"
          : "(рост цен и снижение покупательной способности денег)",
    },
    {
      key: "C",
      value: lng === "English" ? "Climate change" : "Изменение климата",
      text:
        lng === "English"
          ? "(including physical risks and transition risks such as policy and legal, markets, technology and reputation risks)"
          : "(включая физические риски и переходные риски, такие как политические и юридические, рыночные, технологические и репутационные риски)",
    },
    {
      key: "D",
      value: lng === "English" ? "Social inequality" : "Социальное неравенство",
      text:
        lng === "English"
          ? "(including those stemming from income, gender, race and ethnicity)"
          : "(включая связанное с полом, расой и этнической принадлежностью, финансовым положением)",
    },
    {
      key: "E",
      value:
        lng === "English"
          ? "Geopolitical conflict"
          : "Геополитические конфликты",
      text:
        lng === "English"
          ? "(including resource and trade disputes, terrorism, interstate violence)"
          : "(включая ресурсные и торговые споры, терроризм, межгосударственные силовые действия)",
    },
    {
      key: "F",
      value: lng === "English" ? "Cyber risks" : "Кибер-риски",
      text:
        lng === "English"
          ? "(including hacking, surveillance, disinformation)"
          : "(включая взлом, слежку, дезинформацию)",
    },
    {
      key: "G",
      value: lng === "English" ? "Health risks" : "Риски для здоровья",
      text:
        lng === "English"
          ? "(including pandemics, chronic illness, strains on mental health)"
          : "(включая COVID-19 и другие пандемии, хронические заболевания, перенапряжение психики)",
    },
  ];

  const columns = [
    {
      key: "1",
      value:
        lng === "English"
          ? "Minimally exposed. No significant financial loss expected"
          : "Минимальный уровень подверженности. Не ожидается существенных финансовых потерь",
    },
    {
      key: "2",
      value:
        lng === "English"
          ? "Slightly exposed. Low probability of significant financial loss"
          : "Низкий уровень подверженности. Низкая вероятность существенных финансовых потерь",
    },
    {
      key: "3",
      value:
        lng === "English"
          ? "Moderately exposed. Moderate probability of significant financial loss"
          : "Умеренный уровень подверженности. Умеренная вероятность существенных финансовых потерь",
    },
    {
      key: "4",
      value:
        lng === "English"
          ? "Highly exposed. High probability of significant financial loss"
          : "Высокий уровень подверженности. Высокая вероятность существенных финансовых потерь",
    },
    {
      key: "5",
      value:
        lng === "English"
          ? "Extremely exposed. Certain significant financial loss"
          : "Значительный уровень подверженности. Определенные существенные финансовые потери",
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
    G1: "",
  });
  const [inputNew, setInputNew] = useState({
    A2: "",
    B2: "",
    C2: "",
    D2: "",
    E2: "",
    F2: "",
    G2: "",
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

    G1: false,
    G2: false,
    G3: false,
    G4: false,
    G5: false,
    G6: false,
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

    G1: false,
    G2: false,
    G3: false,
    G4: false,
    G5: false,
    G6: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q3-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q3-checked")));
    }
    if (localStorage.getItem("q3")) {
      setInput(JSON.parse(localStorage.getItem("q3")));
    }
    if (localStorage.getItem("q3-concerns")) {
      setConcerns(JSON.parse(localStorage.getItem("q3-concerns")));
    }
    if (localStorage.getItem("q3-checked-new")) {
      setCheckedNew(JSON.parse(localStorage.getItem("q3-checked-new")));
    }
    if (localStorage.getItem("q3-new")) {
      setInputNew(JSON.parse(localStorage.getItem("q3-new")));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const index = name.slice(0, 1) + value;
    console.log(name)
    console.log(index)

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
    localStorage.setItem("q3-checked", JSON.stringify(checked));
    localStorage.setItem("q3-concerns", JSON.stringify(concerns));
    localStorage.setItem("q3", JSON.stringify(input));
    localStorage.setItem("q3-checked-new", JSON.stringify(checkedNew));
    localStorage.setItem("q3-new", JSON.stringify(inputNew));

    if (
      input.A1 &&
      input.B1 &&
      input.C1 &&
      input.D1 &&
      input.E1 &&
      input.F1 &&
      input.G1 &&
      inputNew.A2 &&
      inputNew.B2 &&
      inputNew.C2 &&
      inputNew.D2 &&
      inputNew.E2 &&
      inputNew.F2 &&
      inputNew.G2
    ) {
      const data = {
        uuid: localStorage.getItem("uuid"),
        q3: JSON.parse(localStorage.getItem("q3")),
        q3new: JSON.parse(localStorage.getItem("q3-new")),
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

      if (concerns.length > 0) {
        navigate("/eng-q4");
      } else {
        navigate("/eng-q5");
      }
    } else {
      handleShow();
    }
  }

  return (

      <div className="main">
        <div className="sticky-sub-div">
          <h2 className="percent">
            {Math.round(((100 / 29) * 4).toString())}%{" "}
            {lng === "English" ? "completed" : "завершено"}
          </h2>
          <div className="progressBarEmpty">
            <div
              className="progressBarFilled"
              style={{
                width: ((100 / 29) * 4).toString() + "%",
              }}
            ></div>
          </div>
          <ModalAlert show={show} close={handleClose} />
          {lng === "English" ? (
            <div className="left-align-text">
              <p>
                How exposed do you believe your company will be to the following
                key threats in:
              </p>
              <ul>
                <li>the next 12 months?</li>
                <li>the next five years?</li>
              </ul>
              <i>
                <p className="question-i">
                  PLEASE SELECT ONE RESPONSE PER EACH STATEMENT
                </p>
              </i>
            </div>
          ) : (
            <div className="left-align-text">
              <p>
                Насколько по Вашему мнению, Ваша компания будет{" "}
                <span style={{ textDecoration: "underline" }}>подвержена</span>{" "}
                следующим ключевым угрозам:
              </p>
              <ul>
                <li>в следующие 12 месяцев?</li>
                <li>в следующие 5 лет?</li>
              </ul>
              <i>
                <p className="question-i">
                  ДЛЯ КАЖДОЙ СТРОКИ УКАЖИТЕ ТОЛЬКО ОДИН ВАРИАНТ ОТВЕТА ПО
                  КАЖДОМУ ВИДЕ ПРЕДСТАВЛЕННЫХ УГРОЗ
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
                  <div>
                    <p className="question" style={{ color: "#db536a" }}>
                      <strong>{row.value} - 12 месяцев</strong>
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
                  </div>
                  <div>
                    <p className="question" style={{ color: "#db536a" }}>
                      <strong>{row.value} - 5 лет</strong>
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
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <form>
            <div>
              <table className="table" style={{ position: "relative" }}>
                <thead>
                  <tr>
                    <th style={{ position: "sticky" }} colSpan="3"></th>

                    {columns.map((col) => {
                      return (
                        <th style={{ position: "sticky" }} key={col.key}>
                          {col.value}
                        </th>
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
                        <td>
                          {lng === "English" ? "12 months" : "12 месяцев"}
                        </td>
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
                        <td>{lng === "English" ? "5 years" : "5 лет"}</td>
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

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function EngIntro() {
  const lng = localStorage.getItem('language') ? localStorage.getItem('language') : 'Русский'
  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      uuid: localStorage.getItem("uuid"),
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
    navigate("/eng-start");
  };

  return (
    <div className="main">
      {lng === "English" ? (
        <>
          <h1 className="intro-heading">26th Annual Global CEO Survey</h1>
          <p className="intro-text">
            For the past 25 years, PwC's Annual Global CEO Survey has opened a
            unique window on the thinking of chief executives around the world.
            In this, our 26th annual survey, we hope to deepen our understanding
            of the pressures facing CEOs as they navigate rapid change and a
            growing diversity of stakeholder priorities. It is our hope that the
            survey results—historically released in Davos on the eve of the
            Annual Meeting of the World Economic Forum—will yield useful,
            enduring insights for leaders about their mission-critical
            opportunities and challenges, and the strategic, organisational and
            personal responses required to meet them. Thank you in advance for
            your participation.
            <br />
            <br /> Kazakhstan’s findings of the report will be released in
            cooperation with Forbes Kazakhstan in April 2023. <br />
            <br />
            This research is conducted in accordance with the Market Research
            Society Code of Conduct, which is designed to safeguard participant
            confidentiality and anonymity. If you complete the survey, your
            responses will be combined with others at the aggregate, industry,
            region and country/territory level to reveal a consensus of opinion
            on these issues. Your data will be processed in accordance with the
            privacy statement linked at the bottom of your screen and may also
            be shared with other PwC member firms for analysis and combined with
            other research conducted by PwC or publicly available information in
            order to obtain further insight. All responses will be kept
            completely confidential, and individual responses will never be
            attributed without your prior consent.
          </p>
        </>
      ) : (
        <>
          <h1 className="intro-heading">
            26-ой Ежегодный опрос руководителей крупнейших компаний мира
          </h1>
          <p className="intro-text">
            На протяжении последних 25 лет Ежегодный опрос руководителей
            крупнейших компаний мира, проводимый PwC, открыл уникальное окно в
            мировоззрение руководителей компаний во всем мире. В нашем 26-м
            ежегодном опросе мы надеемся расширить понимание того давления, с
            которым сталкиваются руководители, поскольку им необходимо
            справляться с быстрыми изменениями и растущим разнообразием
            приоритетов заинтересованных сторон. Мы надеемся, что результаты
            опроса, исторически презентуемые в Давосе накануне Ежегодного
            заседания Всемирного экономического форума, дадут руководителям
            полезную и актуальную информацию о критически важных для их миссии
            возможностях и вызовах, а также о необходимых стратегических,
            организационных и личных ответных реакциях. Заранее благодарим Вас
            за участие. <br />
            <br />
            Результаты казахстанской версии исследования будут представлены
            совместно с Forbes Kazakhstan в апреле 2023 года.
            <br />
            <br />
            Данное исследование проводится в соответствии с Кодексом поведения
            Ассоциации Рыночных Исследований, обеспечивающего конфиденциальность
            и анонимность участников. Если Вы пройдете опрос, Ваши ответы будут
            внесены с остальными в базу на агрегированном, промышленном,
            региональном или территориальном уровнях для достижения консенсуса
            по данным вопросам. Ваши данные также могут быть объединены с
            другими исследованиями, проведенными PwC, или общедоступной
            информацией для дальнейшего изучения. Все ответы будут храниться в
            условиях строжайшей конфиденциальности, и они никогда не будут
            обнародованы без вашего предварительного согласия.
          </p>
        </>
      )}

      <Button
        style={{ border: "none" }}
        className="next-btn start-btn"
        onClick={handleSubmit}
      >
        {lng === "English" ? "Start" : "Начать"}
      </Button>
    </div>
  );
}

import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Buttons({ click }) {
  const lng = localStorage.getItem('language') ? localStorage.getItem('language') : 'Русский'
  const navigate = useNavigate()

  return (
    <div className="back-next-btns">
      <Button
        variant="secondary"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-chevron-left back-arrow"></i>
        {lng === "English" ? "Back" : "Назад"}
      </Button>

      <Button variant="danger" className="next-btn" onClick={click}>
        {lng === "English" ? "Next" : "Далее"}
        <i className="fas fa-chevron-right next-arrow"></i>
      </Button>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
 import axios from "axios";

function EngStart() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    passord: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(input).some((value) => value === "")) {
      // Show modal alert or handle the empty fields case as needed
      return;
    }

    // Uncomment the following block if you want to submit the data to the server using axios
   
    const data = {
      ...input,
    };

    axios
      .post("/api/submit", data)  // Update the API endpoint accordingly
      .then((response) => {
        if (response.status === 200) {
          console.log("Data posted");
        } else {
          console.log("Response status " + response.status);
        }
      })
      .catch((err) => console.log(err.response.data));
    

    // Uncomment the following line if you want to navigate to "/eng-q1" after form submission
     navigate("/UserSucc");
  };

  return (
    <div className="main">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="credentials-form m-credentials-form">
          {Object.keys(input).map((fieldName) => (
            <Form.Control
              key={fieldName}
              autoComplete="off"
              type="text"
              placeholder={`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}*`}
              name={fieldName}
              value={input[fieldName]}
              onChange={handleChange}
              className="credentials-input m-credentials-input"
            />
          ))}
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EngStart;

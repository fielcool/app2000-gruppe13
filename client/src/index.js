import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import EngStart from "./EngStart";
import EngIntro from "./EngIntro";
import EngFinish from "./EngFinish";
import Question1 from "./questions/Question1";
import Question2 from "./questions/Question2";
import Question3 from "./questions/Question3";
import Question4 from "./questions/Question4";
import Question5 from "./questions/Question5";
import Question6 from "./questions/Question6";
import Question7 from "./questions/Question7";
import Question8 from "./questions/Question8";
import Question9 from "./questions/Question9";
import Question10 from "./questions/Question10";
import Question11 from "./questions/Question11";
import Question12 from "./questions/Question12";
import Question13 from "./questions/Question13";
import Question14 from "./questions/Question14";
import Question15 from "./questions/Question15";
import Question16 from "./questions/Question16";
import Question17 from "./questions/Question17";
import Question18 from "./questions/Question18";
import Question19 from "./questions/Question19";
import Question20 from "./questions/Question20";
import Question21 from "./questions/Question21";
import Question22 from "./questions/Question22";
import Question22B from "./questions/Question22B";
import Question22C from "./questions/Question22C";
import Question23 from "./questions/Question23";
import Question23B from "./questions/Question23B";
import Question24 from "./questions/Question24";
import Question25 from "./questions/Question25";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/eng-intro",
    element: <EngIntro />,
  },
  {
    path: "/eng-start",
    element: <EngStart />,
  },
  {
    path: "/eng-q1",
    element: <Question1 />,
  },
  {
    path: "/eng-q2",
    element: <Question2 />,
  },
  {
    path: "/eng-q3",
    element: <Question3 />,
  },
  {
    path: "/eng-q4",
    element: <Question4 />,
  },
  {
    path: "/eng-q5",
    element: <Question5 />,
  },
  {
    path: "/eng-q6",
    element: <Question6 />,
  },
  {
    path: "/eng-q7",
    element: <Question7 />,
  },
  {
    path: "/eng-q8",
    element: <Question8 />,
  },
  {
    path: "/eng-q9",
    element: <Question9 />,
  },
  {
    path: "/eng-q10",
    element: <Question10 />,
  },
  {
    path: "/eng-q11",
    element: <Question11 />,
  },
  {
    path: "/eng-q12",
    element: <Question12 />,
  },
  {
    path: "/eng-q13",
    element: <Question13 />,
  },
  {
    path: "/eng-q14",
    element: <Question14 />,
  },
  {
    path: "/eng-q15",
    element: <Question15 />,
  },
  {
    path: "/eng-q16",
    element: <Question16 />,
  },
  {
    path: "/eng-q17",
    element: <Question17 />,
  },
  {
    path: "/eng-q18",
    element: <Question18 />,
  },
  {
    path: "/eng-q19",
    element: <Question19 />,
  },
  {
    path: "/eng-q20",
    element: <Question20 />,
  },
  {
    path: "/eng-q21",
    element: <Question21 />,
  },
  {
    path: "/eng-q22",
    element: <Question22 />,
  },
  {
    path: "/eng-q22b",
    element: <Question22B />,
  },
  {
    path: "/eng-q22c",
    element: <Question22C />,
  },
  {
    path: "/eng-q23",
    element: <Question23 />,
  },
  {
    path: "/eng-q23b",
    element: <Question23B />,
  },
  {
    path: "/eng-q24",
    element: <Question24 />,
  },
  {
    path: "/eng-q25",
    element: <Question25 />,
  },
  {
    path: "/eng-finish",
    element: <EngFinish />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// ReactDOM.render(
//   <RouterProvider router={router} />,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

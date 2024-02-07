import React, { useEffect } from "react";
import "./App.css";

export default function EngFinish() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
        <div>
              <h1 className="intro-heading">Thank you!</h1>
              <p className="intro-text">
                CLOSE SURVEY: This concludes our survey. Thank you for taking
                the time to answer our questions. Your responses will be
                combined with others at the aggregate, industry, region and
                country/territory level to reveal a consensus of opinion on
                these issues. Your data may also be combined with other research
                conducted by PwC or publicly available information in order to
                obtain further insight. All responses will be kept completely
                confidential, and individual responses will never be attributed
                without your prior consent.
              </p>
        </div>
  );
}

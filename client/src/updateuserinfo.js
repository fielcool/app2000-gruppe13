// UpdateUserInfo.js
// This component serves as a container for the UpdateUserInfoForm.
// It primarily functions as a presentation layer, providing a titled section on the webpage where user information can be updated.
// Author: Philip Stapnes
// ChatGPT assisted in the creation of this document.

import React from "react";
import UpdateUserInfoForm from "./UpdateUserInfoForm";

function UpdateUserInfo() {
  return (
    <div className="update-user-info-page">
      {/* Heading indicating the purpose of the contained form */}
      <h1>Oppdater brukerinformasjon</h1>
      {/* Component that contains the actual form to update user information */}
      <UpdateUserInfoForm />
    </div>
  );
}

export default UpdateUserInfo;

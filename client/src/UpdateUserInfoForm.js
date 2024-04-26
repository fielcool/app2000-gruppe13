// UpdateUserInfoForm.js
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import UserInfoFields from './UserInfoFields'; 
import PasswordConfirmationModal from './PasswordConfirmationModal'; 
import axios from "axios";

function UpdateUserInfoForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [newUserInfo, setNewUserInfo] = React.useState({
    navn: "",
    organisasjon: "",
    stillingstittel: "",
    email: "",
    passord: ""
  });
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { authToken } = useAuth();

  const handleChange = (name, value) => {
    setNewUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  const confirmUpdate = async () => {
    try {
      const response = await axios.put('/api/update-user-info', {
        ...newUserInfo,
        confirmPassword: confirmPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (response.status === 200) {
        console.log("User information updated successfully");
        navigate('/LoginUser');
      } else {
        console.error("Failed to update user information");
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="update-user-info-form">
      <Form>
        <UserInfoFields newUserInfo={newUserInfo} handleChange={handleChange} />
        <Button variant="primary" onClick={handleUpdate}>
          Update User Info
        </Button>
      </Form>

      <PasswordConfirmationModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={confirmUpdate}
        confirmPassword={confirmPassword}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
      />
    </div>
  );
}

export default UpdateUserInfoForm;

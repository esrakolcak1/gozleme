import React from "react";
import { Button } from "react-bootstrap";
import { auth } from "./firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <div className="admin-panel">
      <Button variant="primary" onClick={handleLogout}>
        Çıkış
      </Button>
    </div>
  );
};

export default AdminPanel;

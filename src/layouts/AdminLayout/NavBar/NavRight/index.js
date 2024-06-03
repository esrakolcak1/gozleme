import React, { useState } from "react";
import { Card, ListGroup, Dropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig"; // Firebase yapılandırma dosyanızı içe aktarın

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase çıkış işlemi
      localStorage.removeItem("user"); // Kullanıcı bilgilerini yerel depodan kaldırın
      navigate("/fireabasegiris"); // Çıkış yaptıktan sonra yönlendirilecek sayfa
    } catch (error) {
      console.error("Çıkış işlemi sırasında hata oluştu: ", error);
    }
  };

  return (
    <React.Fragment>
      <ListGroup
        as="ul"
        bsPrefix=" "
        className="navbar-nav ml-auto"
        id="navbar-right"
      >
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start" className="drp-user">
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              id="dropdown-basic"
            >
              <i className="feather icon-log-out" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                {" "}
                Çıkış Yap
                <span></span>
                <Button
                  variant="link"
                  className="dud-logout"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <i className="feather icon-log-out" />
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;

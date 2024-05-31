import React, { useState } from "react";
import { Card, ListGroup, Dropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase/firebaseConfig"; // Firebase yapılandırma dosyanızı içe aktarın

import ChatList from "./ChatList";

import avatar1 from "../../../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../../../assets/images/user/avatar-3.jpg";
import avatar4 from "../../../../assets/images/user/avatar-4.jpg";

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const navigate = useNavigate();

  const notiData = [
    {
      name: "Ahmet",
      image: avatar2,
      details: "Yeni Kayıt Oldu",
      activity: "30 dk",
    },
    {
      name: "Sara ",
      image: avatar3,
      details: "Yeni Kayıt Old",
      activity: "30 dk",
    },
    {
      name: "Suzen",
      image: avatar4,
      details: "Giriş Yaptı",
      activity: "Dün",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase çıkış işlemi
      navigate("/auth/signup-1"); // Çıkış yaptıktan sonra yönlendirilecek sayfa
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
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <span>Hilmi Bahadir TEMUR</span>
                <Button
                  variant="link"
                  className="dud-logout"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <i className="feather icon-log-out" />
                </Button>
              </div>
              <ListGroup
                as="ul"
                bsPrefix=" "
                variant="flush"
                className="pro-body"
              >
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-settings" /> Ayarlar
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item">
                    <i className="feather icon-user" /> Profil
                  </Link>
                </ListGroup.Item>

                <ListGroup.Item as="li" bsPrefix=" ">
                  <Button
                    variant="link"
                    className="dropdown-item"
                    onClick={handleLogout}
                  ></Button>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;

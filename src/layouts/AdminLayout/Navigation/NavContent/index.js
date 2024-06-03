import PropTypes from "prop-types";
import React from "react";
import { ListGroup } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import NavGroup from "./NavGroup";

const NavContent = ({ navigation }) => {
  const navItems = navigation.map((item) => {



    const role = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).role;
    


    switch (item.type) {
      case "group":
       
        if (role == 'admin') {
        return  <NavGroup key={"nav-group-" + item.id} group={item} />;
        } else {
          return null
        }
        
       
      default:
        return false;
    }
  });

 

  let mainContent = "";

  mainContent = (
    <div className="navbar-content datta-scroll ">
      <PerfectScrollbar>
        <ListGroup variant="flush" as="ul" bsPrefix=" " className="nav pcoded-inner-navbar" id="nav-ps-next">
          {navItems}
        </ListGroup>
      </PerfectScrollbar>
    </div>
  );

  return <React.Fragment>{mainContent}</React.Fragment>;
};

NavContent.propTypes = {
  navigation: PropTypes.array,
};

export default NavContent;

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Navigation(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar style={{background: "var(--secondary)"}}>
        <NavbarBrand href="/" className="me-auto font-primary"> Home </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Feed</NavLink>
            </NavItem>


            <NavItem>
              <NavLink href="/components/">Feed</NavLink> {/* API_ROOM_VIEW_ALL */}
            </NavItem>            <NavItem>
              <NavLink href="/components/">Feed</NavLink> {/* API_ROOM_CREAT */}
            </NavItem>            <NavItem>
              <NavLink href="/components/">Feed</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
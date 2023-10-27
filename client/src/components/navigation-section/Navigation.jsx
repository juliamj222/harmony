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
      <Navbar >
        <NavbarBrand href="/" className="me-auto font-primary"> What would you like to do? </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Feed</NavLink>
            </NavItem>            <NavItem>
              <NavLink href="/components/">Feed</NavLink>
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
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import firebase from "../../firebaseConfig/firebase";
import { UserContext } from "../../App";
import styles from "./Navbar.module.css";

// The main navigation bar component
export default function MyNavbar() {
  // Get the user context from the parent component
  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className={styles.navContainer}>
        {/* Brand section */}
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          E-commerce Project
        </Navbar.Brand>
        {/* Hamburger menu button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Main navigation links */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact Us
            </Nav.Link>
          </Nav>
          {/* User dropdown */}
          {user && (
            <Nav className="justify-content-end">
              <NavDropdown title={`Hi,${user.name}`} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={Link}
                  onClick={() => {
                    // Sign out the user from Firebase authentication
                    firebase.auth().signOut();
                  }}
                  to="/"
                >
                  SignOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {/* Sign-in link */}
          {!user && (
            <Nav className="justify-content-end">
              <Nav.Link as={NavLink} to="/signin">
                Sign In
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

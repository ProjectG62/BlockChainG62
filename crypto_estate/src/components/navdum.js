import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import "./Navbar.css";
import connectWallet from "./FetchId";

function NavScrollExample() {
  const [walletAddress, setWalletAddress] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    setWalletAddress(address);
  };
  return (
    <Navbar expand="lg" className="h-container">
      <Container fluid>
        <div className="spacing"></div>
        <Navbar.Brand href="/">
          <img
            src="../logo.png"
            className="logo_container"
            width={100}
            height={50}
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler">
          <span className="custom-icon"></span>
          <span className="custom-icon"></span>
          <span className="custom-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="/Buy_Property"
              className="a-link"
              style={{ color: "white" }}
            >
              Buy Property
            </Nav.Link>
            <Nav.Link
              href="/Sell_Property"
              className="a-link"
              style={{ color: "white" }}
            >
              Sell Property
            </Nav.Link>
            <Nav.Link
              href="//user/activepage"
              className="a-link"
              style={{ color: "white" }}
            >
              Profile
            </Nav.Link>
            <Button className="a-link button" onClick={handleConnectWallet}>
              <span>
                {walletAddress.length > 0
                  ? `Connected: ${walletAddress.substring(
                      0,
                      6
                    )}...${walletAddress.substring(38)}`
                  : "Connect"}
              </span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;

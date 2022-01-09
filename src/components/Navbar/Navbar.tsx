import { useState } from "react"
import { MDBCollapse, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem, MDBNavLink } from "mdbreact"
import GitHubButton from "react-github-btn"

import Endpoint from "@shelf/helpers/Endpoint"

import "./Navbar.css"

function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MDBNavbar expand="md" className="navbar-custom primary-color" dark>
      <MDBNavbarBrand>
        <MDBNavLink to={Endpoint.Client.Home}>
          <strong className="font-weight-bold navbar-brand">
            shelf.gg
          </strong>
        </MDBNavLink>
      </MDBNavbarBrand>

      <MDBNavbarToggler onClick={toggleCollapse} className="navbar-toggler-custom" />

      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          <MDBNavItem className="nav-item-custom">
            <MDBNavLink to={Endpoint.Client.Faq} className="nav-item-text">
              faq
            </MDBNavLink>
          </MDBNavItem>
          
          <MDBNavItem className="nav-item-custom">
            <MDBNavLink to={Endpoint.Client.Build} className="nav-item-text">
              build
            </MDBNavLink>
          </MDBNavItem>

          <MDBNavItem className="nav-item-custom">
            <MDBNavLink to={Endpoint.Client.Explore} className="nav-item-text">
              explore
            </MDBNavLink>
          </MDBNavItem>

          <MDBNavItem className="nav-item-custom">
            <GitHubButton
              href="https://github.com/samueldobbie/shelf.gg"
              data-size="large"
              data-show-count="true"
              aria-label="Star samueldobbie/shelf.gg on GitHub"
            >
              Star
            </GitHubButton>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  )
}

export default Navbar

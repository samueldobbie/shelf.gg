import { useState } from 'react'
import {
  MDBCollapse,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact'

import Endpoint from '@shelf/helpers/Endpoint'
import './Nav.css'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

    return (
      <MDBNavbar dark expand="md" className="navbar-custom primary-color">
        <MDBNavbarBrand>
          <MDBNavLink to={Endpoint.Home}>
            <strong className="font-weight-bold navbar-brand">shelf.gg</strong>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} className="navbar-toggler-custom" />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem className="nav-item-custom">
              <MDBNavLink to={Endpoint.Faq} className="nav-item-text">faq</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="nav-item-custom">
              <a href={Endpoint.Repository} className="nav-link Ripple-parent nav-item-text" target="_blank" rel="noreferrer">github</a>
            </MDBNavItem>
            <MDBNavItem className="nav-item-custom">
              <MDBNavLink to={Endpoint.Build} className="nav-item-text">build</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="nav-item-custom">
              <MDBNavLink to={Endpoint.Explore} className="nav-item-text">explore</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    )
}

export default Nav

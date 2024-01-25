import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavbarContainer>
      <Logo>
        <Link to="/">Quik Fame</Link>
      </Logo>
      <ToggleMenuButton onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </ToggleMenuButton>
      <NavLinks open={menuOpen}>
        <NavLinkItem>
          <Link to="/instagram">Instagram</Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="/tiktok">TikTok</Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="/youtube">YouTube</Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="/contact">Contact</Link>
        </NavLinkItem>
      </NavLinks>
      <IconsContainer>
        <IconLink to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <CartBadge>4</CartBadge>
        </IconLink>
        <IconLink to="/profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </IconLink>
      </IconsContainer>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
`;

const ToggleMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: #333;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: ${(props) => (props.open ? "1rem" : "0")};
    opacity: ${(props) => (props.open ? "1" : "0")};
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
    transition: opacity 0.3s ease, visibility 0.3s ease, padding 0.3s ease;
  }
`;

const NavLinkItem = styled.li`
  margin-right: 1.5rem;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;

    &:hover {
      color: #4caf50;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconLink = styled(Link)`
  margin-right: 1rem;
  color: #333;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    color: #4caf50;
  }
`;

const CartBadge = styled.span`
  background-color: #4caf50;
  color: #fff;
  border-radius: 50%;
  padding: 0.4px 4px;
`;

export default Navbar;

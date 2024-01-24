import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <Link to="/">Quik Fame</Link>
      </Logo>
      <NavLinks>
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
`;

const Logo = styled.div`
  a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
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

import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

// Styled components
const HeaderContainer = styled.header`
  background-color: #7db0aa; /* Brighter teal background */
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-bottom: 4px solid #ffb17a;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 2.2rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff8e6; /* Lighter cream color */
  font-family: 'Bubblegum Sans', 'Comic Sans MS', cursive, sans-serif;
  text-shadow: 2px 2px 0px #ff9d5c, 4px 4px 0px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.03);
    transition: transform 0.3s ease;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled(NavLink)`
  color: #fff8e6;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  font-family: 'Bubblegum Sans', 'Comic Sans MS', cursive, sans-serif;
  padding: 10px 24px;
  border-radius: 30px;
  border: 3px solid #ff9d5c;
  background-color: #ff7e5f;
  box-shadow: 0 4px 0 #e66e54;
  transition: all 0.2s;
  position: relative;
  top: 0;

  &:hover {
    background-color: #ffb17a;
    transform: translateY(-3px);
    box-shadow: 0 7px 0 #e66e54;
  }

  &:active {
    top: 3px;
    box-shadow: 0 1px 0 #e66e54;
  }

  &.active {
    background-color: #ffd166;
    color: #5c4a36;
    border: 3px solid #ff9d5c;
    box-shadow: 0 4px 0 #e6a940;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Awesome Scalability Talks</Logo>
        <NavList>
          <li><NavItem to="/videos">Talks</NavItem></li>
          <li><NavItem to="/docs">Learn React</NavItem></li>
          <li><NavItem to="/about">About</NavItem></li>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

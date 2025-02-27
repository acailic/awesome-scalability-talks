import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

// Styled components
const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
`;

const NavList = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled(NavLink)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius?.pill || '20px'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.border || props.theme.colors.secondary};
  }

  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Header: React.FC = () => {
  // No need to call useTheme() as styled-components automatically provides the theme via ThemeProvider

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">CozyTube</Logo>
        <NavList>
          <li><NavItem to="/">Home</NavItem></li>
          <li><NavItem to="/videos">Videos</NavItem></li>
          <li><NavItem to="/docs">React Docs</NavItem></li>
          <li><NavItem to="/about">About</NavItem></li>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

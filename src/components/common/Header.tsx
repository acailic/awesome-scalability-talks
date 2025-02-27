import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Gluten', cursive;
  font-weight: 600;
  font-size: 1.8rem;
  color: #3498db;
  margin: 0;
  letter-spacing: 1px;
`;

const Subtitle = styled.span`
  font-family: 'Gluten', cursive;
  font-weight: 400;
  font-size: 1rem;
  color: #7f8c8d;
  margin-left: 1rem;
`;

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <HeaderContainer>
      <Title>
        {title}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Title>
    </HeaderContainer>
  );
};

export default Header;

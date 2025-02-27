import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 1rem;
  overflow-y: auto;
`;

const Content = styled.main`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;

interface LayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, content }) => {
  return (
    <LayoutContainer>
      <Sidebar>{sidebar}</Sidebar>
      <Content>{content}</Content>
    </LayoutContainer>
  );
};

export default Layout;

import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: ${({ theme }) => theme.colors.navBackground};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
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

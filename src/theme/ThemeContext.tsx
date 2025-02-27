import React, { createContext, ReactNode, useContext } from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

// Define your default theme here
const defaultTheme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#212529',
    heading: '#212529',
    card: '#ffffff',
    border: "#dee2e6",
    navBackground: "#f8f9fa",
    buttonHover: "#6c757d",
    tertiary: "#17a2b8",  // Added missing tertiary color
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem',
    xxl: '4rem',
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem',
    pill: '50rem',
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    large: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  },
};

// Create the context with defaultTheme as initial value
const ThemeContext = createContext<DefaultTheme>(defaultTheme);

// Hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Define props for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
  theme?: DefaultTheme;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = defaultTheme
}) => {
  return (
    <StyledThemeProvider theme={theme}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};

export default ThemeProvider;

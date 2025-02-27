export const lightTheme = {
  colors: {
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    tertiary: "#FFE66D",
    background: "#F7F9FC",
    card: "#FFFFFF",
    text: "#333333",
    textLight: "#757575",
    border: "#E0E0E0",
    navBackground: "#FFF1F1",
    buttonHover: "#FF9E9E",
  },
  fonts: {
    main: '"Nunito", sans-serif',
    heading: '"Varela Round", sans-serif',
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    pill: "9999px",
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
    large: "0 8px 24px rgba(0, 0, 0, 0.12)",
  },
  animations: {
    fast: "0.2s",
    medium: "0.3s",
    slow: "0.5s",
  },
};

export const darkTheme = {
  colors: {
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    tertiary: "#FFE66D",
    background: "#1E1E2E",
    card: "#2C2C3E",
    text: "#E9ECEF",
    textLight: "#ADB5BD",
    border: "#444444",
    navBackground: "#292940",
    buttonHover: "#FF9E9E",
  },
  // Keep the same values for other properties
  fonts: lightTheme.fonts,
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.3)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.3)",
    large: "0 8px 24px rgba(0, 0, 0, 0.35)",
  },
  animations: lightTheme.animations,
};

export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    navBackground: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
    border: '#e0e0e0',
    buttonHover: '#0056b3'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    pill: '50px'
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)'
  }
};

export type Theme = typeof theme;

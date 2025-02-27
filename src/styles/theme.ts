export const theme = {
  colors: {
    primary: "#FF9A8B",
    secondary: "#FF6B6B",
    tertiary: "#A9DEF9",
    background: "#FFF9F3",
    text: "#504538",
    heading: "#8E4162",
    accent: "#96BB7C",
    card: "#FFFFFF",
    shadow: "rgba(0, 0, 0, 0.05)",
    navBackground: "#FFEDDB",
    border: "#FFD8CC",
    buttonHover: "#FF8C7C",
  },
  fonts: {
    heading: "'Comic Neue', cursive",
    body: "'Quicksand', sans-serif",
  },
  borderRadius: {
    small: "8px",
    medium: "12px",
    large: "20px",
    pill: "50px",
  },
  shadows: {
    small: "0 2px 8px rgba(0, 0, 0, 0.05)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.08)",
    large: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
};

export type Theme = typeof theme;

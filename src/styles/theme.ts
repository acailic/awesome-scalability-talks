export const theme = {
  colors: {
    primary: "#7db0aa", // Teal background
    secondary: "#ffb17a", // Orange accent
    accent: "#ff7e5f", // Button background
    accentHover: "#ffb17a", // Button hover
    accentActive: "#ffd166", // Active button
    text: "#fff8e6", // Light text
    darkText: "#5c4a36", // Dark text
    shadow: "rgba(0, 0, 0, 0.2)",
    buttonShadow: "#e66e54", // Button shadow
    activeButtonShadow: "#e6a940", // Active button shadow
  },
  fonts: {
    primary: "'Bubblegum Sans', 'Comic Sans MS', cursive, sans-serif",
    body: "'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  shadows: {
    small: "0 2px 6px rgba(0, 0, 0, 0.15)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.15)",
    large: "0 8px 24px rgba(0, 0, 0, 0.15)",
    text: "2px 2px 0px #ff9d5c, 4px 4px 0px rgba(0, 0, 0, 0.2)",
  },
  borderRadius: {
    small: "8px",
    medium: "16px",
    large: "30px",
  },
  transitions: {
    fast: "0.2s",
    medium: "0.3s",
    slow: "0.5s",
  },
};

export type Theme = typeof theme;

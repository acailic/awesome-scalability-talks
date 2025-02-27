import { heading } from "mdast-util-to-hast/lib/handlers/heading";

export const theme = {
  // Breakpoints for responsive design
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
  // Add other theme properties as needed (colors, typography, spacing, etc.)
  colors: {
    primary: "#1a73e8",
    secondary: "#303846",
    background: "#f7f9fc",
    text: "#333333",
    lightText: "#767676",
    card: "#FFFFFF", // or any color value that fits your design
    heading: "#333333",
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

export default theme;

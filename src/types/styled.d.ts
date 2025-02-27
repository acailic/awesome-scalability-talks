import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      lightText: string;
      card: string;
      buttonHover: string;
      border: string;
      tertiary: string;
      navBackground: string;
      shadow: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}

import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Color {
    0?: string;
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }

  interface PaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface TypeBackground {
    neutral?: string;
  }
}

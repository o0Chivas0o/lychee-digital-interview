import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

declare module '@mui/system/createTheme/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
const breakpoints = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 1120,
      lg: 1440,
      xl: 1920,
    },
  },
});
// Create a theme instance.
const theme = createTheme({
  ...breakpoints,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

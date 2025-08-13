import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const theme = createTheme({
  typography: {
    fontFamily: `${poppins.style.fontFamily}, sans-serif`,
  },
});

export default theme;

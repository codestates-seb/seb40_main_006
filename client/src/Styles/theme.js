import { createTheme } from '@mui/material/styles';

const palette = {
  white: '#FFFFFF',
  black: '#000000',
  gray_4: '#F4F4F4',
  gray_5: '#D9D9D9',
  border: '#D9D9D9',

  colorMain: '#FFCABB',
  colorAccent: '#F33B06',

  colorGrade1: '#FFDAD7',
  colorGrade2: '#F7AF0C',
  colorGrade3: '#FD7E14',
  colorGrade4: '#F23701',
  colorGrade5: '#A24000',

  colorBtn1: '#FF9B51',
  colorBtn2: '#FF8B8B',
  colorBtn3: '#DDDDDD',

  colorJamOpen: '#B0D0FF',
  colorJamClose: '#BABABA',
  colorJamRealtime: '#FFB0B0',

  colorTitle: '#455D7A',
  colorBorder: '#D9D9D9',
  colorBorder2: '#EDEDED',
};

const themeUserPage = createTheme({
  typography: {
    fontSize: 13,
  },
  palette: {
    text: {
      primary: palette.colorTitle,
    },
    primary: {
      main: palette.colorJamRealtime,
      dark: palette.colorMain,
    },
    true: {
      main: palette.colorTitle,
    },
    false: {
      main: palette.colorBtn3,
    },
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: '15px',
        },
      },
    },
  },
});

export { palette, themeUserPage };

import { ThemeProvider } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';
import { theme } from '../Styles/theme';

const floatingIcon = css`
  display: none;
  @media screen and (max-width: 767px) {
    display: flex;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1;
  }
`;

const FloatingButton = () => {
  const Navigate = useNavigate();
  const handleAddClick = () => {
    Navigate('/jammake');
  };
  return (
    <div className={floatingIcon}>
      <ThemeProvider theme={theme}>
        <Fab color="primary" aria-label="add" onClick={handleAddClick}>
          <AddIcon />
        </Fab>
      </ThemeProvider>
    </div>
  );
};

export default FloatingButton;

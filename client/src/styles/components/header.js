function getHeaderColor(theme) {
  return theme.palette.mode === 'light'
    ? 'linear-gradient(to top, #2196f3, #1565c0)'
    : 'linear-gradient(to top, #212121, #424242)';
}

export const stylesHeaderAppBar = {
  backgroundImage: getHeaderColor,
  boxShadow: 3,
};

export const stylesHeaderToolbar = {
  display: 'flex',
  justifyContent: 'space-between',
  py: 0.5,
};

export const stylesHeaderToolbarBox = {
  display: 'flex',
};

export const stylesHeaderUserBlockWrapper = {
  display: 'flex',
  alignItems: 'center',
};

export const stylesHeaderUserAvatar = {
  width: { xs: 40, sm: 45 },
  height: { xs: 40, sm: 45 },
  border: '2px solid rgba(56, 142, 60, 0.3)',
  cursor: 'pointer',
};

export const stylesHeaderDivider = {
  borderWidth: '1px',
};

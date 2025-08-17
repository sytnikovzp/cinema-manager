function getBackgroundColor(theme) {
  return theme.palette.mode === 'light'
    ? theme.palette.grey[100]
    : theme.palette.grey[700];
}

export const rootComponentPaperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  padding: '10px',
  borderRadius: 1,
};

export const buttonMainStyle = {
  width: '170px',
  height: '40px',
};

export const textIndentStyle = {
  fontWeight: 'medium',
  textIndent: '2em',
};

export const styleEntityBox = {
  mt: 2,
  mb: 2,
};

export const styleStackMargin = {
  marginTop: 2,
};

export const styleItemTypography = {
  fontWeight: 'bold',
};

export const styleListListItemButton = {
  borderRadius: 5,
};

export const styleItemCreatedAtLabel = {
  fontWeight: 'bold',
  color: 'gray',
  textAlign: 'right',
};

export const styleItemCreatedAtValue = {
  color: 'gray',
  textAlign: 'right',
};

export const styleCinemaServiceBox = {
  mt: 2,
  ml: 2,
};

export const styleCinemaServiceTypography = {
  paddingTop: 1,
  paddingBottom: 1,
  textAlign: 'center',
};

export const styleLayoutBox = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export const styleLayoutMainGridContainer = {
  flexGrow: 1,
  backgroundColor: getBackgroundColor,
  color: 'text.primary',
};

export const styleLayoutGridContainer = {
  flex: 1,
  mt: '1rem',
  mb: '1rem',
};

export const styleLayoutDesktopNavbar = {
  display: { xs: 'none', md: 'block' },
};

export const styleLayoutMobileNavbar = {
  display: { xs: 'block', md: 'none' },
};

export const styleLayoutNavbarSize = {
  xs: 12,
  md: 2,
};

export const styleLayoutOutletSize = {
  xs: 12,
  md: 6,
};

export const styleLayoutCinemaServiceSize = {
  xs: 12,
  md: 4,
};

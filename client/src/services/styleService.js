function getBackgroundColor(theme) {
  return theme.palette.mode === 'light'
    ? theme.palette.grey[100]
    : theme.palette.grey[700];
}

// General style

export const rootComponentPaperStyle = {
  borderRadius: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  padding: '10px',
};

export const buttonMainStyle = {
  height: '40px',
  width: '170px',
};

export const textIndentStyle = {
  textIndent: '2em',
  fontWeight: 'medium',
};

// NavBar component

export const navBarBox = {
  mt: 2,
  mr: 2,
};

export const navItemTextStyle = {
  color: 'text.primary',
};

// HomePage component

export const carouselStyles = {
  imgContainerStyle: {
    height: '70vh',
    padding: '15px',
  },

  imgStyle: {
    borderRadius: '15px',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: 'inherit',
    height: '95%',
  },
};

export const skeletonHomePageStyles = {
  height: '70vh',
  marginLeft: '25%',
  padding: '15px',
  borderRadius: '15px',
  width: '50%',
};

// *form components

export const formStyle = {
  borderRadius: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
  paddingTop: '10px',
  minHeight: '65vh',
};

export const formItemStyle = {
  display: 'flex',
  gap: 1,
  width: '90%',
};

export const movieFormItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  mt: 2,
};

export const fieldArrayStyle = {
  width: '100%',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '10px',
  borderRadius: '5px',
};

export const stackButtonFormStyle = {
  padding: '20px',
};

export const buttonFormStyle = {
  height: '40px',
  width: '100px',
};

export const wideButtonFormStyle = {
  height: '40px',
  width: '120px',
};

export const addButtonFormStyle = {
  height: '40px',
  width: '200px',
};

// *list components

export const scrollListBoxStyle = {
  minHeight: '55vh',
  overflowY: 'auto',
};

export const itemListStyle = {
  color: 'text.primary',
  border: '1px solid #009688',
  borderRadius: 5,
};

export const scrollServicesListBoxStyle = {
  height: '45vh',
  overflowY: 'auto',
};

// *item components

export const scrollItemBoxStyle = {
  height: '55vh',
  overflowY: 'auto',
};

export const itemComponentBoxMainStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  width: '100%',
};

export const itemCardMediaBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
};

export const itemInformationBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '65%',
  textAlign: 'justify',
  paddingRight: 2,
};

export const itemLinkStyle = {
  textDecoration: 'underline dotted',
  color: 'inherit',
};

// MoviesPlayer component

export const playerStyle = {
  ml: 2,
  mr: 2,
  mb: 2,
  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.7)',
};

// Custom

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
  textAlign: 'right',
  color: 'gray',
};

export const styleItemCreatedAtValue = {
  textAlign: 'right',
  color: 'gray',
};

export const styleCinemaServiceBox = {
  mt: 2,
  ml: 2,
};

export const styleCinemaServiceTypography = {
  textAlign: 'center',
  paddingTop: 1,
  paddingBottom: 1,
};

export const styleLayoutBox = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export const styleLayoutMainGridContainer = {
  flexGrow: 1,
  color: 'text.primary',
  backgroundColor: getBackgroundColor,
};

export const styleLayoutGridContainer = {
  mt: '1rem',
  mb: '1rem',
  flex: 1,
};

export const styleLayoutDesktopNavbar = {
  display: { xs: 'none', md: 'block' },
};

export const styleLayoutMobileNavbar = {
  display: { xs: 'block', md: 'none' },
};

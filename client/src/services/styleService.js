function getBackgroundColor(theme) {
  return theme.palette.mode === 'light'
    ? theme.palette.grey[100]
    : theme.palette.grey[700];
}

// General style

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

// NavBar component

export const navBarBox = {
  mt: 2,
  mr: 2,
};

export const navItemTextStyle = {
  color: 'text.primary',
};

// HomePage component

export const stylesHomePageBox = {
  maxWidth: 900,
  mt: 4,
  mx: 'auto',
};

export const stylesHomePageAutoplayConfig = {
  delay: 3000,
  disableOnInteraction: false,
};

export const stylesHomePageCoverflowEffect = {
  depth: 150,
  modifier: 2.5,
  rotate: 0,
  stretch: 0,
  slideShadows: true,
};

export const stylesHomePageSwiperSlideBox = {
  overflow: 'hidden',
  borderRadius: 2,
  boxShadow: 6,
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
};

export const stylesHomePageSwiperSlideImg = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const skeletonHomePageStyles = {
  width: '50%',
  height: '70vh',
  marginLeft: '25%',
  padding: '15px',
  borderRadius: '15px',
};

// *form components

export const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
  minHeight: '65vh',
  paddingTop: '10px',
  borderRadius: 0,
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
  paddingRight: '10px',
  paddingBottom: '10px',
  paddingLeft: '10px',
  borderRadius: '5px',
};

export const stackButtonFormStyle = {
  padding: '20px',
};

export const buttonFormStyle = {
  width: '100px',
  height: '40px',
};

export const wideButtonFormStyle = {
  width: '120px',
  height: '40px',
};

export const addButtonFormStyle = {
  width: '200px',
  height: '40px',
};

// *list components

export const scrollListBoxStyle = {
  overflowY: 'auto',
  minHeight: '55vh',
};

export const itemListStyle = {
  border: '1px solid #009688',
  borderRadius: 5,
  color: 'text.primary',
};

export const scrollServicesListBoxStyle = {
  overflowY: 'auto',
  height: '45vh',
};

// *item components

export const scrollItemBoxStyle = {
  overflowY: 'auto',
  height: '55vh',
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
  paddingRight: 2,
  textAlign: 'justify',
};

export const itemLinkStyle = {
  color: 'inherit',
  textDecoration: 'underline dotted',
};

// MoviesPlayer component

export const playerStyle = {
  mr: 2,
  mb: 2,
  ml: 2,
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

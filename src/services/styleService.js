// =============================================
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

// =============================================
// NavBar component

export const navItemTextStyle = {
  color: 'text.primary',
};

// =============================================
// HomePage component

export const carouselStyles = {
  imgContainerStyle: {
    position: 'relative',
    maxWidth: '100%',
    height: '70vh',
    overflow: 'hidden',
    color: 'red',
  },
  imgStyle: {
    borderRadius: '15px',
    padding: '5px',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
    objectFit: 'contain',
  },
};

// =============================================
// *form components

export const formStyle = {
  borderRadius: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
  paddingTop: '10px',
  paddingBottom: '10px',
};

export const formItemStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 1,
  width: '90%',
};

export const fieldArrayStyle = {
  width: '100%',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '10px',
  borderRadius: '5px',
};

export const buttonFormStyle = {
  height: '40px',
  width: '100px',
};

// =============================================
// *list components

export const scrollListBoxStyle = {
  height: '70vh',
  overflowY: 'auto',
};

export const itemListStyle = {
  color: 'text.primary',
  border: '1px solid #009688',
  borderRadius: 5,
};

// =============================================
// *item components

export const scrollItemBoxStyle = {
  height: '63vh',
};

export const itemComponentBoxMainStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  width: '100%',
};

export const itemComponentBoxSecondaryStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
};

export const itemInformationBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '65%',
};

// =============================================
// MoviesPlayer component

export const playerStyle = {
  ml: 2,
  mr: 2,
  mb: 2,
  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.7)',
};

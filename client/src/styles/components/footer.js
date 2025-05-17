function getBackgroundColor(theme) {
  return theme.palette.mode === 'light'
    ? theme.palette.grey[300]
    : theme.palette.grey[900];
}

function getFooterTextColor(theme) {
  return theme.palette.mode === 'light' ? '#555' : '#AAA';
}

export const stylesFooterBox = {
  mt: 'auto',
  py: 2,
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  color: '#333',
  backgroundColor: getBackgroundColor,
};

export const stylesFooterContainer = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 1.5,
  textAlign: { xs: 'center', sm: 'left' },
};

export const stylesFooterTypography = {
  color: getFooterTextColor,
};

export const stylesFooterSocialLinks = {
  display: 'flex',
  gap: 2,
};

export const stylesFooterIcon = {
  display: 'flex',
  alignItems: 'center',
  color: getFooterTextColor,
  transition: 'color 0.3s ease',
  '&:hover': { color: '#CCC' },
};

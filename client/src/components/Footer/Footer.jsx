import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

import {
  stylesFooterBox,
  stylesFooterContainer,
  stylesFooterIcon,
  stylesFooterSocialLinks,
  stylesFooterTypography,
} from '../../styles';

const socialLinks = [
  {
    href: 'https://github.com/sytnikovzp',
    icon: <GitHubIcon />,
  },
  {
    href: 'https://www.linkedin.com/in/sytnikovzp',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://t.me/sytnikovzp',
    icon: <TelegramIcon />,
  },
];

function Footer() {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  const years =
    startYear === currentYear
      ? `${startYear}`
      : `${startYear} - ${currentYear}`;

  return (
    <Box component='footer' sx={stylesFooterBox}>
      <Container maxWidth='xl' sx={stylesFooterContainer}>
        <Typography sx={stylesFooterTypography} variant='body2'>
          © {years} Oleksandr Sytnikov. All rights reserved.
        </Typography>
        <Box sx={stylesFooterSocialLinks}>
          {socialLinks.map(({ href, icon }) => (
            <Link
              key={href}
              href={href}
              rel='noopener noreferrer'
              sx={stylesFooterIcon}
              target='_blank'
            >
              {icon}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;

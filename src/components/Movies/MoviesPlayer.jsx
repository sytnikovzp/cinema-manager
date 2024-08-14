import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
// =============================================
import Box from '@mui/material/Box';
// =============================================
import { playerStyle, scrollItemBoxStyle } from '../../services/styleService';

function MoviesPlayer({ trailer }) {
  return (
    <Box sx={scrollItemBoxStyle}>
      <Box sx={playerStyle}>
        <ReactPlayer
          url={trailer}
          light
          width='100%'
          height='55vh'
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 2,
                iv_load_policy: 3,
                rel: 0,
                showinfo: 0,
                modestbranding: 1,
                cc_load_policy: 1,
                origin:
                  window.location.hostname === 'sytnikov.site'
                    ? 'https://sytnikov.site'
                    : 'http://localhost:3000',
              },
              embedOptions: {
                host: 'https://www.youtube-nocookie.com',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}

MoviesPlayer.propTypes = {
  trailer: PropTypes.string.isRequired,
};

export default MoviesPlayer;

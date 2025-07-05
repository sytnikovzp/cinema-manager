/* eslint-disable camelcase */
import ReactPlayer from 'react-player';

import Box from '@mui/material/Box';

import { playerStyle, scrollItemBoxStyle } from '../../services/styleService';

const config = {
  youtube: {
    playerVars: {
      autoplay: 1,
      controls: 1,
      iv_load_policy: 3,
      rel: 0,
      cc_load_policy: 1,
      origin: 'http://localhost:3000',
    },
    embedOptions: {
      host: 'https://www.youtube-nocookie.com',
    },
  },
};

function MoviesPlayer({ trailer }) {
  return (
    <Box sx={scrollItemBoxStyle}>
      <Box sx={playerStyle}>
        <ReactPlayer
          controls
          light
          playing
          config={config}
          height='100%'
          src={trailer}
          width='100%'
        />
      </Box>
    </Box>
  );
}

export default MoviesPlayer;

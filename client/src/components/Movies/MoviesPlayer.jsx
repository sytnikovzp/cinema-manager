/* eslint-disable camelcase */
import ReactPlayer from 'react-player/lazy';

import Box from '@mui/material/Box';

import { playerStyle, scrollItemBoxStyle } from '../../services/styleService';

const config = {
  youtube: {
    playerVars: {
      autoplay: 1,
      controls: 2,
      iv_load_policy: 3,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
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
          light
          config={config}
          minheight='35vh'
          url={trailer}
          width='100%'
        />
      </Box>
    </Box>
  );
}

export default MoviesPlayer;

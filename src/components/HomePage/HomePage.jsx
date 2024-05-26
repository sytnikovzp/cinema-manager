import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import { posters } from '../../constants';

const styles = {
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

function HomePage() {
  return (
    <>
      <Carousel>
        {posters.map((poster) => {
          return (
            <Box key={poster.id} styles={styles.imgContainerStyle}>
              <img style={styles.imgStyle} src={poster.url} alt={poster.alt} />
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}

export default HomePage;

import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
// =============================================
import { carouselStyles } from '../../services/styleService';
import { posters } from '../../constants';

function HomePage() {
  return (
    <>
      <Carousel>
        {posters.map((poster) => {
          return (
            <Box key={poster.id} style={carouselStyles.imgContainerStyle}>
              <img
                src={poster.url}
                alt={poster.alt}
                style={carouselStyles.imgStyle}
              />
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}

export default HomePage;

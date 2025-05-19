/* eslint-disable import/no-unresolved */
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Box from '@mui/material/Box';

import usePagination from '../../hooks/usePagination';

import {
  stylesHomePageAutoplayConfig,
  stylesHomePageBox,
  stylesHomePageCoverflowEffect,
  stylesHomePageSwiperSlideBox,
  stylesHomePageSwiperSlideImg,
} from '../../services/styleService';

import SnackbarContext from '../../contexts/SnackbarContext';
import HomePageSkeleton from '../SkeletonLoader/HomePageSkeleton';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const ITEMS_PER_PAGE = 15;

function HomePage() {
  const {
    data: movies,
    loading,
    error,
  } = usePagination(`/movies`, ITEMS_PER_PAGE, 1);

  const { showSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error, showSnackbar]);

  const filteredMovies = movies.filter((movie) => movie.poster);
  const lastMovies = filteredMovies.slice(0, ITEMS_PER_PAGE);

  return loading ? (
    <HomePageSkeleton />
  ) : (
    <Box sx={stylesHomePageBox}>
      <Swiper
        autoplay={stylesHomePageAutoplayConfig}
        centeredSlides={true}
        coverflowEffect={stylesHomePageCoverflowEffect}
        effect='coverflow'
        loop={true}
        modules={[Autoplay, EffectCoverflow]}
        slidesPerView={2}
      >
        {lastMovies.map((movie) => (
          <SwiperSlide key={movie.uuid}>
            <Box sx={stylesHomePageSwiperSlideBox}>
              <Link to={`/movies/${movie.uuid}`}>
                <img
                  alt={movie.title}
                  src={movie.poster}
                  style={stylesHomePageSwiperSlideImg}
                />
              </Link>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default HomePage;

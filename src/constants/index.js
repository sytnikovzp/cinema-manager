export const BASE_URL = 'http://localhost:5000';
// export const BASE_URL = 'http://sytnikov.site:5000';

export const ACTORS_SLICE_NAME = 'actors';
export const DIRECTORS_SLICE_NAME = 'directors';
export const MOVIES_SLICE_NAME = 'movies';
export const STUDIOS_SLICE_NAME = 'studios';

export const emptyActor = {
  id: null,
  movies: [''],
  fullName: '',
  birthYear: '',
  nationality: '',
  image: '',
};

export const emptyDirector = {
  id: null,
  movies: [''],
  fullName: '',
  birthYear: '',
  nationality: '',
  image: '',
};

export const emptyMovie = {
  id: null,
  title: '',
  directors: [''],
  actors: [''],
  studios: [''],
  poster: '',
};

export const emptyStudio = {
  id: null,
  title: '',
  location: '',
  foundationYear: '',
  movies: [''],
  logo: '',
};

export const posters = [
  {
    id: 1,
    url: 'https://pluggedin.ru/images/upload/1655926482.jpg',
    alt: 'poster',
  },
  {
    id: 2,
    url: 'https://i.pinimg.com/736x/6b/2f/41/6b2f4114cafe3a3bc0ab845602c3cea6.jpg',
    alt: 'poster',
  },
  {
    id: 3,
    url: 'https://www.themoviedb.org/t/p/original/9AhKm1JP67ZvuUTCmYs3SVlHm0c.jpg',
    alt: 'poster',
  },
  {
    id: 4,
    url: 'https://xage.ru/media/uploads/2017/08/thor_ragnarok_04_01.jpg',
    alt: 'poster',
  },
  {
    id: 5,
    url: 'https://m.media-amazon.com/images/I/811xdZfsUqL._AC_UF1000,1000_QL80_.jpg',
    alt: 'poster',
  },
  {
    id: 6,
    url: 'https://xage.ru/media/uploads/2008/2/posteryi-luchshih-filmov-poluchivshih-oskar/posteryi-luchshih-filmov-poluchivshih-oskar_1.jpg',
    alt: 'poster',
  },
  {
    id: 7,
    url: 'https://m.media-amazon.com/images/I/915RviLDi3L._AC_UF894,1000_QL80_.jpg',
    alt: 'poster',
  },
];

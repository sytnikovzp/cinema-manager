export const BASE_URL = 'http://localhost:5000';
// export const BASE_URL = 'http://sytnikov.site:5000';

export const ACTORS_SLICE_NAME = 'actors';
export const DIRECTORS_SLICE_NAME = 'directors';
export const MOVIES_SLICE_NAME = 'movies';
export const STUDIOS_SLICE_NAME = 'studios';

export const emptyActor = {
  id: null,
  fullName: '',
  nationality: '',
  birthDate: '',
  deathDate: '',
  image: '',
  biography: '',
};

export const emptyDirector = {
  id: null,
  fullName: '',
  nationality: '',
  birthDate: '',
  deathDate: '',
  image: '',
  biography: '',
};

export const emptyMovie = {
  id: null,
  title: '',
  genre: '',
  releaseYear: '',
  poster: '',
  trailer: '',
  directors: [''],
  actors: [''],
  studios: [''],
  storyline: '',
};

export const emptyStudio = {
  id: null,
  title: '',
  location: '',
  foundationYear: '',
  logo: '',
  about: '',
};

export const posters = [
  {
    id: 1,
    url: 'https://www.tallengestore.com/cdn/shop/products/HouseOfTheDragon_GoT_-TVShowPoster2_a69da114-1374-4a54-8a66-bf67c1922b9e.jpg',
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
    url: 'https://m.media-amazon.com/images/I/81EBp0vOZZL._AC_SY879_.jpg',
    alt: 'poster',
  },
  {
    id: 7,
    url: 'https://m.media-amazon.com/images/I/915RviLDi3L._AC_UF894,1000_QL80_.jpg',
    alt: 'poster',
  },
];

export const genres = [
  {
    id: 1,
    title: 'Action',
  },
  {
    id: 2,
    title: 'Adventures',
  },
  {
    id: 3,
    title: 'Anime',
  },
  {
    id: 4,
    title: 'Biopic',
  },
  {
    id: 5,
    title: 'Comedy',
  },
  {
    id: 6,
    title: 'Crime film',
  },
  {
    id: 7,
    title: 'Documentary',
  },
  {
    id: 8,
    title: 'Drama',
  },
  {
    id: 9,
    title: 'Fantasy',
  },
  {
    id: 10,
    title: 'Historic',
  },
  {
    id: 11,
    title: 'Horror',
  },
  {
    id: 12,
    title: 'Melodrama',
  },
  {
    id: 13,
    title: 'Music',
  },
  {
    id: 14,
    title: 'Peplum',
  },
  {
    id: 15,
    title: 'Science fiction',
  },
  {
    id: 16,
    title: 'Serial',
  },
  {
    id: 17,
    title: 'Sequel',
  },
  {
    id: 18,
    title: 'Thriller',
  },
  {
    id: 19,
    title: 'Western',
  },
];

export const nationalities = [
  { id: 1, title: 'USA', description: 'United States of America' },
  { id: 2, title: 'GB', description: 'Great Britain' },
  { id: 3, title: 'UA', description: 'Ukraine' },
  { id: 4, title: 'DE', description: 'Deutschland' },
  { id: 5, title: 'FR', description: 'France' },
  { id: 6, title: 'AUS', description: 'Australia' },
  { id: 7, title: 'BEL', description: 'Belgium' },
  { id: 8, title: 'BRA', description: 'Brazil' },
  { id: 9, title: 'GE', description: 'Georgia' },
  { id: 10, title: 'DK', description: 'Denmark' },
  { id: 11, title: 'IL', description: 'Israel' },
  { id: 12, title: 'IN', description: 'India' },
  { id: 13, title: 'IE', description: 'Ireland' },
  { id: 14, title: 'IT', description: 'Italy' },
  { id: 15, title: 'CA', description: 'Canada' },
  { id: 16, title: 'CN', description: 'China' },
  { id: 17, title: 'KR', description: 'Korea' },
  { id: 18, title: 'LV', description: 'Latvia' },
  { id: 19, title: 'LT', description: 'Lithuania' },
  { id: 20, title: 'NL', description: 'Netherlands' },
  { id: 21, title: 'NO', description: 'Norway' },
  { id: 22, title: 'PL', description: 'Poland' },
  { id: 23, title: 'PT', description: 'Portugal' },
  { id: 24, title: 'TR', description: 'Turkey' },
  { id: 25, title: 'FI', description: 'Finland' },
  { id: 26, title: 'CZ', description: 'Czech Republic' },
  { id: 27, title: 'CH', description: 'Switzerland' },
  { id: 28, title: 'EE', description: 'Estonia' },
  { id: 29, title: 'JP', description: 'Japan' },
  { id: 30, title: 'NZ', description: 'New Zealand' },
  { id: 31, title: 'PUR', description: 'Puerto Rico' },
  { id: 32, title: 'MLT', description: 'Malta' },
  { id: 33, title: 'BEN', description: 'Benin' },
  { id: 34, title: 'SWE', description: 'Sweden' },
  { id: 35, title: 'FIN', description: 'Finland' },
  { id: 36, title: 'RU', description: 'Russian' },
  { id: 37, title: 'ISL', description: 'Iceland' },
  { id: 38, title: 'AU', description: 'Austria' },
];

export const locations = [
  {
    id: 1,
    title: 'San Francisco',
  },
  {
    id: 2,
    title: 'Los Angeles',
  },
  {
    id: 3,
    title: 'Culver City',
  },
  {
    id: 4,
    title: 'Universal City',
  },
  {
    id: 5,
    title: 'London',
  },
  {
    id: 6,
    title: 'Burbank',
  },
  {
    id: 7,
    title: 'Toronto',
  },
  {
    id: 8,
    title: 'California',
  },
];

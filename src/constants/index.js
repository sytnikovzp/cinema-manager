export const BASE_URL = 'http://localhost:5000';
// export const BASE_URL = 'https://sytnikov.site:5000';

export const ACTORS_SLICE_NAME = 'actors';
export const DIRECTORS_SLICE_NAME = 'directors';
export const MOVIES_SLICE_NAME = 'movies';
export const STUDIOS_SLICE_NAME = 'studios';

export const emptyActor = {
  id: null,
  full_name: '',
  nationality: '',
  birth_date: '',
  death_date: '',
  photo: '',
  biography: '',
};

export const emptyDirector = {
  id: null,
  full_name: '',
  nationality: '',
  birth_date: '',
  death_date: '',
  photo: '',
  biography: '',
};

export const emptyMovie = {
  id: null,
  title: '',
  genre: '',
  release_year: '',
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
  foundation_year: '',
  logo: '',
  about: '',
};

export const genres = [
  {
    id: 1,
    title: 'Action',
  },
  {
    id: 2,
    title: 'Adventure',
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
  { id: 2, title: 'GB', description: 'Great Britain (England)' },
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
  { id: 35, title: 'RU', description: 'Russian' },
  { id: 36, title: 'ISL', description: 'Iceland' },
  { id: 37, title: 'AU', description: 'Austria' },
  { id: 38, title: 'ES', description: 'Spain' },
  { id: 39, title: 'MX', description: 'Mexico' },
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
  {
    id: 9,
    title: 'New York',
  },
  {
    id: 10,
    title: 'Sydney',
  },
  {
    id: 11,
    title: 'Paris',
  },
  {
    id: 12,
    title: 'Munchen',
  },
];

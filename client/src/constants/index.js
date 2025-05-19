export const BASE_URL = 'http://localhost:5000/api';

export const ACTORS_SLICE_NAME = 'actors';
export const DIRECTORS_SLICE_NAME = 'directors';
export const MOVIES_SLICE_NAME = 'movies';
export const STUDIOS_SLICE_NAME = 'studios';
export const SERVICES_SLICE_NAME = 'services';
export const GENRES_SLICE_NAME = 'genres';
export const COUNTRIES_SLICE_NAME = 'countries';
export const LOCATIONS_SLICE_NAME = 'locations';

export const emptyActor = {
  uuid: null,
  fullName: '',
  country: '',
  birthDate: '',
  deathDate: '',
  photo: '',
  biography: '',
};

export const emptyDirector = {
  uuid: null,
  fullName: '',
  country: '',
  birthDate: '',
  deathDate: '',
  photo: '',
  biography: '',
};

export const emptyMovie = {
  uuid: null,
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
  uuid: null,
  title: '',
  location: '',
  foundationYear: '',
  logo: '',
  about: '',
};

export const emptyGenre = {
  uuid: null,
  title: '',
  logo: '',
};

export const emptyCountry = {
  uuid: null,
  title: '',
  flag: '',
};

export const emptyLocation = {
  uuid: null,
  title: '',
  country: '',
  coatOfArms: '',
};

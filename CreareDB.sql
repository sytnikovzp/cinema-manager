DROP TABLE IF EXISTS genres CASCADE;
CREATE TABLE genres(
  genre_id SERIAL,
  title VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY(genre_id)
);

DROP TABLE IF EXISTS countries CASCADE;
CREATE TABLE countries(
  country_id SERIAL,
  title VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY(country_id)
);

DROP TABLE IF EXISTS locations CASCADE;
CREATE TABLE locations(
  location_id SERIAL,
  title VARCHAR(100) NOT NULL UNIQUE,
  country_id INT,
  PRIMARY KEY(location_id),
  CONSTRAINT f_key_locations FOREIGN KEY (country_id) REFERENCES countries(country_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS actors CASCADE;
CREATE TABLE actors(
  actor_id SERIAL,
  full_name VARCHAR(100) NOT NULL UNIQUE,
  country_id INT,
  birth_date DATE,
  death_date DATE,
  photo TEXT,
  biography TEXT,
  PRIMARY KEY(actor_id),
  CONSTRAINT f_key_actors FOREIGN KEY (country_id) REFERENCES countries(country_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS directors CASCADE;
CREATE TABLE directors(
  director_id SERIAL,
  full_name VARCHAR(100) NOT NULL UNIQUE,
  country_id INT,
  birth_date DATE,
  death_date DATE,
  photo TEXT,
  biography TEXT,
  PRIMARY KEY(director_id),
  CONSTRAINT f_key_directors FOREIGN KEY (country_id) REFERENCES countries(country_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS studios CASCADE;
CREATE TABLE studios(
  studio_id SERIAL,
  title VARCHAR(100) NOT NULL UNIQUE,
  location_id INT,
  foundation_year DATE,
  logo TEXT,
  about TEXT,
  PRIMARY KEY(studio_id),
  CONSTRAINT f_key_studios FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS movies CASCADE;
CREATE TABLE movies(
  movie_id SERIAL,
  title VARCHAR(100) NOT NULL UNIQUE,
  genre_id INT,
  release_year DATE,
  poster TEXT,
  trailer TEXT,
  PRIMARY KEY(movie_id),
  CONSTRAINT f_key_movies FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS movies_actors CASCADE;
CREATE TABLE movies_actors(
  movie_id INT,
  actor_id INT,
  CONSTRAINT f_key_movies_actors FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT f_key_actors_movies FOREIGN KEY (actor_id) REFERENCES actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS movies_directors CASCADE;
CREATE TABLE movies_directors(
  movie_id INT,
  director_id INT,
  CONSTRAINT f_key_movies_directors FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT f_key_directors_movies FOREIGN KEY (director_id) REFERENCES directors(director_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS movies_studios CASCADE;
CREATE TABLE movies_studios(
  movie_id INT,
  studio_id INT,
  CONSTRAINT f_key_movies_studios FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT f_key_studios_movies FOREIGN KEY (studio_id) REFERENCES studios(studio_id) ON DELETE CASCADE ON UPDATE CASCADE
);
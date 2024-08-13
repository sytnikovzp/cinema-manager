![Cinema Manager Logo](./screenshots/logo.png)

![Last Commit](https://img.shields.io/github/last-commit/sytnikovzp/Cinema-manager-client)

## Project Description

CINEMA MANAGER client is a project that implements the ability to store and organize information about movies, actors, directors, and studios. It allows users to store and view information about actors and directors, as well as view movie plots and trailers.

## Usage Examples

<details>
  <summary>Here are some screenshots of the project, click to expand:</summary>
  
  
![Home page](./screenshots/1.jpg)

![Home page (white theme)](./screenshots/2.jpg)

![Actor list](./screenshots/3.jpg)

![Actor item](./screenshots/4.jpg)

![Movie list](./screenshots/5.jpg)

![Movie item](./screenshots/6.jpg)

![Movie form (stepper)](./screenshots/7.jpg)

![Movie form (fieldArray & autocomplete)](./screenshots/8.jpg)

![Movie form (fieldArray & autocomplete)](./screenshots/9.jpg)

![Movie form (movie storyline)](./screenshots/10.jpg)

![Actor form (datepicker)](./screenshots/11.jpg)

![Director form (datepicker)](./screenshots/12.jpg)

![Service entities list (with Tabs)](./screenshots/13.jpg)

![Service entities list (with Tabs)](./screenshots/14.jpg)

![Adaptivity (mobile view)](./screenshots/15.jpg)

![Adaptivity (tablet view)](./screenshots/16.jpg)

</details>

## Key Features and Highlights

- **Main Entities**:

  - **Actors**: Information about actors
  - **Directors**: Information about directors
  - **Movies**: Information about movies
  - **Studios**: Information about studios

- **Secondary Entities**:

  - **Genres**: Movie genres
  - **Countries**: Countries
  - **Locations**: Locations

- Full CRUD functionality for all entities.
- Utilizes `fieldArray` from Formik, `Autocomplete` and `Stepper` components from MUI for forms.
- Pagination implemented in entity list components.
- `Tabs` component from MUI for displaying entity items.
- Basic responsiveness implemented.
- Uses Vite 5.4.0 as the build tool.

## Technologies and Libraries

- **Material UI 5**: For styling and components.
- **Formik**: For form state management.
- **Yup**: For form validation.
- **Axios**: For server requests.
- **react-router-dom 6**: For navigation.
- **react-material-ui-carousel**: For the movie poster carousel.
- **react-player**: For displaying movie trailers.
- **@reduxjs/toolkit 2**: For application state management (currently disabled).

## System Requirements

- **Git**: 2.46
- **NodeJS**: v18.20
- **NPM**: 10.8

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:sytnikovzp/Cinema-manager-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Cinema-manager-client
   ```
3. Install dependencies:
   ```bash
   npm i
   ```
4. Start the project:
   ```bash
   npm start
   ```

## Server-Side Links

- [CINEMA MANAGER server (with Express & Sequelize)](https://github.com/sytnikovzp/Cinema-manager-server)
- [CINEMA MANAGER server (with Express & Json-Server)](https://github.com/sytnikovzp/Cinema-manager-json-server)

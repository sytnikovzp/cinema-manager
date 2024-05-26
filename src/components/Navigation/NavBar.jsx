import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li>
        <Link to=''>Home</Link>
      </li>
      <li>
        <Link to='/movies'>Movies</Link>
      </li>
      <li>
        <Link to='/actors'>Actors</Link>
      </li>
      <li>
        <Link to='/directors'>Directors</Link>
      </li>
      <li>
        <Link to='/studios'>Studios</Link>
      </li>
    </ul>
  );
}

export default NavBar;

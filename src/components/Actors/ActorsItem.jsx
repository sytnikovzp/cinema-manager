import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getActorById } from '../../store/slices/actorsSlice';

function ActorsItem({ id }) {
  console.log(id);

  return <div>{`${fullName}, ${nationality}`}</div>;
}

export default ActorsItem;

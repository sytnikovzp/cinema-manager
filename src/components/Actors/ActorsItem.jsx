import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getActorById } from '../../store/slices/actorsSlice';

function ActorsItem() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const actors = useSelector((state) => state.actorsList.actors);

  const { fullName, birthYear, nationality, image } = actors.find(
    (actor) => actor.id === Number(id)
  );

  console.log(fullName, birthYear, nationality, image);

  useEffect(() => {
    dispatch(getActorById(id));
  }, [dispatch, id]);

  return (
    <ul className='actors-container'>
      <p>
        {fullName}, {birthYear} ,{nationality}, {image}{' '}
      </p>
    </ul>
  );
}

export default ActorsItem;

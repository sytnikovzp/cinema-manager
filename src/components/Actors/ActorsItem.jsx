import { useDispatch } from 'react-redux';
// ===================================
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { styled } from '@mui/system';

// ===================================
import { selectActor, deleteActor } from '../../store/slices/actorsSlice';
import { actorItemStyle } from '../../services/styleService';

function ActorsItem({ actor }) {
  const dispatch = useDispatch();

  const { id, fullName, nationality, image } = actor;

  const onActorEdit = () => {
    dispatch(selectActor(actor));
  };

  const onItemDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteActor(id));
  };

  const StyledAvatar = styled(Avatar)({
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    img: {
      objectPosition: 'center top',
    },
  });

  return (
    <Grid item xs={12}>
      <ListItem
        disablePadding
        onClick={onActorEdit}
        style={actorItemStyle}
        secondaryAction={
          <IconButton edge='end' aria-label='delete' onClick={onItemDelete}>
            <HighlightOffIcon />
          </IconButton>
        }
      >
        <ListItemButton>
          <ListItemAvatar>
            <StyledAvatar src={image} />
          </ListItemAvatar>
          <ListItemText primary={`${fullName}, ${nationality}`} />
        </ListItemButton>
      </ListItem>
    </Grid>
  );
}

export default ActorsItem;

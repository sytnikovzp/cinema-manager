import { useDispatch } from 'react-redux';
// =============================================
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
// =============================================
import { Link } from 'react-router-dom';
// =============================================
import { selectStudio, deleteStudio } from '../../store/slices/studiosSlice';
import { itemListStyle } from '../../services/styleService';
import { Stack } from '@mui/material';

function StudiosList({ studios, currentStudio }) {
  const dispatch = useDispatch();

  const onStudioEdit = (event) => {
    event.stopPropagation();
    dispatch(selectStudio(currentStudio)); // !!!
  };

  const { id } = currentStudio;

  const onItemDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteStudio(id));
  };

  const StyledAvatar = styled(Avatar)({
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    img: {
      objectPosition: 'center top',
    },
  });

  return (
    <>
      <Typography
        variant='h4'
        component='h2'
        sx={{ marginTop: -7, textAlign: 'left' }}
      >
        Studios list
      </Typography>

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={1}>
          {studios.map((studio) => (
            <>
              <Grid item xs={12}>
                <ListItem
                  key={studio.id}
                  component={Link}
                  to={`/studios/${studio.id}`}
                  disablePadding
                  sx={itemListStyle}
                  secondaryAction={
                    <Stack direction='row' spacing={1}>
                      <IconButton
                        edge='end'
                        aria-label='edit'
                        component={Link}
                        to={`/studios/${studio.id}`}
                        onClick={onStudioEdit}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={onItemDelete}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <StyledAvatar src={studio.logo} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${studio.title}, ${studio.location}`}
                    />
                  </ListItemButton>
                </ListItem>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default StudiosList;

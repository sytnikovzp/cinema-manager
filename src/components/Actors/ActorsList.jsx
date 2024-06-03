import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// =============================================
import ActorsItem from './ActorsItem';

function ActorsList({ actors }) {
  return (
    <>
      <Typography
        variant='h4'
        component='h2'
        sx={{ marginTop: -7, textAlign: 'left' }}
      >
        Actors list
      </Typography>

      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={1}>
          {actors.map((actor) => (
            <ActorsItem key={actor.id} actor={actor} />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default ActorsList;

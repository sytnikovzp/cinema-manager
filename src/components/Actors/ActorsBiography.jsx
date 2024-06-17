import { Box, Card, CardMedia, Typography } from '@mui/material';
import {
  itemComponentBoxMainStyle,
  itemComponentBoxSecondaryStyle,
  itemInformationBoxStyle,
  scrollListBoxStyle,
} from '../../services/styleService';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { emptyActor } from '../../constants';
// =============================================

function ActorsBiography() {
  const actors = useSelector((state) => state.actorsList.actors);

  const { id } = useParams();

  const actor = actors.find((actor) => Number(actor.id) === Number(id));

  const currentActor = actor ? actor : emptyActor;

  return (
    <Box sx={scrollListBoxStyle}>
      <Box sx={itemComponentBoxMainStyle}>
        <Box sx={itemComponentBoxSecondaryStyle}>
          <Card>
            <CardMedia
              component='img'
              height='100%'
              image={
                currentActor.image
                  ? currentActor.image
                  : 'https://excelautomationinc.com/wp-content/uploads/2021/07/No-Photo-Available.jpg'
              }
              alt={currentActor.fullName}
            />
          </Card>
        </Box>
        <Box sx={itemInformationBoxStyle}>
          <Typography variant='h5' component='div'>
            FullName:{' '}
            {currentActor.fullName ? currentActor.fullName : 'Unknown'}
          </Typography>
          <Typography variant='body1' component='div'>
            Birth year:{' '}
            {currentActor.birthYear ? currentActor.birthYear : 'Unknown'}
          </Typography>
          <Typography variant='body1' component='div'>
            Nationality:{' '}
            {currentActor.nationality ? currentActor.nationality : 'Unknown'}
          </Typography>
          <Typography variant='body1' component='div' sx={{ marginTop: 2 }}>
            {currentActor.biography ? currentActor.biography : 'Unknown'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ActorsBiography;

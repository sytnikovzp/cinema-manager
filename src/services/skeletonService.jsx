import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// =============================================
import {
  itemComponentBoxMainStyle,
  itemCardMediaBoxStyle,
  itemInformationBoxStyle,
  itemListStyle,
  skeletonHomePageStyles,
} from '../services/styleService';

export const renderHomePageSkeleton = () => (
  <Box>
    <Skeleton
      variant='rectangular'
      animation='wave'
      sx={skeletonHomePageStyles}
    />
  </Box>
);

export const renderItemSkeleton = () => (
  <Box sx={itemComponentBoxMainStyle}>
    <Box sx={itemCardMediaBoxStyle}>
      <Card>
        <Skeleton variant='rounded' width='100%' height={350} />
      </Card>
    </Box>
    <Box sx={itemInformationBoxStyle}>
      <Typography variant='h4' component='div' sx={{ fontWeight: 'bold' }}>
        <Skeleton animation='wave' width='80%' />
      </Typography>

      <Typography variant='h5' component='div'>
        <Skeleton animation='wave' width='60%' />
      </Typography>

      <Typography variant='h5' component='div'>
        <Skeleton animation='wave' width='40%' />
      </Typography>

      <Typography variant='h5' component='div'>
        <Skeleton animation='wave' width='70%' />
      </Typography>

      <Typography variant='h5' component='div'>
        <Skeleton animation='wave' width='50%' />
      </Typography>
    </Box>
  </Box>
);

export const renderListSkeleton = () => (
  <Stack direction='column' marginBottom={1}>
    <ListItem disablePadding sx={itemListStyle}>
      <ListItemButton sx={{ borderRadius: 5 }}>
        <ListItemAvatar>
          <Skeleton variant='circular' width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant='text' animation='wave' width='80%' />}
        />
      </ListItemButton>
      <ListItemSecondaryAction>
        <Stack direction='row' spacing={1}>
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='circular' width={40} height={40} />
        </Stack>
      </ListItemSecondaryAction>
    </ListItem>
  </Stack>
);

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { itemListStyle, styleListListItemButton } from '@/src/styles';

function ListSkeleton() {
  return (
    <Stack direction='column' marginBottom={1}>
      <ListItem disablePadding sx={itemListStyle}>
        <ListItemButton sx={styleListListItemButton}>
          <ListItemAvatar>
            <Skeleton height={40} variant='circular' width={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton animation='wave' variant='text' width='80%' />}
          />
        </ListItemButton>
        <ListItemSecondaryAction>
          <Stack direction='row' spacing={1}>
            <Skeleton height={40} variant='circular' width={40} />
            <Skeleton height={40} variant='circular' width={40} />
          </Stack>
        </ListItemSecondaryAction>
      </ListItem>
    </Stack>
  );
}

export default ListSkeleton;

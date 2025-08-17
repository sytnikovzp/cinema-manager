import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import {
  itemCardMediaBoxStyle,
  itemComponentBoxMainStyle,
  itemInformationBoxStyle,
  styleItemTypography,
} from '@/src/styles';

function ItemSkeleton() {
  return (
    <Box sx={itemComponentBoxMainStyle}>
      <Box sx={itemCardMediaBoxStyle}>
        <Card>
          <Skeleton height={350} variant='rounded' width='100%' />
        </Card>
      </Box>
      <Box sx={itemInformationBoxStyle}>
        <Typography component='div' sx={styleItemTypography} variant='h4'>
          <Skeleton animation='wave' width='80%' />
        </Typography>

        <Typography component='div' variant='h5'>
          <Skeleton animation='wave' width='60%' />
        </Typography>

        <Typography component='div' variant='h5'>
          <Skeleton animation='wave' width='40%' />
        </Typography>

        <Typography component='div' variant='h5'>
          <Skeleton animation='wave' width='70%' />
        </Typography>

        <Typography component='div' variant='h5'>
          <Skeleton animation='wave' width='50%' />
        </Typography>
      </Box>
    </Box>
  );
}

export default ItemSkeleton;

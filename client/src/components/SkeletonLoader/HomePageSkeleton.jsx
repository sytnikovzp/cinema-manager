import Skeleton from '@mui/material/Skeleton';

import { skeletonHomePageStyles } from '../../services/styleService';

function HomePageSkeleton() {
  return (
    <Skeleton
      animation='wave'
      sx={skeletonHomePageStyles}
      variant='rectangular'
    />
  );
}

export default HomePageSkeleton;

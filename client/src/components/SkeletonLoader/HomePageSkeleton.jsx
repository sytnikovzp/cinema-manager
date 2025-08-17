import Skeleton from '@mui/material/Skeleton';

import { skeletonHomePageStyles } from '@/src/styles';

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

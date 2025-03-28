import { useMediaQuery } from '@mui/material';

const useItemsPerPage = () => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery((theme) => theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery((theme) => theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  if (isXs) return 3;
  if (isSm) return 4;
  if (isMd) return 5;
  if (isLg) return 6;
  if (isXl) return 8;
  return 5;
};

export default useItemsPerPage;

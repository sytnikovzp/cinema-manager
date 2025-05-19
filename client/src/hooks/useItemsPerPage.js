import useMediaQuery from '@mui/material/useMediaQuery';

function useItemsPerPage() {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const isSm = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery((theme) => theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery((theme) => theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  const breakpoints = [
    { items: 4, match: isXs },
    { items: 4, match: isSm },
    { items: 5, match: isMd },
    { items: 6, match: isLg },
    { items: 9, match: isXl },
  ];

  const matchedBreakpoint = breakpoints.find((bp) => bp.match);
  return matchedBreakpoint ? matchedBreakpoint.items : 5;
}

export default useItemsPerPage;

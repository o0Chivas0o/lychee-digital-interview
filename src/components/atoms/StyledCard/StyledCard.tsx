import { FC } from 'react';
import { Box, BoxProps } from '@mui/system';
import { flex } from '@/styles';

interface StyledCardProps extends BoxProps {

}

export const StyledCard: FC<StyledCardProps> = (props) => {
  const { children } = props;
  return (
    <Box
      sx={{
        padding: {
          md:'40px 40px 24px 40px',
          xs:'30px 20px 18px 20px'
        },
        width: {
          md: '400px',
          xs: '100%',
        },
        height: {
          md: '480px',
          xs: '400px',
        },
        bgcolor: 'rgba(255,255,255,1)',
        borderRadius: '12px',
        boxShadow: '0 0 20px 0 rgba(187,191,196,0.30)',
        ...flex(undefined, 'center'),
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
};

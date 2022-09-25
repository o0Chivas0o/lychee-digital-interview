import { Box } from '@mui/material';
import { Auth } from '@/components/molecules';
import { flex, px2vw } from '@/styles';
import { useBreakpoint } from '@/hook';
import { useEffect, useState } from 'react';

export const Login = () => {
  const breakpoint = useBreakpoint();
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  return (
    <Box
      sx={{
        width: 'max(100vw,375px)',
        height: ['xs', 'sm'].includes(breakpoint) ? height + 'px' : '100vh',
        minHeight: ['xs', 'sm'].includes(breakpoint) ? '100vh -webkit-fill-available' : '640px',
        overflow: 'auto',
        bgcolor: 'rgba(250,247,247,1)',
        display: 'flex',
        flexDirection: {
          md: 'row',
          xs: 'column',
        },
        justifyContent: {
          md: 'center',
          xs: 'space-between',
        },
        alignItems: {
          md: 'center',
          xs: 'flex-start',
        },
      }}
    >
      <Box
        sx={{
          width: {
            md: '560px',
            xs: '100%',
          },
          height: {
            md: '640px',
            xs: '175px',
          },
          order: {
            md: 1,
            xs: 2,
          },
          overflow: 'hidden',
        }}
      >
        <img src='/pc_banner.png' alt='' style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }} />
      </Box>
      <Box
        sx={{
          width: {
            md: '560px',
            sm: '100%',
          },
          ...flex(undefined, 'center'),
          order: {
            md: 2,
            xs: 1,
          },
          padding: {
            md: 0,
            xs: '0 15px',
          },
          flexDirection: {
            md: 'row',
            xs: 'column',
          },
        }}
      >
        {['xs', 'sm'].includes(breakpoint) &&
          <Box
            mb={'48px'}
            fontSize={36}
            color={'#333333'}
            fontWeight={500}
            fontFamily={'PingFangSC-Medium'}
          >
            登录
          </Box>
        }
        <Auth />
      </Box>
    </Box>
  );
};

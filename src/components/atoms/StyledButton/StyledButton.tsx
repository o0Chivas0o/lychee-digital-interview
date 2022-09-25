import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: boolean;
}

export const StyledButton: FC<StyledButtonProps> = (props) => {
  const { loading = false, onClick, loadingText = 'loading', sx, ...rest } = props;
  
  return (
    <Button
      sx={{
        ...sx,
        height: '40px',
        width: '320px',
        bgcolor: 'rgba(51,113,255,1)',
        color: '#ffffff',
        borderRadius: '6px',
        '&:hover': {
          bgcolor: 'rgba(51,113,255,.7)',
        },
        '&.Mui-disabled': {
          bgcolor: 'rgba(187,191,196,1)',
          color: '#ffffff',
        },
      }}
      {...rest}
      onClick={(e) => {
        if (!loading && onClick) {
          onClick(e);
        } else {
          e.stopPropagation();
        }
      }}>
      <>{loading ? loadingText : props.children}</>
    </Button>
  );
};

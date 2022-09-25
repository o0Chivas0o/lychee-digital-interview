import { FC } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { Box } from '@mui/system';

export interface StyledIconTextFiledProps extends Omit<OutlinedTextFieldProps, 'error'> {
  icon: string;
  error?: string[];
}

export const StyledIconTextFiled: FC<StyledIconTextFiledProps> = (props) => {
  const {
    icon,
    error,
    value = '',
    sx,
    onChange,
    variant,
    ...rest
  } = props;
  return (
    <TextField
      variant={variant}
      value={value}
      onChange={onChange}
      size={'small'}
      error={!!(error?.length && error[0])}
      helperText={
        error?.length ? error[0] : undefined
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <img
              src={icon}
              alt=''
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain',
              }}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        ...sx,
        width: '320px',
        '& .MuiOutlinedInput-root': {
          '& input': {
            fontSize: '16px',
            color: '#3B3C3D',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'rgba(51,113,255,1)',
            borderWidth: '1px',
          },
        },
        '& .MuiFormHelperText-root': {
          margin: 0,
          mt: '8px',
          fontSize: '12px',
          fontFamily: 'PingFangSC-Regular;',
          color: '#FB797A',
          fontWeight: 400,
          letterSpacing: 0,
        },
      }
      }
      {...rest}
    />
  );
};

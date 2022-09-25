import { useState, useCallback, useEffect, FC } from 'react';
import { Box } from '@mui/material';
import { StyledCard, StyledIconTextFiled, StyledButton, StyledIconTextFiledProps } from '@/components/atoms';
import { LoginSchema } from '@/common/schema/login';
import validate from 'validate.js';
import { _fetchData } from '@/utils/fetch';

interface LoginErrorMap {
  username: string[] | undefined;
  password: string[] | undefined;
}

const checkIsValid: (loanData) => {
  isValid: boolean;
  errors;
} = (loanData) => {
  const errors = {};
  for (const [key, value] of Object.entries(loanData)) {
    Object.assign(
      errors,
      validate({ [key]: value }, { [key]: LoginSchema[key] }),
    );
  }
  return { errors, isValid: Object.keys(errors).length === 0 };
};

export const Auth: FC = () => {
  
  const [username, serUserName] = useState<User.LoginParma['username']>();
  const [password, serPassword] = useState<User.LoginParma['password']>();
  const [verifyCode, setVerifyCode] = useState<User.LoginParma['verifyCode']>();
  const [verifyError, setVerifyError] = useState<string>('');
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [error, setError] = useState<LoginErrorMap>({
    username: undefined,
    password: undefined,
  });
  const onUsernameChange: StyledIconTextFiledProps['onChange'] = useCallback((e) => {
    serUserName(e.target.value);
    if (error.username) {
      setError({
        ...error,
        username: undefined,
      });
    }
  }, [error]);
  
  const onPasswordChange: StyledIconTextFiledProps['onChange'] = useCallback((e) => {
    if (error.password) {
      setError({
        ...error,
        password: undefined,
      });
    }
    serPassword(e.target.value);
  }, [error]);
  
  const onVerifyCodeChange: StyledIconTextFiledProps['onChange'] = useCallback((e) => {
    setVerifyCode(e.target.value);
    if (verifyError) {
      setVerifyError('');
    }
  }, [verifyError]);
  
  useEffect(() => {
    const token = localStorage.getItem('LOGIN_SUCCESS_TOKEN');
    if (token) {
      setNextStep(true);
    }
  }, []);
  
  const onClickToLogin = async () => {
    const { isValid, errors } = checkIsValid({ username, password });
    if (!isValid) {
      setError(errors);
      return;
    }
    setLoginError('');
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    const res = await _fetchData('phase=1', formData);
    if (res.status !== 0) {
      setLoginError(res.message);
      return;
    }
    const { token } = res.data;
    localStorage.setItem('LOGIN_SUCCESS_TOKEN', token);
    setNextStep(true);
  };
  
  const onClickToConfirm = async () => {
    const token = localStorage.getItem('LOGIN_SUCCESS_TOKEN');
    const bearer = `Bearer ${token}`;
    const formData = new FormData();
    formData.set('tfa', verifyCode);
    const headers = new Headers({
      'Authorization': bearer,
      'Content-Type': 'multipart/form-data',
    });
    const res = await _fetchData(
      'phase=2',
      formData,
      headers,
    );
    if (res.status !== 0) {
      setVerifyError(res.message || 'network error');
      return;
    }
    localStorage.clear();
    window.location.href = 'https://www.lizhi.io';
  };
  return (
    <StyledCard>
      <Box
        sx={{
          fontFamily: 'PingFangSC-Medium',
          fontSize: '28px',
          color: '#333333',
          letterSpacing: 0,
          fontWeight: 500,
          width: '100%',
        }}>
        DIGITALYCHEE
      </Box>
      {
        !nextStep ?
          (<>
              <StyledIconTextFiled
                placeholder={'请输入账户'}
                icon={'/pc_email.png'}
                value={username}
                onChange={onUsernameChange}
                variant={'outlined'}
                error={error.username}
                sx={{
                  mt: '28px',
                }}
              />
              <StyledIconTextFiled
                placeholder={'请输入密码'}
                icon={'/pc_password.png'}
                value={password}
                onChange={onPasswordChange}
                variant={'outlined'}
                type={'password'}
                error={error.password}
                inputProps={{
                  minLength: 8,
                  maxLength: 32,
                }}
                sx={{
                  mt: '20px',
                }}
              />
              <StyledButton
                sx={{
                  mt: '20px',
                }}
                onClick={onClickToLogin}
                disabled={!username || !password}
              >
                下一步
              </StyledButton>
              {
                loginError && <Box
                  sx={{
                    mt: '24px',
                    fontSize: '14px',
                    color: '#FC6161',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {loginError}
                </Box>
              }
              <Box sx={{
                mt: 'auto',
                pt: '24px',
                width: '100%',
                borderTop: '1px solid #D0D3D6',
                color: '#3371FF',
                fontSize: '14px',
                fontFamily: 'PingFang-SC-Regular',
                letterSpacing: 0,
                cursor: 'default',
                textAlign: 'center',
              }}>
                其他方式登录
              </Box>
            </>
          ) : (
            <>
              <img src='/pc_tx.png' alt='' style={{
                width: '72px',
                height: '72px',
                marginBlockStart: '32px',
              }} />
              <StyledIconTextFiled
                icon={'/pc_password.png'}
                placeholder={'请输入你的两步认证验证码'}
                value={verifyCode}
                onChange={onVerifyCodeChange}
                variant={'outlined'}
                type={'password'}
                error={error.password}
                inputProps={{
                  minLength: 8,
                  maxLength: 32,
                }}
                sx={{
                  mt: '20px',
                }}
              />
              <StyledButton
                sx={{
                  mt: '20px',
                }}
                disabled={!verifyCode}
                onClick={onClickToConfirm}
              >
                确定
              </StyledButton>
              {
                verifyError && <Box
                  sx={{
                    mt: '24px',
                    fontSize: '14px',
                    color: '#FC6161',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {verifyError}
                </Box>
              }
            </>
          )
      }
    </StyledCard>
  );
};

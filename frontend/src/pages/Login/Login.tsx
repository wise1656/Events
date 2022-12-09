import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useSendCodeMutation } from 'redux/ApiQuery';
import { AuthService } from 'services/Auth.service';

export function Login() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [sendCodeRequest, {isLoading: isCodeLoading}] = useSendCodeMutation();
    const [loginRequest, {isLoading: isLoginLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const sendCode = async () => {
        await sendCodeRequest(email).unwrap();
        setEmailSent(true);
    };

    const login = async () => {
        const token = await loginRequest({code, email}).unwrap();
        AuthService.getInstance().setAuthData(token, email);
        navigate('/');
    }

    return (
        <Stack>
            <Typography variant='h5'>Вход в систему</Typography>
            <Typography variant='subtitle1' sx={{ mt: 3 }}>
                Для входа или регистрации введите емейл
            </Typography>
            <Stack direction='row' alignItems='baseline'>
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='Email'
                    variant='standard'
                    disabled={emailSent}
                    sx={{ mr: 2, width: '300px' }}
                    autoFocus
                    onKeyDown={(e) => e.key == 'Enter' && sendCode()}
                />
                <Button variant='text' disabled={emailSent} onClick={sendCode}>
                    {isCodeLoading  ? <CircularProgress size="25px" /> : 'Отправить'}
                </Button>
            </Stack>
            {emailSent && (
                <>
                    <Typography
                        variant='caption'
                        sx={{
                            color: '#1976d2',
                            fontWeight: 'bold',
                            width: 'fit-content',
                            px: 1,
                            cursor: 'pointer',
                        }}
                        onClick={() =>  setEmailSent(false)}
                    >
                        Изменить email
                    </Typography>
                    <Typography variant='subtitle1' sx={{ mt: 3 }}>
                        По указанному емейлу был отправлен код
                    </Typography>
                    <Stack direction='row' alignItems='baseline'>
                        <TextField
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            label='Код'
                            variant='standard'
                            sx={{ mr: 2, width: '300px' }}
                            onKeyDown={(e) => e.key == 'Enter' && login()}
                        />
                        <Button variant='text' onClick={login}>
                            {isLoginLoading ? <CircularProgress size="25px" /> : 'Вход'}
                        </Button>
                    </Stack>
                </>
            )}
        </Stack>
    );
}

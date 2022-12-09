import { Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from 'services/Auth.service';

export function LoginButton() {
    const authorizedEmail = AuthService.getInstance().getEmail();
    const navigate = useNavigate();

    const logout = () => {
        AuthService.getInstance().logout();
        navigate('/');
    };

    return (
        <Box sx={{ position: 'fixed', bottom: '60px' }}>
            {authorizedEmail ? (
                <>
                    Вы вошли как <b>{authorizedEmail}</b>{' '}
                    <MuiLink onClick={logout} sx={{ cursor: "pointer" }}>Выйти</MuiLink>
                </>
            ) : (
                <Link to={'/login'}>Вход в систему</Link>
            )}
        </Box>
    );
}

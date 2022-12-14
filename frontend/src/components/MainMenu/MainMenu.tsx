import { BottomNavigation, BottomNavigationAction, styled, Paper, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutesData } from 'components/Routes/routes';
import { useScreenWidthLessThen } from 'helpers/useScreenSize';

const MenuContainer = styled(Paper)({
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#e2f0ff',
});

const BottomMenu = styled(BottomNavigation)({
    background: 'transparent',
    width: '100%',
    maxWidth: '600px',
});

const BottomMenuItem = styled(BottomNavigationAction)({
    paddingLeft: 'unset',
    paddingRight: 'unset',
    minWidth: 'unset',
});

export function MainMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const isSmallScreen = useScreenWidthLessThen(400);

    return (
        <>
            {/* это для того чтобы контент не застревал под меню */}
            <Box sx={{ height: '56px', mt: 3 }} /> 
            <MenuContainer>
                <BottomMenu
                    value={RoutesData.findIndex((r) => location.pathname.startsWith(r.url))}
                    onChange={(_e, val) => navigate(RoutesData[val]?.url)}
                    showLabels={!isSmallScreen}
                >
                    {RoutesData.map((route) => (
                        <BottomMenuItem
                            key={route.url}
                            label={route.menuTitle}
                            icon={route.menuIcon}
                            disabled={route.isDisabled?.()}
                            sx={{color: route.isDisabled?.() ? '#8080807d' : ''}}
                        />
                    ))}
                </BottomMenu>
            </MenuContainer>
        </>
    );
}

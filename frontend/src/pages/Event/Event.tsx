import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RegistrationForm } from './RegistrationForm';
import { selectEvent } from 'redux/ApiQuery';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/Button/Button';
import { useAppDispatch } from 'redux/store';
import { selectCurrentEventId, setCurrentEvent } from 'redux/UiSlice';
import { LongDateFormat, TimeFormat, WeekdayFormat } from 'helpers/DateFormat';
import { selectIsSubscribed } from 'redux/subscriptions.slice';
import { SubscribedTextColor } from 'helpers/Constants';
import { AuthService } from 'services/Auth.service';
import { EditIconButton } from 'components/EditIconButton';

export function Event() {
    const event = useGetCurrentEvent();
    const [showRegistration, setShowRegistration] = useState(false);
    const isSubscribed = useSelector(selectIsSubscribed(event?._id));
    const navigate = useNavigate();
    const isAdmin = AuthService.getInstance().isAdmin();

    if (!event) return null;

    return (
        <Stack spacing={2}>
            <Box>
                <Stack direction='row' alignItems='center' sx={{ mb: 1 }}>
                    <Typography variant='h4'>{event.title}</Typography>
                    {isAdmin && (
                        <EditIconButton onClick={() => navigate(`/eventedit/${event._id}`)}/>
                    )}
                </Stack>
                <Typography variant='body2'>
                    Начало {LongDateFormat(event.startDate)} ({WeekdayFormat(event.startDate)}) в{' '}
                    {TimeFormat(event.startDate)}
                </Typography>
                {event.endDate && (
                    <Typography variant='body2'>
                        Окончание {LongDateFormat(event.endDate)} ({WeekdayFormat(event.endDate)}) в{' '}
                        {TimeFormat(event.endDate)}
                    </Typography>
                )}
            </Box>
            <Typography variant='body1'>{event.description}</Typography>
            <Stack direction='row'>
                {isSubscribed ? (
                    <Typography color={SubscribedTextColor}>Вы записаны как участник</Typography>
                ) : (
                    <MainButton onClick={() => setShowRegistration(true)}>
                        Буду участвовать
                    </MainButton>
                )}
            </Stack>
            {showRegistration && (
                <RegistrationForm
                    fields={event.registrationInfo}
                    eventId={event._id}
                    onClose={() => setShowRegistration(false)}
                />
            )}
        </Stack>
    );
}

// загружает эвент по урлу или последний открытый эвент
function useGetCurrentEvent() {
    const eventId = useLocation().pathname.split('/')[2];
    const storedEventId = useSelector(selectCurrentEventId);
    const event = useSelector(selectEvent(eventId));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (eventId) dispatch(setCurrentEvent(eventId));
        else navigate(storedEventId ? `/event/${storedEventId}` : '/eventlist');
    }, [eventId]);

    return event;
}

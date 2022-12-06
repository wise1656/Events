import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RegistrationForm } from './RegistrationForm';
import { selectEvent } from 'redux/ApiQuery';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '../../components/Button/Button';
import { useAppDispatch } from 'redux/store';
import { selectCurrentEventId, setCurrentEvent } from 'redux/UiSlice';
import { LongDateFormat, TimeFormat, WeekdayFormat } from 'helpers/DateFormat';

export function Event() {
    const event = useGetCurrentEvent();
    const [showRegistration, setShowRegistration] = useState(false);
    
    if (!event) return null;

    return (
        <Stack spacing={1}>
            <h1>{event.title}</h1>
            <Box>{event.description}</Box>
            <Box>Начало {LongDateFormat(event.startDate)} ({WeekdayFormat(event.startDate)}) в {TimeFormat(event.startDate)}</Box>
            <Stack direction='row'>
                <MainButton onClick={() => setShowRegistration(true)}>Буду участвовать</MainButton>
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
            if (event)
                dispatch(setCurrentEvent(eventId));    
            else    
                navigate(storedEventId ? `/event/${storedEventId}` : '/eventlist');
        }, [event, eventId])
    
        return event;
    }
        
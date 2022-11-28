import { useState } from 'react';
import { Box, Button, FormControl, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEvent } from 'redux/events.slice';
import { RegistrationForm } from './RegistrationForm';

export function Event() {
    const eventId = window.location.pathname.split('/').at(-1);
    const event = useSelector(selectEvent(eventId));
    const [showRegistration, setShowRegistration] = useState(false);

    if (!event) return null;

    return (
        <Stack spacing={1}>
            <h1>{event.title}</h1>
            <Box>{event.description}</Box>
            <Box>Начало в {event.startDate}</Box>
            <Stack direction='row'>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => setShowRegistration(true)}
                >
                    Буду участвовать
                </Button>
            </Stack>
            {showRegistration && (
                <RegistrationForm
                    info={event.registrationInfo}
                    onClose={() => setShowRegistration(false)}
                />
            )}
        </Stack>
    );
}

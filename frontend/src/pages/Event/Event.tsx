import { useState } from 'react';
import { Box, Button, FormControlLabel, Paper, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectEvent } from 'redux/events.slice';
import { RegistrationField } from 'shared/event';
import { CheckboxElement, FormContainer, TextFieldElement } from 'react-hook-form-mui';

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
            <Box>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => setShowRegistration(true)}
                >
                    Буду участвовать
                </Button>
            </Box>
            {showRegistration && <RegistrationForm info={event.registrationInfo} />}
        </Stack>
    );
}

function RegistrationForm({ info }: { info: RegistrationField[] }) {
    return (
        <FormContainer  onSuccess={(data) => { console.log(data) }}>
            <Paper sx={{ padding: 1 }} elevation={3}>
                <Stack spacing={1}>
                    {info.map((field) => {
                        if (field.type == 'text')
                            return (
                                <TextFieldElement
                                    id={field.id}
                                    name={field.name}
                                    label={field.name}
                                    variant='standard'
                                    size='small'
                                />
                            );
                        if (field.type == 'checkbox')
                            return (
                                <FormControlLabel
                                    control={<CheckboxElement name={field.name} id={field.id} />}
                                    label={field.name}
                                />
                            );
                    })}
                    <Button type="submit">Ок</Button>
                </Stack>
            </Paper>
        </FormContainer>
    );
}

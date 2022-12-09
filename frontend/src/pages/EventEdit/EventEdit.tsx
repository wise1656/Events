import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MainButton, SecondaryButton } from 'components/Button/Button';
import { ButtonsContainer } from 'components/Button/ButtonsContainer';
import { useEffect, memo, Suspense, useState, useContext, createContext, useRef } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectEvent } from 'redux/ApiQuery';
import { EventC } from 'shared/event';
import { AnswerFieldSettings } from './AnswerFieldSettings';
import { convertToEditing, convertFromEditing, EventCEditing } from './TypeConverters';

export function EventEdit() {
    const { id } = useParams();
    const event = useSelector(selectEvent(id));
    if (!event) return null; // ждем пока данные загрузятся
    return <EventEditInner id={id} event={event}/>;
}

export function EventEditInner({id, event}: {id: string, event: EventC}) {
    const navigate = useNavigate();
    const formControl = useForm<EventCEditing>({ defaultValues: convertToEditing(event) });
    const listControl = useFieldArray({control: formControl.control, name: "registrationInfo", keyName: "key"});
    
    const onCancel = () => navigate(`/event/${id}`);

    const onSubmit = (data: EventCEditing) => console.log(convertFromEditing(data));

    return (
        <FormProvider {...formControl}>
            <form onSubmit={formControl.handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <EventInfoFields />

                    <Typography variant='subtitle2'>Поля при регистрации:</Typography>
                    {listControl.fields.map((f, ind) => (
                        <AnswerFieldSettings key={f.key} ind={ind} listControl={listControl} />
                    ))}
                </Stack>

                <ButtonsContainer sx={{ mt: 3 }}>
                    <MainButton type='submit'>Сохранить</MainButton>
                    <SecondaryButton onClick={onCancel}>Отмена</SecondaryButton>
                </ButtonsContainer>
            </form>
        </FormProvider>
    );
}


const EventInfoFields = memo(() => {
    const formControl = useFormContext<EventCEditing>();
    return (
        <>
            <TextField
                label='Название мероприятия'
                variant='standard'
                size='small'
                required
                {...formControl.register('title')}
            />
            <TextField
                label='Описание'
                variant='standard'
                size='small'
                multiline
                required
                {...formControl.register('description')}
            />
            <TextField
                variant='standard'
                label='Дата и время начала'
                type='datetime-local'
                size='small'
                required
                {...formControl.register('startDate')}
            />
            <TextField
                variant='standard'
                label='Дата и время окончания'
                type='datetime-local'
                size='small'
                {...formControl.register('endDate')}
            />
        </>
    );
});

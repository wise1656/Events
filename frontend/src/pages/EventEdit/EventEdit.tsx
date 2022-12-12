import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { MainButton, SecondaryButton } from 'components/Button/Button';
import { ButtonsContainer } from 'components/Button/ButtonsContainer';
import { memo } from 'react';
import {
    FormProvider,
    useFieldArray,
    useForm,
    useFormContext,
    UseFormReturn,
} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectEvent, usePostEventMutation } from 'redux/ApiQuery';
import { defaultEventC, EventC } from 'shared/event';
import { AnswerFieldSettings, createNewFieldData } from './AnswerFieldSettings';
import { convertToEditing, convertFromEditing, EventCEditing } from './TypeConverters';
import AddIcon from '@mui/icons-material/Add';
import { AppContainer } from 'components/AppContainer';

export function EventEdit() {
    const { id } = useParams();
    const event = useSelector(selectEvent(id));
    if (id == 'new') return <EventEditInner id={null} event={defaultEventC} />;
    if (!event) return null; // ждем пока данные загрузятся
    return <EventEditInner id={id} event={event} />;
}

export function EventEditInner({ id, event }: { id: string; event: EventC }) {
    const navigate = useNavigate();
    const [postEvent] = usePostEventMutation();
    const formControl = useForm<EventCEditing>({ defaultValues: convertToEditing(event) });
    const listControl = useFieldArray({
        control: formControl.control,
        name: 'registrationInfo',
        keyName: 'key',
    });
    const onCancel = () => navigate(id ? `/event/${id}` : '/eventlist');

    const onSubmit = async (data: EventCEditing) => {
        // TODO: сделать обработку ошибок (если нет сети например)
        const id = await postEvent(convertFromEditing(data)).unwrap();
        navigate(`/event/${id}`);
    };

    return (
        <AppContainer>
            <FormProvider {...formControl}>
                <form onSubmit={formControl.handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <EventInfoFields />

                        <Typography variant='subtitle2'>Поля при регистрации:</Typography>
                        {listControl.fields.map((f, ind) => (
                            <AnswerFieldSettings key={f.key} ind={ind} listControl={listControl} />
                        ))}
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => listControl.append(createNewFieldData(formControl))}
                        >
                            Добавить поле
                        </Button>
                    </Stack>

                    <ButtonsContainer sx={{ mt: 3 }}>
                        <MainButton type='submit'>Сохранить</MainButton>
                        <SecondaryButton onClick={onCancel}>Отмена</SecondaryButton>
                    </ButtonsContainer>
                </form>
            </FormProvider>
        </AppContainer>
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
                InputLabelProps={{
                    shrink: true,
                }}
                {...formControl.register('startDate')}
            />
            <TextField
                variant='standard'
                label='Дата и время окончания'
                type='datetime-local'
                size='small'
                InputLabelProps={{
                    shrink: true,
                }}
                {...formControl.register('endDate')}
            />
        </>
    );
});

import {
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { RegistrationField } from 'shared/event';
import { Controller, FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { ButtonsContainer } from '../../components/Button/ButtonsContainer';
import { UserInfo, UserService } from 'services/User.service';
import { UserDataFields } from 'components/UserDataFields';
import { useSubscribe } from './useSubscribe';
import { MainButton, SecondaryButton } from 'components/Button/Button';

interface RegistrationFormProps {
    fields: RegistrationField[]
    eventId: string
    onClose: () => void
}

export function RegistrationForm({ fields, eventId, onClose }: RegistrationFormProps) {
    const { register, handleSubmit, reset, control, watch } = useForm<UserInfo | any>();
    const [hiddenFields, setHiddenFields] = useState([]);
    // TODO: избавиться от прямого использования getUserInfo, сохранять данные в редакс, иначе слишком часто дергается localStorage
    const [showUserInfo] = useState(UserService.getInstance().getUserInfo() == null);
    const subscribe = useSubscribe(showUserInfo, eventId);

    useLayoutEffect(() => {
        setHiddenFields(calcHiddenFields(fields))
        const subscr = watch((formValue) => {
            const hideFields = calcHiddenFields(fields, formValue);
            setHiddenFields((oldHide) =>
                shallowEqual(hideFields, oldHide) ? oldHide : hideFields,
            );
        });
        return () => subscr.unsubscribe();
    }, [fields]);

    const close = () => {
        reset();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit((data) => subscribe(data).then(close))}>
            <Paper sx={{ padding: 2 }} elevation={3}>
                <Stack spacing={2}>
                    {showUserInfo && <UserDataFields register={register}/>}
                    {fields.map((field) => {
                        if (hiddenFields.includes(field.id)) return null;
                        if (field.type == 'text') return createTextInput(field, register);
                        if (field.type == 'checkbox') return createCheckboxInput(field, control);
                        if (field.type instanceof Array)
                            return createSelect(field, control, field.type);
                    })}
                    <ButtonsContainer>
                        <MainButton type='submit'>
                            Ок
                        </MainButton>
                        <SecondaryButton onClick={close}>
                            Отмена
                        </SecondaryButton>
                    </ButtonsContainer>
                </Stack>
            </Paper>
        </form>
    );
}

// вычисляет какие поля не должны быть показаны, если не заполнены другие поля
function calcHiddenFields(info: RegistrationField[], formValue?) {
    const formValueWithDefault = {
        ...Object.fromEntries(info.map((i) => [i.id, undefined])),
        ...formValue,
    };
    return Object.keys(formValueWithDefault).filter((id) => {
        const field = info.find((i) => i.id == id);
        if (field?.showWhen) {
            const watchingVal = formValueWithDefault[field.showWhen.id];
            const whenVal = field.showWhen.value;

            if (whenVal == null && !watchingVal) return true;
            if (whenVal != null && whenVal != watchingVal) return true;
        }
    });
}

function createTextInput(
    field: RegistrationField,
    register: UseFormRegister<FieldValues>,
): JSX.Element {
    return (
        <TextField
            key={field.id}
            label={field.name}
            variant='standard'
            size='small'
            {...register(field.id)}
        />
    );
}

function createCheckboxInput(field: RegistrationField, control): JSX.Element {
    return (
        <FormControlLabel
            key={field.id}
            label={field.name}      
            control={
                <Controller
                    name={field.id}
                    control={control}
                    render={({ field }) => <Checkbox {...field} size='small' checked={!!field.value}/>}
                />
            }
        />
    );
}

function createSelect(field: RegistrationField, control, options: string[]): JSX.Element {
    return (
        <FormControl key={field.id}>
            <InputLabel variant="standard">{field.name}</InputLabel>
            <Controller
                name={field.id}
                control={control}
                render={(rend) => (
                    <Select
                        {...rend.field}
                        label={field.name}
                        value={rend.field.value || ''}
                        size='small'
                        variant='standard'
                    >
                        <MenuItem value={''} disabled></MenuItem>
                        {options.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
        </FormControl>
    );
}

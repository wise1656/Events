import {
    Button,
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
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

interface RegistrationFormProps {
    info: RegistrationField[];
    onClose: () => void;
}

export function RegistrationForm({ info, onClose }: RegistrationFormProps) {
    const { register, handleSubmit, reset, control, watch } = useForm();
    const [hiddenFields, setHiddenFields] = useState(calcHiddenFields(info));

    useEffect(() => {
        const subscr = watch((formValue) => {
            const hideFields = calcHiddenFields(info, formValue);
            setHiddenFields((oldHide) =>
                shallowEqual(hideFields, oldHide) ? oldHide : hideFields,
            );
        });
        return () => subscr.unsubscribe();
    }, [info]);

    const close = () => {
        reset();
        onClose();
    };

    const subscribe = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(subscribe)}>
            <Paper sx={{ padding: 1 }} elevation={3}>
                <Stack spacing={1}>
                    {info.map((field) => {
                        if (hiddenFields.includes(field.id)) return null;
                        if (field.type == 'text') return createTextInput(field, register);
                        if (field.type == 'checkbox') return createCheckboxInput(field, control);
                        if (field.type instanceof Array)
                            return createSelect(field, control, field.type);
                    })}
                    <ButtonsContainer>
                        <Button type='submit' variant='contained'>
                            Ок
                        </Button>
                        <Button type='button' variant='outlined' onClick={close}>
                            Отмена
                        </Button>
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

function ButtonsContainer(props) {
    return (
        <Stack direction='row' spacing={2} justifyContent='center' sx={{ paddingTop: 1 }}>
            {props.children}
        </Stack>
    );
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
                    render={({ field }) => <Checkbox {...field} checked={!!field.value} />}
                />
            }
        />
    );
}

function createSelect(field: RegistrationField, control, options: string[]): JSX.Element {
    return (
        <FormControl key={field.id} size='small'>
            <InputLabel>{field.name}</InputLabel>
            <Controller
                name={field.id}
                control={control}
                render={(rend) => (
                    <Select
                        {...rend.field}
                        label={field.name}
                        value={rend.field.value || ''}
                        size='small'
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

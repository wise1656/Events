import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { MyCheckbox } from 'components/MyInputs/MyCheckbox';
import { MySelect } from 'components/MyInputs/MySelect';
import React from 'react';
import { useState } from 'react';
import { FieldPath, UseFieldArrayReturn, useFormContext, UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form-mui';
import { EventCEditing, RegistrationFieldTypeEditing } from './TypeConverters';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

type ShowModeTypes = 'immediate' | 'field' | 'value';

interface AnswerFieldSettingsProps {
    ind: number;
    listControl: UseFieldArrayReturn<EventCEditing, 'registrationInfo'>;
}

export const AnswerFieldSettings = React.memo<AnswerFieldSettingsProps>(({ ind, listControl }) => {
    const formControl = useFormContext<EventCEditing>();
    return (
        <Stack direction='row'>
            <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
                <Stack spacing={2}>
                    <NameField ind={ind} />
                    <TypeField ind={ind} />
                    <MyCheckbox
                        name={calcName(ind, 'required')}
                        label='Обязательное поле'
                        control={formControl.control}
                    />
                    <ShowModeField ind={ind} />
                </Stack>
            </Paper>
            <Stack justifyContent='space-between'>
                <IconButton onClick={() => listControl.move(ind, ind - 1)}>
                    <UpIcon />
                </IconButton>
                <IconButton
                    onClick={() => listControl.insert(ind, createNewFieldData(formControl))}
                >
                    <AddIcon />
                </IconButton>
                <IconButton onClick={() => listControl.remove(ind)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={() => listControl.insert(ind+1, createNewFieldData(formControl))}
                >
                    <AddIcon />
                </IconButton>
                <IconButton onClick={() => listControl.move(ind, ind + 1)}>
                    <DownIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
});

function createNewFieldData(
    formControl: UseFormReturn<EventCEditing>,
): RegistrationFieldTypeEditing {
    const fields = formControl.getValues('registrationInfo');
    const newId = Math.max(...fields?.map((f) => Number(f.id)).filter((f) => f)) + 1;
    return {
        id: newId.toString(),
        name: '',
        type: 'text',
    };
}

function calcName(
    ind: number,
    name: FieldPath<RegistrationFieldTypeEditing>,
): FieldPath<EventCEditing> {
    return `registrationInfo.${ind}.${name}`;
}

interface FieldProps {
    ind: number;
}

const NameField = React.memo<FieldProps>(({ ind }) => {
    const formControl = useFormContext<EventCEditing>();

    return (
        <TextField
            label='Название поля'
            variant='standard'
            size='small'
            required
            {...formControl.register(calcName(ind, 'name'))}
        />
    );
});

const TypeField = React.memo<FieldProps>(({ ind }) => {
    const formControl = useFormContext<EventCEditing>();
    const type = formControl.watch(calcName(ind, 'type'));

    return (
        <Stack direction='row' spacing={2}>
            <MySelect
                name={calcName(ind, 'type')}
                label='Тип'
                control={formControl.control}
                options={['text', 'checkbox', 'list']}
                optionsLabels={['Текст', 'Да/Нет', 'Из списка']}
            />
            {type == 'list' && (
                <Controller
                    name={`registrationInfo.${ind}.list`}
                    control={formControl.control}
                    render={(data) => (
                        <TextField
                            sx={{ flex: 1 }}
                            value={data.field.value?.join(',')}
                            onChange={(e) => data.field.onChange(e.target.value?.split(','))}
                            label='Варианты выбора (через запятую)'
                            variant='standard'
                            size='small'
                            multiline
                            required
                        />
                    )}
                />
            )}
        </Stack>
    );
});

const ShowModeField = React.memo<FieldProps>(({ ind }) => {
    const formControl = useFormContext<EventCEditing>();
    const [showMode, setShowMod] = useState<ShowModeTypes>('immediate');
    const id = formControl.watch(calcName(ind, 'id'));
    const fields = formControl.watch('registrationInfo');

    const changeShowMode = (e) => {
        const value: ShowModeTypes = e.target.value;
        setShowMod(value);
        if (value == 'field') formControl.setValue(calcName(ind, 'showWhen.value'), undefined);
        if (value == 'immediate') formControl.setValue(calcName(ind, 'showWhen'), undefined);
    };

    return (
        <Stack direction='row' spacing={2}>
            <FormControl>
                <InputLabel variant='standard'>Показывать</InputLabel>
                <Select
                    label='Показывать'
                    value={showMode}
                    onChange={changeShowMode}
                    size='small'
                    variant='standard'
                    sx={{ minWidth: '200px' }}
                >
                    <MenuItem value='immediate'>Сразу</MenuItem>
                    <MenuItem value='field'>Если заполнено поле</MenuItem>
                    <MenuItem value='value'>Если поле имеет значение</MenuItem>
                </Select>
            </FormControl>
            {['field', 'value'].includes(showMode) && (
                <MySelect
                    name={calcName(ind, 'showWhen.id')}
                    label='Поле'
                    control={formControl.control}
                    options={fields.filter((f) => f.id != id).map((f) => f.id)}
                    optionsLabels={fields.filter((f) => f.id != id).map((f) => f.name)}
                    required
                    sx={{ minWidth: '80px' }}
                />
            )}
            {showMode == 'value' && (
                <TextField
                    label='Значение'
                    variant='standard'
                    size='small'
                    required
                    {...formControl.register(calcName(ind, 'showWhen.value'))}
                />
            )}
        </Stack>
    );
});

import { TextField } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { shallowEqual } from 'react-redux';
import { UserInfo } from 'services/User.service';
import { RegistrationField } from 'shared/event';
import { MySelect } from '../../components/MyInputs/MySelect';
import { MyCheckbox } from '../../components/MyInputs/MyCheckbox';

interface AnswerFieldsProps {
    fields: RegistrationField[];
    formProcessor: UseFormReturn<UserInfo & FieldValues, any>;
}

export function AnswerFields({ fields, formProcessor }: AnswerFieldsProps) {
    const [hiddenFields, setHiddenFields] = useState([]);
    const { register, control, watch } = formProcessor;

    useLayoutEffect(() => {
        setHiddenFields(calcHiddenFields(fields));
        const subscr = watch((formValue) => {
            const hideFields = calcHiddenFields(fields, formValue);
            setHiddenFields((oldHide) =>
                shallowEqual(hideFields, oldHide) ? oldHide : hideFields,
            );
        });
        return () => subscr.unsubscribe();
    }, [fields]);

    return (
        <>
            {fields.map((field) => {
                if (hiddenFields.includes(field.id)) return null;
                if (field.type == 'text') return createTextInput(field, register);
                if (field.type == 'checkbox')
                    return (
                        <MyCheckbox
                            name={field.id}
                            label={field.name}
                            control={control}
                            required={field.required}
                        />
                    );
                if (field.type instanceof Array)
                    return (
                        <MySelect
                            name={field.id}
                            label={field.name}
                            control={control}
                            options={field.type}
                            required={field.required}
                        />
                    );
            })}
        </>
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

function createTextInput(field: RegistrationField, register): JSX.Element {
    return (
        <TextField
            key={field.id}
            label={field.name}
            variant='standard'
            size='small'
            required={field.required}
            {...register(field.id)}
        />
    );
}

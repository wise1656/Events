import {
    Paper,
    Stack,
} from '@mui/material';
import { RegistrationField } from 'shared/event';
import { FieldValues, useForm } from 'react-hook-form';
import { ButtonsContainer } from '../../components/Button/ButtonsContainer';
import { useSubscribe } from './useSubscribe';
import { MainButton, SecondaryButton } from 'components/Button/Button';
import { UserInfoInRegistration } from './UserInfoInRegistration';
import { UserInfo } from 'services/User.service';
import { AnswerFields } from './AnswerFields';

interface RegistrationFormProps {
    fields: RegistrationField[];
    eventId: string;
    onClose: () => void;
}

export function RegistrationForm({ fields, eventId, onClose }: RegistrationFormProps) {
    const formProcessor = useForm<UserInfo & FieldValues>();
    const { handleSubmit, reset } = formProcessor;
    const submitSubscription = useSubscribe(eventId);
    
    const close = () => {
        reset();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit((data) => submitSubscription(data).then(close))}>
            <Paper sx={{ padding: 2 }} elevation={3}>
                <Stack spacing={2}>
                    <UserInfoInRegistration formProcessor={formProcessor} />
                    <AnswerFields fields={fields} formProcessor={formProcessor} />
                    <ButtonsContainer>
                        <MainButton type='submit'>Ок</MainButton>
                        <SecondaryButton onClick={close}>Отмена</SecondaryButton>
                    </ButtonsContainer>
                </Stack>
            </Paper>
        </form>
    );
}

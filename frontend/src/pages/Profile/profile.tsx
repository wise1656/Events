import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ButtonsContainer } from 'components/Button/ButtonsContainer';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isUserInfo, UserInfo, UserService } from '../../services/User.service';
import { UserDataFields } from '../../components/UserDataFields';
import { MainButton, SecondaryButton } from '../../components/Button/Button';
import { LoginButton } from '../../components/LoginButton';
import { EditIconButton } from '../../components/EditIconButton';

export function Profile() {
    const [edit, setEdit] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>(null);

    useLayoutEffect(() => {
        const info = UserService.getInstance().getUserInfo();
        if (info) setUserInfo(info);
        else setEdit(true);
    }, []);

    const onSave = (info: UserInfo) => {
        UserService.getInstance().saveUserInfo(info);
        setUserInfo(info);
        setEdit(false);
    };

    return (
        <Box sx={{ p: 2 }}>
            {userInfo && !edit && (
                <Stack direction='column' alignItems='baseline'>
                    <Stack direction='row' alignItems='center' sx={{ mb: 1 }}>
                        <Typography variant='h5'>
                            {userInfo.name} {userInfo.lastName}
                        </Typography>
                        {!edit && (
                            <EditIconButton onClick={() => setEdit(true)}/>
                        )}
                    </Stack>
                    <Typography variant='body1'>
                        {userInfo.city}
                        {userInfo.church && `, церковь ${userInfo.church}`}
                    </Typography>
                    <Typography variant='body1'>Телефон {userInfo.phone}</Typography>
                    <LoginButton />
                </Stack>
            )}
            {edit && <Edit userInfo={userInfo} onSave={onSave} onCancel={() => setEdit(false)} />}
        </Box>
    );
}

interface EditProps {
    userInfo: UserInfo;
    onSave: (info: UserInfo) => void;
    onCancel: () => void;
}

function Edit({ userInfo, onSave, onCancel }: EditProps) {
    const { register, handleSubmit } = useForm<UserInfo>({ defaultValues: userInfo });

    const onSubmit = (data) => {
        if (isUserInfo(data)) onSave(data);
        else console.error('Wrong form format', data);
    };

    return (
        <form onSubmit={handleSubmit((a) => onSubmit(a))}>
            <Stack spacing={2} direction='column'>
                <UserDataFields register={register} />
            </Stack>
            <ButtonsContainer>
                <MainButton type='submit'>Ок</MainButton>
                <SecondaryButton onClick={onCancel}>Отмена</SecondaryButton>
            </ButtonsContainer>
        </form>
    );
}

import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ButtonsContainer } from 'components/Button/ButtonsContainer';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { isUserInfo, UserInfo, UserService } from '../../services/User.service';
import EditIcon from '@mui/icons-material/Edit';
import { UserDataFields } from '../../components/UserDataFields';
import { MainButton, SecondaryButton } from '../../components/Button/Button';

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
        <Box sx={{p: 3}}>
            {userInfo && !edit && (
                <Stack spacing={2} direction='column' alignItems='baseline'>
                    <Stack direction='row' sx={{mt: 2}} alignItems="center">
                        <Typography variant='h5'>
                            {userInfo.name} {userInfo.lastName}
                        </Typography>
                        {!edit && (
                            <EditIcon
                                onClick={() => setEdit(true)}
                                color='action'
                                sx={{ ml: 1, cursor: 'pointer' }}
                            />
                        )}
                    </Stack>
                    <Typography variant='body1'>
                        {userInfo.city}
                        {userInfo.church && `, ${userInfo.church}`}
                    </Typography>
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
    const { register, reset, handleSubmit } = useForm<UserInfo>();
    useEffect(() => {
        reset(userInfo);
    }, [userInfo]);

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

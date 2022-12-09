import { Stack } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { memo, useState } from 'react';
import { UserInfo, UserService } from 'services/User.service';
import { UserDataFields } from 'components/UserDataFields';
import { EditIconButton } from 'components/EditIconButton';

// выводит либо имя регистрирующегося юзера либо список полей для ввода инфы о нем
export const UserInfoInRegistration = memo(({ formProcessor }: { formProcessor: UseFormReturn<UserInfo & FieldValues, any>; }) => {
    const [userInfo, setUserInfo] = useState(UserService.getInstance().getUserInfo());
    const { reset, getValues, register } = formProcessor;

    const edit = () => {
        reset({ ...getValues(), ...userInfo });
        setUserInfo(null);
    };

    return userInfo ? (
        <Stack direction='row' alignItems="center">
            {userInfo.name} {userInfo.lastName}
            <EditIconButton onClick={edit} size={18} />
        </Stack>
    ) : (
        <UserDataFields register={register} />
    );
})
